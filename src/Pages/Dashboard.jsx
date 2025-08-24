import React from 'react'
import DashboardBanner from '../Components/UserDashboard/DashboarBanner'
import PurchasedPlan from '../Components/UserDashboard/PurchasedPlan'
import { useSubscription } from '../Hooks/useSubsription'
import { SubBanner } from '../Components/UserDashboard/SubBanner'

const Dashboard = () => {
  const {isPlanLoading} = useSubscription()
  return (
    <div className='space-y-[25px]'>
      {
        isPlanLoading ? <SubBanner></SubBanner> :<DashboardBanner/>
      }
      <PurchasedPlan/>
      
    </div>

  )
}

export default Dashboard