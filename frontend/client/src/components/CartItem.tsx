import { Rate, Tag } from "antd";
import React from "react";
import { Cart } from "../interfaces";
import { displayCurrencyVND } from "../utils";
import QuantityInput from "./QuantityInput";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
interface CartItemProps {
  cart: Cart;
}
const CartItem: React.FC<CartItemProps> = ({ cart }) => {
  const navigate = useNavigate();
  const renderTag = (tag: string) => {
    switch (tag) {
      case "new":
        return <Tag color="#40f23a">Mới</Tag>;
      case "hot":
        return <Tag color="#ff8d03">Nóng</Tag>;
      case "sale":
        return <Tag color="#f42020">Sale</Tag>;
      default:
        return <Tag color="#40f23a">Mới</Tag>;
    }
  };
  console.log({ cart });
  return (
    <div
      className={clsx(
        "bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer duration-100 px-4 py-2 flex-grow",
        { hidden: cart.quantity === 0 }
      )}
    >
      <div className="flex items-start">
        <img
          src={cart.product.product_thumb}
          className="w-[150px] h-[150px] border-2 border-orange-500 object-contain"
        />
        <div className="ml-4">
          <h1
            className="text-gray-900 font-semibold text-base w-full text-ellipsis line-clamp-2 hover:text-sky-500 hover:underline"
            onClick={() => navigate("/product/" + cart.product._id)}
          >
            {/* {renderTag(cart.product?.tag)} */}
            {cart.product.product_name}
          </h1>
          <p className="mt-2 text-orange-500 font-medium text-2xl">
            {displayCurrencyVND(cart.product?.product_price)}
          </p>
          <div className="mt-2">
            {/* <Rate
              disabled
              defaultValue={cart.product?.rating.rate}
              style={{ fontSize: 10 }}
            /> */}
            {/* <span className="text-sky-600 text-sm ml-4">
              {cart.product?.rating.count} đánh giá
            </span> */}
          </div>
          <QuantityInput
            quantity={cart.quantity}
            cart={cart}
            hasLabel={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
