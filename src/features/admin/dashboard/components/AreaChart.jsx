import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-800">{`${payload[0].value} Pengguna`}</p>
      </div>
    );
  }
  return null;
};

export default function CustomAreaChart({ data }) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-md font-bold text-gray-800">Chart Pengguna</h3>
        <p className="text-sm text-gray-600">Data pertambahan pengguna baru</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 25, bottom: 5 }}>
            <defs>
              <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#F97316" 
              strokeWidth={3}
              fill="url(#colorOrange)"
              dot={false}
              activeDot={{ r: 10, stroke: '#fff', strokeWidth: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
