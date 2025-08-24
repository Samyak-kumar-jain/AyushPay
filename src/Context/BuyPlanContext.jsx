import { createContext } from "react";

export const BuyPlanContext = createContext()

export const BuyPlanProvider = ({children}) =>{
    

    const handleBuyPlan = () =>{

        return true;

    }



    return (
        <BuyPlanContext.Provider value={{handleBuyPlan}}>
            {children}
        </BuyPlanContext.Provider>
    )
}