import React from 'react';

export default function PopularAppsList({ data }) {
  return (
    <div className="bg-white rounded-lg p-6 ">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">List Aplikasi Terpopuler</h3>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {data && data.length > 0 ? (
          data.map((app, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={app.icon || '/images/phone/phone1.png'} 
                  alt={`${app.name} Icon`} 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.src = '/images/phone/phone1.png';
                  }}
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  {app.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {app.users} Pengguna Aplikasi
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            Tidak ada data aplikasi terpopuler
          </div>
        )}
      </div>
    </div>
  );
}

