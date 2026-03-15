"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#0d968b', '#cbd5e1']

interface OccupancyDonutProps {
  occupancyRate?: number
}

export default function OccupancyDonut({ occupancyRate = 87.5 }: OccupancyDonutProps) {
  const rate = Math.round(occupancyRate * 10) / 10
  const data = [
    { name: 'Occupied', value: rate },
    { name: 'Vacant', value: 100 - rate },
  ]

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
          {rate}%
        </text>
        <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-500 dark:fill-slate-400" style={{ fontSize: '12px' }}>
          Occupied
        </text>
      </PieChart>
    </ResponsiveContainer>
  )
}
