/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag } from "antd";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Cart } from "../interfaces";
import { displayCurrencyVND } from "../utils";
import QuantityInput from "./QuantityInput";
import Checkbox from "./Checkbox";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch } from "react-redux";
import { selectOne } from "../store/reducer/cart";

interface CartItemProps {
  cart: Cart;
}
const CartItem: React.FC<CartItemProps> = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const onChange = () => {
    dispatch(selectOne(cart.product._id));
  };
  return (
    <div className="flex items-center gap-x-4 pl-2">
      <Checkbox checked={cart.selected} onChange={onChange} />
      <div
        className={clsx(
          "bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer duration-100 px-4 py-2 flex-grow",
          { hidden: cart.quantity === 0 }
        )}
      >
        <div className="flex items-start">
          <img
            src={cart.product.product_thumb}
            className="h-[100px] w-[100px] border border-gray-300 object-contain"
          />
          <div className="ml-4 flex flex-col justify-between">
            <h1
              className="text-gray-900 font-semibold text-base w-full text-ellipsis line-clamp-2 hover:text-sky-500 hover:underline"
              onClick={() => navigate("/product/" + cart.product.product_slug)}
            >
              {/* {renderTag(cart.product?.tag)} */}
              {cart.product.product_name}
            </h1>
            <p className="mt-2 text-orange-500 font-medium text-xl">
              {displayCurrencyVND(cart.product?.product_price)}
            </p>
            <QuantityInput
              quantity={cart.quantity}
              cart={cart}
              hasLabel={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
