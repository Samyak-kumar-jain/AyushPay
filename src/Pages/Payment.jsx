import React from 'react'
import PaymentBanner from '../Components/Payment/PaymentBanner'
import PaymentQrCode from '../Components/Payment/PaymentQrCode'
import { PaymentOptions } from '../Components/Payment/PaymentOptions'

export const Payment = () => {
  return (
    <div className='space-y-[25px]'>
        <PaymentBanner/>
        <PaymentQrCode/>
        <PaymentOptions/>
    </div>
  )
}
