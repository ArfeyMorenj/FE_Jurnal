import React from 'react'

const WhiteLine = () => {
  return (
    <div className='flex flex-col items-center'>
      {/* Garis vertikal putih */}
      <div className='w-1 h-[4603px] bg-white relative'>
        {/* Lingkaran di tengah */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-white'></div>
        
        {/* Lingkaran di bawah */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-white'></div>
      </div>
    </div>
  )
}

export default WhiteLine
