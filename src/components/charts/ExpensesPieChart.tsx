"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { name: 'Maintenance', value: 35 },
  { name: 'Utilities', value: 25 },
  { name: 'Insurance', value: 15 },
  { name: 'Tax', value: 15 },
  { name: 'Management', value: 10 },
]

const COLORS = ['#0d968b', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

export default function ExpensesPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any) => [`${value}%`, '']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
