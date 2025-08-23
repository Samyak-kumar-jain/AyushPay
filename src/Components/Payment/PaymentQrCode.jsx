import Qr from "../../assets/Qr.png"


const PaymentQrCode = () => {
  return (
    <div className='flex justify-center mt-[54px]'>
        <img src={Qr} className='w-[200px]'></img>
    </div>
  )
}

export default PaymentQrCode