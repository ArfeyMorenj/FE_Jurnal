import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor, 
  showTrend = false, 
  trendValue, 
  trendType, 
  trendPeriod = "30 hari" 
}) => {
  return (
    <div className='bg-white rounded-lg shadow-sm'>
      <div className='flex items-start justify-between'>
        <div className='w-[236px] h-[118px] flex items-center justify-center gap-6'>
          <div className={`w-[50px] h-[50px] ${iconBgColor} rounded-full flex items-center justify-center mb-4`}>
            <Icon className='w-6 h-6 text-white' />
          </div>
          <div>
            <h3 className='text-3xl font-bold text-[#464255] mb-1'>{value}</h3>
            <p className='text-sm text-[#464255] mb-2'>{title}</p>
            {showTrend && (
              <div className='flex items-center gap-1'>
                <div className={`w-[19px] h-[19px] ${
                  trendType === 'up' ? 'bg-[#2ED6A3]/15' : 'bg-[#FF5B5B]/15'
                } rounded-full flex items-center justify-center`}>
                  {trendType === 'up' ? (
                    <ArrowUp className={`w-[10px] h-[10px] ${
                      trendType === 'up' ? 'text-[#2ED6A3]' : 'text-green-500'
                    }`} />
                  ) : (
                    <ArrowDown className='w-[10px] h-[10px] text-[#FF5B5B]' />
                  )}
                </div>
                <span className='text-xs text-[#A3A3A3]'>{trendValue} ({trendPeriod})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
