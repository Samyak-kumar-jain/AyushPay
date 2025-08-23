import React from 'react'
import DetailBanner from './DetailBanner'
import FormComponent from './Form'
import CenteredImage from './Image'

const DetailsFrom = () => {
  return (
    <div className='space-y-[25px] '>
        <DetailBanner/>
        <FormComponent/>
        <CenteredImage/>
    </div>
  )
}

export default DetailsFrom