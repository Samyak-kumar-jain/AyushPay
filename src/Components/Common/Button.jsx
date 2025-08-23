import useSubmitButtonLogic from "../../Hooks/useSubmitButtonLogic.jsx";

const SubmitButton = () => {
  const { handleClick, getButtonText, isDisabled } = useSubmitButtonLogic();

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled()}
      className={`w-full font- cursor-pointer py-3 px-6 rounded-full transition ${
        isDisabled()
          ? "bg-[#C8E6C9] text-white cursor-not-allowed"
          : "bg-green-400 text-white hover:bg-green-500"
      }`}
    >
      {getButtonText()}
    </button>
  );
};

export default SubmitButton;
