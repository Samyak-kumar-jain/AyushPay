import React from 'react'
import sub from "../../assets/sub.png"

export const SubBanner = () => {
  return (
    
         <div className=" bg-blue-50 rounded-lg flex items-center  px-[13px] pt-[28px] pb-[25px] p  shadow-sm justify-between ">
          {/* Left Content */}
          <div>
            <h2 className="text-[24px] font-bold text-[#4298C8]">
        
              Hey <span className='block -mt-2'>Nimith</span> 
            </h2>
           <p className="text-[#4E4E4C]  font-light text-[14px] mt-8px">
  Please wait while we are <span className="block -mt-1"> issuing your subscription</span>
</p>

          </div>
    
          {/* Right Image Illustration */}
          <div className="flex-shrink-0 text-right">
            <img
              src={sub}
              alt="Plan Banner Illustration"
              className="w-[104px] h-[105px] object-contain"
            />
          </div>
          
        </div>
    
  )
}
