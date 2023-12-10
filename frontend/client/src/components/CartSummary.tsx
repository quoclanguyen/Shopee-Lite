import React, { useEffect, useState } from "react";
import {
  convertToOrderItem,
  createOrderObject,
  displayCurrencyVND,
} from "../utils";
import { Modal as AntdModal } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { cartSelector } from "../store/reducer/cart";
import { accountSelector } from "../store/reducer/auth";
import { checkOut } from "../api/services/orderService";

const Modal = styled(AntdModal)`
  & .ant-btn-primary {
    background: #f97316;
  }
`;
interface CartSummaryProps {
  total: number;
  cartQuantity: number;
}
function CartSummary({ cartQuantity, total }: CartSummaryProps) {
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [showCoupon, setShowCoupon] = useState(false);
  const shippingFee = 0;
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const cart = useSelector(cartSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const account = useSelector(accountSelector);
  const priceAfterDiscount = (
    originalPrice: number,
    percentage: number,
    maximumDiscount: number
  ) => {
    return Math.min((originalPrice * percentage) / 100, maximumDiscount);
  };
  const handleCoupon = (e) => {
    setCoupon(e.target.value);
    if (e.target.value === "") {
      setShowCoupon(false);
    }
  };
  const handleSubmitCoupon = () => {
    setShowCoupon(true);
    setIsValidCoupon(coupon === validCoupon);
  };
  function renderCouponMessage(percentage: number, maximumPrice: number) {
    if (coupon === "") {
      return "";
    }
    return coupon === validCoupon ? (
      <p className="text-xs text-orange-500 my-2">
        Giảm {percentage}% đơn hàng, tối đa {displayCurrencyVND(maximumPrice)}
      </p>
    ) : (
      <p className="text-xs text-red-500 my-2">Mã giảm giá không đúng</p>
    );
  }
  const afterDiscount = (
    originalPrice: number,
    percentage: number,
    maximumDiscount: number
  ) => {
    return isValidCoupon
      ? priceAfterDiscount(originalPrice, percentage, maximumDiscount)
      : 0;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setCheckoutMessage("Vui lòng xác nhận đơn hàng!");
    const selectedItems = cart.filter((item) => item.select);
    const newObj = createOrderObject(
      account._id,
      convertToOrderItem(selectedItems)
    );
    const response = await checkOut(newObj);
    if (response.data) {
      setCheckoutMessage("Đặt hàng thành công");
    }
    console.log({ newObj });
    setConfirmLoading(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  };

  console.log({ cart });
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 w-[60vw]">
      <h1 className="text-gray-900 font-semibold text-lg">Chi tiết giỏ hàng</h1>
      <div className="grid grid-cols-[2fr_auto] justify-between">
        <p className="text-gray-400 font-normal text-base leading-8">
          Giá trị giỏ hàng
        </p>
        <p className="text-gray-900 font-medium text-lg leading-8">
          {displayCurrencyVND(total)}
        </p>
        <p className="text-gray-400 font-normal text-base leading-8">
          Phí vận chuyển
        </p>
        <p className="text-gray-900 font-medium text-lg leading-8 text-right">
          {displayCurrencyVND(shippingFee)}
        </p>
      </div>
      {/* <div className="flex justify-center items-center">
        <input
          className="bg-gray-100 outline-none text-base text-gray-900 px-4 py-2 border border-gray-300"
          onChange={handleCoupon}
        />
        <button
          onClick={handleSubmitCoupon}
          className="rounded-none h-fit p-2 bg-sky-800 text-white text-base"
        >
          Áp dụng
        </button>
      </div> */}
      {showCoupon && renderCouponMessage(percentageDiscount, maximumPrice)}
      {isValidCoupon && (
        <div className="grid grid-cols-[2fr_auto] justify-between">
          <p className="text-gray-400 font-normal text-base leading-8">
            Tổng tiền tạm tính
          </p>
          <p className="text-gray-900 font-medium text-lg leading-8 text-right">
            {displayCurrencyVND(total + shippingFee)}
          </p>
        </div>
      )}
      <div className="flex justify-between w-full my-4">
        <p className="text-gray-900 font-semibold">Tổng cộng:</p>
        <span className="text-orange-500 text-2xl">
          {displayCurrencyVND(total + shippingFee)}
        </span>
      </div>
      <button
        className="rounded-none bg-orange-500 text-white font-semibold w-full"
        onClick={showModal}
      >
        Xác nhận giỏ hàng ({cartQuantity})
      </button>
      <Modal
        title="Check Out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <p>{checkoutMessage}</p>
      </Modal>
    </div>
  );
}

export default CartSummary;
