import React from 'react'
import MedicalLoanCard from "../Components/Common/Home/Banner"
import FeaturesCard from "../Components/Common/Home/FeatureCard"
import LoginCard from "../Components/Common/Home/Email"

const Childoutlets = () => {
  return (
    <div className='space-y-[25px] '> <MedicalLoanCard />
          <FeaturesCard />
          <LoginCard />
       
          </div>
  )
}

export default Childoutlets