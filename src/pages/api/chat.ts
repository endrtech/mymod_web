// pages/api/chat.ts
import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getCurrentGuildMembers } from "@/app/actions/getCurrentGuildMembers";
import { getGuildMember } from "@/app/actions/getGuildMember";
import { searchMember } from "@/app/actions/guilds/members/searchMember";
import { warnGuildMember } from "@/app/actions/guilds/members/warnGuildMember";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, server, user } = req.body;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      tool_choice: "auto",
      tools: [
        {
          type: "function",
          function: {
            name: "getCurrentGuildMembers",
            description: "Get current guild members from the current server.",
            parameters: {},
          }
        },
        {
          type: "function",
          function: {
            name: "getGuildMember",
            description: "Returns information about a specified guild member. If a user asks for something else, such as to warn a user, DO NOT CALL THIS FUNCTION.",
            parameters: {
              type: "object",
              properties: {
                searchUser: {
                  type: "string",
                  description: "The member name to search for. If the question is unrelated to finding a member, do not use this function."
                }
              },
              required: ["searchUser"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "getMemberCases",
            description: "Returns information about cases for a guild member.",
            parameters: {
              type: "object",
              properties: {
                searchQuery: {
                  type: "string",
                  description: "The member to search for to pull information regarding their cases."
                }
              },
              required: ["searchQuery"]
            }
          }
        },
        {
          type: "function",
          function: {
            name: "warnGuildMember",
            description: "Directly warns the specified user and creates a log case. Do not use `getGuildMember` or `getCurrentGuildMembers` EVER.",
            parameters: {
              type: "object",
              properties: {
                memberName: {
                  type: "string",
                  description: "The member's username. If you are being provided information from `getGuildMember` or `getCurrentGuildMembers`, use the users username, NOT what you have been provided in the question."
                },
                warnReason: {
                  type: "string",
                  description: "The reason for the warn."
                },
                warnExpires: {
                  type: "string",
                  description: "When the warn expires. Convert this value into an ISO string when received."
                }
              },
              required: ["memberName", "warnReason", "warnExpires"]
            }
          }
        }
      ],
    });

    const choice = response.choices[0];

    if (choice.finish_reason === "tool_calls") {
      if (!choice.message.tool_calls || choice.message.tool_calls.length === 0)
        throw new Error("No tool calls found in the response");

      for (const tool_call of choice.message.tool_calls) {
        const id = tool_call.id;
        const fnName = tool_call.function.name;
        const fnArgs = tool_call.function.arguments;
        console.log(fnName);
        console.log(fnArgs);

        if (!fnName || !fnArgs)
          throw new Error("Invalid function call from OpenAI");

        switch (fnName) {
          case "getCurrentGuildMembers": {
            const members = await getCurrentGuildMembers(server);

            const summaryResponse = await client.chat.completions.create({
              model: "gpt-4.1-mini",
              messages: [
                {
                  role: "user",
                  content: `Give me a table using this data. Give me JUST the table. Do not include the type of member, or the avatar image AT ALL. Include the username or globalName, roles, and permissions. \n${JSON.stringify(members)}`,
                },
              ],
            });

            return res.status(200).json(summaryResponse.choices[0].message);
          }
          case "getGuildMember": {
            const args = JSON.parse(fnArgs);
            const member = await searchMember(server, args.searchUser);

            if (!member) {
              return res.status(200).json({
                role: "assistant",
                content: "I am unable to complete this request for you. Try again later."
              })
            }

            const summaryResponse_getGuildMember = await client.chat.completions.create({
              model: "gpt-4.1-mini",
              messages: [
                {
                  role: "user",
                  content: `Give me a summary on the following data. Have some detail, but limit your response to under 500 characters. Do not include information about the avatar image, or their display name, for example. Just respond with the summary, no other information.\n${JSON.stringify(member.data)}`
                }
              ]
            })

            return res.status(200).json(summaryResponse_getGuildMember.choices[0].message);
          }
          case "getMemberCases": {
            const args_getGuildMemberCases = JSON.parse(fnArgs);
            const member_getGuildMemberCases = await searchMember(server, args_getGuildMemberCases.searchQuery)
            const cases = await getGuildMember(server, member_getGuildMemberCases.data[0]?.userId);

            if (!member_getGuildMemberCases) {
              return res.status(200).json({
                role: "assistant",
                content: "I am unable to complete this request for you. Try again later."
              })
            }

            const summaryResponse_getGuildMemberCases = await client.chat.completions.create({
              model: "gpt-4.1-mini",
              messages: [
                {
                  role: "user",
                  content: `Give me a summary on the following data. Have some detail, but limit your response to under 500 characters. Do not include information about the avatar images, for example. Just respond with the summary, no other information. If the JSON is empty, just return that there isn't any cases for this member. \n${JSON.stringify(cases.memberCases)}`
                }
              ]
            })

            return res.status(200).json(summaryResponse_getGuildMemberCases.choices[0].message)
          }
          case "warnGuildMember": {
            const args_warnGuildMember = JSON.parse(fnArgs);
            const member_warnGuildMember = await searchMember(server, args_warnGuildMember.memberName);
            const response_warnGuildMember = await warnGuildMember(server, member_warnGuildMember.data[0]?.userId, {
              warnReason: args_warnGuildMember.warnReason,
              createdById: user,
              warnTimestamp: args_warnGuildMember.warnExpires,
            })

            if(response_warnGuildMember === 200) {
              return res.status(200).json({
                role: "assistant",
                content: `${member_warnGuildMember.data[0]?.displayName} has been warned. Let me know if you need assistance with anything else!`,
              })
            } else {
              return res.status(200).json({
                role: "assistant",
                content: `${member_warnGuildMember.data[0]?.displayName} has been warned, however, I got the following error when completing it: ${response_warnGuildMember}`,
              })
            }
          }
          default:
            return res.status(200).json({
              role: "assistant",
              content: "Sorry, I am unable to assist with that. Please try again later."
            })
        }
      }
    }

    // Handle non-function-call responses
    if (choice.finish_reason === "stop") {
      return res.status(200).json(choice.message);
    }

    // Handle unexpected finish reasons
    return res.status(400).json({ error: "Unexpected finish reason" });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
