"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { useUserContext } from '@/app/context/Userinfo';
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




const chartConfig = {
    content: {
    label: "content",
    color: "hsl(var(--chart-1))",
  },

  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

 function Others() {
const {contextnutri} = useUserContext(); // Updated hook
const saturated_fat=contextnutri?.saturated_fat;
const sodium=contextnutri?.sodium;
const sugar=contextnutri?.sugar;
const chartData = [
    { month: "s.fat", content: saturated_fat },
    { month: "sodium", content: sodium},
    { month: "sugar", content: sugar },
  
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition</CardTitle>
        <CardDescription>Saturated fats ,Sodium,Sugar</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="content" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="content"
              layout="vertical"
              fill="var(--color-content)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="content"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-neutral-400 mx-auto">
          Saturated Fats : {saturated_fat};
          <br></br>
          
          Sodium: {sodium};
          <br></br>

          Sugar: {sugar}
        </div>
        <div className="leading-none text-muted-foreground">
        
        </div>
      </CardFooter>
    </Card>
  )
}
export default Others