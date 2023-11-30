import React from "react";
import { displayCurrencyVND } from "../utils";

interface CartSummaryProps {
  total: number;
  cartQuantity: number;
}
function CartSummary({ cartQuantity, total }: CartSummaryProps) {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[40vw]">
      <h1 className="text-gray-900 font-semibold text-lg">Chi tiết giỏ hàng</h1>
      <div className="grid grid-cols-[2fr_auto] justify-between">
        <p className="text-gray-400 font-normal text-base leading-8">
          Tổng tiền tạm tính
        </p>
        <p className="text-gray-900 font-medium text-lg leading-8">
          {displayCurrencyVND(total)}
        </p>
        <p className="text-gray-400 font-normal text-base leading-8">
          Phí vận chuyển
        </p>
        <p className="text-gray-900 font-medium text-lg leading-8">
          {displayCurrencyVND(14000)}
        </p>
      </div>
      <div className="flex justify-between w-full my-4">
        <p className="text-gray-900 font-semibold">Tổng cộng:</p>
        <span className="text-orange-500 text-2xl">
          {displayCurrencyVND(total + 14000)}
        </span>
      </div>
      <button className="rounded-none bg-orange-500 text-white font-semibold w-full">
        Xác nhận giỏ hàng ({cartQuantity})
      </button>
    </div>
  );
}

export default CartSummary;
