"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
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
  visitors: {
    label: "Visitors",
  },
  completed: {
    label: "completed",
    color: "hsl(var(--chart-1))",
  },
  left: {
    label: "left",
    color: "hsl(var(--chart-2))",
  },
 
} satisfies ChartConfig

export function Callories() {
  const {contextnutri} = useUserContext(); // Updated hook
  console.log(contextnutri)
    const callories_completed =contextnutri.calories;
    const callories_left =3000-callories_completed;
    const chartData = [
        { browser: "Completed Calories : ", visitors: callories_completed, fill: "var(--color-completed)" },
        { browser: "Calories Left : ", visitors: callories_left, fill: "var(--color-left)" },
      
      ]
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Calories</CardTitle>
        <CardDescription>Calories Status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={70}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none text-neutral-400">
      Callories Completed : {callories_completed};
          <br></br>
          
          Callories Left: {callories_left};
          <br></br>

          
        </div>
       
      </CardFooter>
    </Card>
  )
}
export default Callories