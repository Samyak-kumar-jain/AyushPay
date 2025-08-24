import React from 'react'
import success from "../../assets/successfull.png"

const DashboardBanner = () => {
  return (
     <div className=" bg-blue-50 rounded-lg flex items-center  px-[13px] pt-[28px] pb-[25px] p  shadow-sm justify-between ">
          {/* Left Content */}
          <div>
            <h2 className="text-[24px] font-bold text-[#4298C8]">
        
              Great choice <span className='block -mt-2'>Nimith</span> 
            </h2>
           <p className="text-[#4E4E4C] font-light text-[14px] mt-8px">
  Your payment and plan <span className="block -mt-1">purchase is successfull</span>
</p>

          </div>
    
          {/* Right Image Illustration */}
          <div className="flex-shrink-0 text-right">
            <img
              src={success}
              alt="Plan Banner Illustration"
              className="w-[104px] h-[105px] object-contain"
            />
          </div>
          
        </div>
  )
}

export default DashboardBanner