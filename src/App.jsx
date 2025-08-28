import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import { AuthProvider } from "./Context/AuthContex";
import Childoutlets from "./Pages/Childoutlets";
import DetailsFrom from "./Components/Form/Details-from";
import { OtpProvider } from "./Context/OtpContext";
import { FormProvider } from "./Context/FormContext";
import PlanPage from "./Pages/PlanPage";
import { Payment } from "./Pages/Payment";
import { PlansProvider } from "./Context/PaymentContext";
import RouteGuard from "./Components/Protected/PrivateRoute.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import { PlanProvider } from "./Context/PlanContext.jsx";
import { BuyPlanProvider } from "./Context/BuyPlanContext.jsx";
import { AnchorProvider } from "./Context/AnchorContext.jsx";
import { SubscriptionProvider } from "./Context/subscriptionContext.jsx";

function App() {
  const router = createBrowserRouter([
    // Default route
    {
      path: "/",
      element: <Navigate to="/apay/subscription" replace />,
    },

    // OTP/Login page (public route)
    {
      path: "/:anchor/:subscription",
      element: (
        <RouteGuard type="public">
          <HomePage />
        </RouteGuard>
      ),
      children: [
        { index: true, element: <Childoutlets /> }, // OTP/login component
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
              <SubscriptionProvider>
                <PlanProvider>
                  <BuyPlanProvider>
                    <RouterProvider router={router} />
                  </BuyPlanProvider>
                </PlanProvider>
              </SubscriptionProvider>
            </PlansProvider>
          </FormProvider>
        </OtpProvider>
      </AuthProvider>
    </AnchorProvider>
  );
}

export default App;
