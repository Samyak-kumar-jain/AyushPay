import { Outlet, useParams } from "react-router-dom";
import Navbar from "../Components/Common/Navbar.jsx";
import SubmitButton from "../Components/Common/Button.jsx";
import support from "../assets/Support.png";
import {useSubscription} from "../Hooks/useSubsription.jsx"
import { useAnchor } from "../Hooks/UseAnchor.jsx";
import { useEffect } from "react";


const HomePage = () => {
  const {isPlanLoading} = useSubscription()

  const { anchor :paramAnchor } = useParams();     // comes from URL initially
  const { setAnchor, anchor } = useAnchor();

  useEffect(() => {
    if (paramAnchor) {
      setAnchor(paramAnchor);               // save in context
    }else if(anchor){
      setAnchor(anchor)
    }
  }, [paramAnchor]);
  
  return (
    <div className="flex justify-center ">
      
<div className="w-full max-w-[390px] h-screen border border-gray-200 relative overflow-hidden rounded-[12px] flex flex-col bg-white">
        <Navbar />

        
        <div className="w-full flex-1 flex flex-col py-[25px] px-[20px] bg-[#F9FAFB] overflow-y-auto no-scrollbar">
          <Outlet />
        </div>

       
        {
          !isPlanLoading ? (<><div className="py-[17px] px-[42px] shadow-sm border border-gray-200 bg-white z-20">
          <SubmitButton />
        </div></>) : null
        }

        
        {
          !isPlanLoading ? (<><img
          src={support}
          alt="Support"
          className="w-12 h-12 object-contain absolute right-4 bottom-[120px] z-50 cursor-pointer hover:scale-110 transition-transform"
        /></>) : null
        }
      </div>
    </div>
  );
};

export default HomePage;
