'use client'

import {
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis
} from 'recharts'

import { Card } from "@/components/ui/card"

interface CartProps {
  data: {
    name: string,
    total: number
  }[]
}

export const Chart = ({ data }: CartProps) => {
  return (
    <Card className='p-4'>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis 
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} XAF`}
          />
          <Bar
            dataKey='total'
            fill='#0369a6'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}