import paymentBanr from"../../assets/PaymentBanr.png"
export default function PaymentBanner() {
  return (
    <div className=" bg-blue-50 rounded-lg flex items-center h-[125px]  px-[16px] py-[38px] justify-between shadow-sm ">
      {/* Left Content */}
      <div>
        <h2 className="text-2xl  font-bold text-[#4298C8]">
          Select the <br /> payment method
        </h2>
      </div>

      {/* Right Image Illustration */}
      <div className="flex-shrink-0">
        <img
          src={paymentBanr}
          alt="Plan Banner Illustration"
          className="w-[70px] h-[78px] object-contain"
        />
      </div>
      
    </div>
  );
}
