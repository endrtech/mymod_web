import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDiscordUser } from "@/app/actions/getDiscordUser";

export default async function Home() {
  const user = await auth();
  const discordData = await getDiscordUser();

  if (user.userId && discordData.id) {
    return redirect("/:d:/app");
  } else if (user.userId && !discordData.id) {
    return redirect("/connect-discord");
  }

  return <>Loading...</>;
}
