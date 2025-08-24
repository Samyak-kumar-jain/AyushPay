import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './Pages/HomePage';
import { AuthProvider } from './Context/AuthContex';
import Childoutlets from './Pages/Childoutlets';
import DetailsFrom from './Components/Form/Details-from';
import { OtpProvider } from './Context/OtpContext';
import { FormProvider } from './Context/FormContext';
import PlanPage from './Pages/PlanPage';
import { Payment } from './Pages/Payment';
import { PlansProvider } from './Context/PaymentContext';
import RouteGuard from "./Components/Protected/PrivateRoute.jsx"; // improved
import Dashboard from './Pages/Dashboard.jsx';
import PlanBanner from './Components/Plans/PlanBanner.jsx';
import { PlanProvider } from './Context/PlanContext.jsx';
import { BuyPlanProvider } from './Context/BuyPlanContext.jsx';

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, 
    children: [
      { index: true, element: <Childoutlets /> },

      {
        path: "fill-details",
        element: (
          <RouteGuard type="private" loginPath="/">
            <DetailsFrom />
          </RouteGuard>
        )
      },
      {
        path: "plans",
        element: (
          <RouteGuard type="private" loginPath="/">
            <PlanPage />
          </RouteGuard>
        )
      },
      {
        path: "plans/payment-page",
        element: (
          <RouteGuard type="private" loginPath="/">
            <Payment />
          </RouteGuard>
        )
      },
      {
        path:"dashboard",
        element:(
          <RouteGuard type="private" loginPath="/">
            <Dashboard/>
          </RouteGuard>

        )
      }
    ]
  }
]);

  return (
    <AuthProvider>
      <OtpProvider>
        <FormProvider>
          <PlansProvider>
            <PlanProvider>
              <BuyPlanProvider>
                <RouterProvider router={router} />
              </BuyPlanProvider>
                        
              
                  
            </PlanProvider>
                
            
            
          </PlansProvider>
        </FormProvider>
      </OtpProvider>
    </AuthProvider>
  );
}

export default App;
