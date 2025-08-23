import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar.jsx";
import SubmitButton from "../Components/Common/Button.jsx";

const HomePage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[390px] h-[100vh] border border-gray-200 fixed overflow-hidden rounded-[12px] flex flex-col">
        <Navbar />

        {/* Scrollable content */}
        <div className="w-full flex-1 flex flex-col py-[25px] px-[20px] bg-[#F9FAFB] overflow-y-auto no-scrollbar">
          <Outlet />
        </div>

        {/* Submit button fixed at bottom */}
        <div className="py-[17px] px-[42px] shadow-sm border border-gray-200">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
