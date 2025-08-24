import React from 'react'
import Benifit from "../../assets/Benifit.png"

const BenifitTag = () => {
  return (
    <div className='flex py-[5px] px-[13px] w-[141px] bg-white rounded-[6px] shadow-[0px_0px_4px_0px_#0000001A]
 '>
        <img src={Benifit} className='w-[23px] h-[23px]'></img>
        <p className=' ml-[11px] text-[#4298C8] "font-inter font-bold text-[22px] leading-[112%] tracking-[0] align-middle" '>Benifits</p>



    </div>
  )
}

export default BenifitTag