/**
 * 
 * // pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  // Step 1: Define available functions
  const tools = [
    {
      type: "function",
      function: {
        name: "getWeather",
        description: "Get weather data for a specific location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city to get weather for",
            },
          },
          required: ["location"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "triggerInternalAPI",
        description: "Call an internal action in your backend",
        parameters: {
          type: "object",
          properties: {
            endpoint: {
              type: "string",
              description: "The endpoint to hit, like '/api/notify'",
            },
            payload: {
              type: "object",
              description: "Payload to send",
            },
          },
          required: ["endpoint"],
        },
      },
    },
  ];

  // Step 2: Call OpenAI with tools
  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview", // or similar that supports tool calling
      messages,
      tools,
      tool_choice: "auto",
    }),
  });

  const data = await openaiResponse.json();

  // Step 3: If tool call is returned, invoke it server-side
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (toolCall) {
    const { name, arguments: args } = toolCall.function;
    const parsedArgs = JSON.parse(args);

    let toolResult = null;

    if (name === "getWeather") {
      const weatherRes = await fetch(`https://your-weather-api.com?q=${parsedArgs.location}`);
      toolResult = await weatherRes.json();
    }

    if (name === "triggerInternalAPI") {
      const internalRes = await fetch(`https://yourdomain.com${parsedArgs.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedArgs.payload),
      });
      toolResult = await internalRes.json();
    }

    // Step 4: Send back the tool result to OpenAI for final message
    const finalResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [...messages, data.choices[0].message],
        tool_choice: "none",
        tool_outputs: [
          {
            tool_call_id: toolCall.id,
            output: JSON.stringify(toolResult),
          },
        ],
      }),
    });

    const finalData = await finalResponse.json();
    return res.status(200).json(finalData);
  }

  // Step 5: If no tool call, return the normal response
  return res.status(200).json(data);
}

 */