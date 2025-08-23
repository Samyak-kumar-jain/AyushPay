import React from 'react'
import PlanBanner from '../Components/Plans/PlanBanner'
import PlansCard from '../Components/Plans/PlanComponent'

const PlanPage = () => {
  return (
    <div className='space-y-[25px]'>
        <PlanBanner/>
        <PlansCard/>
    </div>
  )
}

export default PlanPage