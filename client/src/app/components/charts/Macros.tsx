//@ts-nocheck

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


function Macros() {
  const {contextnutri} = useUserContext(); // Updated hook
const carbohydrates =contextnutri?.carbohydrates
const fat =contextnutri?.fat
const protein =contextnutri?.protein


const chartData = [
  { browser: "carbohydrates", visitors: carbohydrates, fill: "var(--color-carbohydrates)" },
  { browser: "fat", visitors: fat, fill: "var(--color-fat)" },
  { browser: "protein", visitors:protein, fill: "var(--color-protein)" },
  
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  carbohydrates: {
    label: "carbohydrates",
    color: "hsl(var(--chart-1))",
  },
  fat: {
    label: "fat",
    color: "hsl(var(--chart-2))",
  },
  protein: {
    label: "protein",
    color: "hsl(var(--chart-3))",
  },

} satisfies ChartConfig
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Macro Nutrients</CardTitle>
        <CardDescription>Carbs ,Fats, Protien</CardDescription>
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
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing total Macro Nutrients !
        </div>
        <div className="flex gap-2 font-medium leading-none text-neutral-400">
        Carbohydrates : {carbohydrates};
          <br></br>
          
          Fats: {fat};
          <br></br>

          Protein: {protein}
        </div>
        <div className="leading-none text-muted-foreground">
        
        </div>
      </CardFooter>
    </Card>
  )
}
export default Macros