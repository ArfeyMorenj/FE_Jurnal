import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
        <p className="text-sm text-gray-600">{`${payload[0].value} Siswa`}</p>
      </div>
    );
  }
  return null;
};

export default function StudentChart({ data, title = "Chart Siswa", subtitle = "Data Keseluruhan Anggota Atau Siswa" }) {
  // Calculate total students
  const totalStudents = data.reduce((sum, item) => sum + (item.users || 0), 0);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-md font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOrangeStudent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#666"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 10}}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#F97316" 
              strokeWidth={2.5}
              fill="url(#colorOrangeStudent)"
              activeDot={{ r: 6, fill: '#F97316', stroke: '#fff', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
