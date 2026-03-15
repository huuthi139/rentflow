"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Occupied', value: 87.5 },
  { name: 'Vacant', value: 12.5 },
]

const COLORS = ['#0d968b', '#cbd5e1']

export default function OccupancyDonut() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={90}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-900 dark:fill-slate-100" style={{ fontSize: '28px', fontWeight: 700 }}>
          87.5%
        </text>
        <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-500 dark:fill-slate-400" style={{ fontSize: '12px' }}>
          Occupied
        </text>
      </PieChart>
    </ResponsiveContainer>
  )
}
