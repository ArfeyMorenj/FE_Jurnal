import React from 'react'

const FooterHeader = ({ footer }) => {
  return (
    <div className='flex justify-center md:justify-start items-center gap-8'>
        <img src={footer.logo} alt="" className='h-12 w-auto' />      
    </div>
  )
}

export default FooterHeader
