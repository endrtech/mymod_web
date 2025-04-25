"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export default function OverviewChart({ data, percentageChange }: { data: { date: string, count: number }[], percentageChange: number }) {
    const chartConfig = {
        date: {
            label: "Date",
        },
        count: {
            label: "Users Joined",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Members</CardTitle>
                <CardDescription>Showing user joins over time</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[300px]">
                    <BarChart accessibilityLayer data={data} barCategoryGap={1} barGap={2}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            interval={Math.floor(data.length / 10)}
                            minTickGap={10}
                            tickFormatter={(value) => {
                                return value
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="count"
                                    labelFormatter={(value) => {
                                        return value
                                    }}
                                />
                            }
                        />
                        <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {
                    percentageChange > 0 && (
                        <div className="flex gap-2 font-medium leading-none">
                            Trending {percentageChange >= 0 ? "up" : "down"} by {Math.abs(percentageChange).toFixed(1)}% this week {percentageChange >= 0 && <TrendingUp className="h-4 w-4" />}
                        </div>
                    )
                }
                <div className="leading-none text-muted-foreground">
                    Based on members who joined in the last 7 days
                </div>
            </CardFooter>
        </Card>
    )
}