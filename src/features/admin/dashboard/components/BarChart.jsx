import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const tahunLaluData = payload.find(p => p.dataKey === 'tahunLalu');
    const tahunIniData = payload.find(p => p.dataKey === 'tahunIni');
    
    return (
      <div className="bg-white px-3 py-2 rounded-lg shadow-md border border-gray-100">
        <p className="text-xs font-medium text-gray-600 mb-2">Tahun {label}</p>
        {tahunLaluData && (
          <p className="text-xs text-gray-600 mb-1">
            Tahun Lalu: <span className="font-semibold text-blue-500">{tahunLaluData.value || 0} Siswa</span>
          </p>
        )}
        {tahunIniData && (
          <p className="text-xs text-gray-600">
            Tahun Ini: <span className="font-semibold text-emerald-500">{tahunIniData.value || 0} Siswa</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function CustomBarChart({ data }) {
  const totalTahunLalu = data.reduce((sum, item) => sum + (item.tahunLalu || 0), 0);
  const totalTahunIni = data.reduce((sum, item) => sum + (item.tahunIni || 0), 0);

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Jumlah Siswa</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTahunLalu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.6}/>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="colorTahunIni" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.6}/>
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="natural" 
              dataKey="tahunLalu" 
              name="Tahun Lalu"
              stroke="#60a5fa" 
              strokeWidth={2.5}
              fill="url(#colorTahunLalu)"
              dot={false}
              activeDot={{ r: 5, fill: '#60a5fa', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area 
              type="natural" 
              dataKey="tahunIni" 
              name="Tahun Ini"
              stroke="#34d399" 
              strokeWidth={2.5}
              fill="url(#colorTahunIni)"
              dot={false}
              activeDot={{ r: 5, fill: '#34d399', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-8 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Tahun Lalu</span>
            <span className="text-sm font-semibold text-gray-900">{totalTahunLalu} Siswa</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Tahun Ini</span>
            <span className="text-sm font-semibold text-gray-900">{totalTahunIni} Siswa</span>
          </div>
        </div>
      </div>
    </div>
  );
}