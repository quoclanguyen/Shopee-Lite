import { Modal as AntdModal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { accountSelector } from "../store/reducer/auth";
import { cartSelector } from "../store/reducer/cart";
import {
  convertToOrderItem,
  createOrderObject,
  displayCurrencyVND,
} from "../utils";
import { setOrder } from "../store/reducer/order";

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
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const shippingFee = 0;
  const dispatch = useDispatch();
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const cart = useSelector(cartSelector);
  const account = useSelector(accountSelector);
  const navigate = useNavigate();

  const handleOk = async () => {
    const selectedItems = cart.filter((item) => item.select);
    dispatch(
      setOrder(
        createOrderObject(account._id, convertToOrderItem(selectedItems))
      )
    );
    // kiểm tra xem đã thêm sản phẩm vào order chưa
    console.log({ selectedItems });
    if (selectedItems.length !== 0) {
      navigate("/confirm-order");
    } else {
      setShowWarningModal(true);
    }
  };

  const handleCancel = () => {
    setShowWarningModal(false);
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
        onClick={handleOk}
      >
        Xác nhận giỏ hàng ({cartQuantity})
      </button>
      <Modal
        open={showWarningModal}
        title={
          <>
            <h1 className="text-xl">Oops!!!!</h1>
            <hr className="my-4" />
          </>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key="submit"
            className="focus:outline-none ml-4 bg-orange-500 border border-orange-400 rounded-md text-white"
            onClick={handleCancel}
          >
            Tôi đã hiểu
          </button>,
        ]}
      >
        <p className="text-xl text-center">Đơn hàng trống!</p>
        <p className="text-xl text-center">
          Vui lòng chọn sản phẩm bạn muốn mua
        </p>
      </Modal>
    </div>
  );
}

export default CartSummary;
