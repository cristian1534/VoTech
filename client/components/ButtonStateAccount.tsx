import { BiDollarCircle } from "react-icons/bi";

interface ButtonProps {
  handlePaymentState: (uuid: string) => Promise<void>;
  uuid: string;
  className?: string;
  payment: boolean;
}

export const ButtonStateAccount = ({
  handlePaymentState,
  uuid,
  className,
  payment,
}: ButtonProps) => {
  console.log("current payment", payment)
  return (
    <button
      onClick={() => handlePaymentState(uuid)}
      className={`px-4 py-2 shadow-md ${
        payment
          ? "shadow-green-500 bg-gradient-to-r from-white to-green-600 hover:from-green-500 hover:to-white"
          : "shadow-red-500 bg-gradient-to-r from-white to-red-600 hover:from-red-500 hover:to-white"
      } rounded-md transition-colors text-white ${className}`}
    >
      <BiDollarCircle size={24} />
    </button>
  );
};
