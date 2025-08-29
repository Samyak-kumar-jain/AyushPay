// App.jsx
import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import Childoutlets from "./Pages/Childoutlets";
import DetailsFrom from "./Components/Form/Details-from";
import PlanPage from "./Pages/PlanPage";
import { Payment } from "./Pages/Payment";
import Dashboard from "./Pages/Dashboard.jsx";

// Context Providers
import { AuthProvider } from "./Context/AuthContex";
import { OtpProvider } from "./Context/OtpContext";
import { FormProvider } from "./Context/FormContext";
import { PlansProvider } from "./Context/PaymentContext";
import { PlanProvider } from "./Context/PlanContext.jsx";
import { BuyPlanProvider } from "./Context/BuyPlanContext.jsx";
import { AnchorProvider } from "./Context/AnchorContext.jsx";
import { SubscriptionProvider } from "./Context/SubscriptionContext.jsx";

// Route Guard
import RouteGuard from "./Components/Protected/PrivateRoute.jsx";

function App() {
  const router = createBrowserRouter([
    // Default route
    {
      path: "/",
      element: <Navigate to="/apay/subscription" replace />,
    },

    // OTP/Login page (public)
    {
      path: "/:anchor/:subscription",
      element: (
        <RouteGuard type="public">
          <HomePage />
        </RouteGuard>
      ),
      children: [
        { index: true, element: <Childoutlets /> }, // OTP/Login form
        {
          path: "plans/payment-page",
          element: (
            <RouteGuard type="private">
              <Payment />
            </RouteGuard>
          ),
        },
        {
          path: "dashboard",
          element: (
            <RouteGuard type="private">
              <Dashboard />
            </RouteGuard>
          ),
        },
      ],
    },

    // Pre-approved form page (private)
    {
      path: "/pre_approved_share_details/:anchor/pre-approved",
      element: <HomePage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard type="private">
              <DetailsFrom />
            </RouteGuard>
          ),
        },
      ],
    },

    // Pre-approved buy subscription page (private)
    {
      path: "/:anchor/pre_approved_buy_subscription",
      element: <HomePage />,
      children: [
        {
          index: true,
          element: (
            <RouteGuard type="private">
              <PlanPage />
            </RouteGuard>
          ),
        },
      ],
    },
  ]);

  return (
    <AnchorProvider>
      <AuthProvider>
        <OtpProvider>
          <FormProvider>
            <PlansProvider>
              <PlanProvider>
                <SubscriptionProvider>
                  <BuyPlanProvider>
                    <RouterProvider router={router} />
                  </BuyPlanProvider>
                </SubscriptionProvider>
              </PlanProvider>
            </PlansProvider>
          </FormProvider>
        </OtpProvider>
      </AuthProvider>
    </AnchorProvider>
  );
}

export default App;
