import React from "react";
import { useDispatch } from "react-redux";
import { Cart } from "../interfaces";
import { decreaseItem, increaseItem } from "../store/reducer/cart";

interface QuantityInputProps {
  cart: Cart;
  quantity: number;
  hasLabel: boolean;
}
const QuantityInput: React.FC<QuantityInputProps> = ({
  cart,
  quantity,
  hasLabel,
}) => {
  console.log({
    cart,
    quantity,
    hasLabel,
  });
  const dispatch = useDispatch();
  const increaseQuantity = () => {
    dispatch(increaseItem(cart));
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      dispatch(decreaseItem(cart));
    }
  };

  return (
    <div className="flex items-center">
      {hasLabel && (
        <label htmlFor="quantity" className="mr-2 text-gray-900">
          Số lượng:
        </label>
      )}
      <div className="flex items-center overflow-hidden h-8">
        <button
          onClick={decreaseQuantity}
          className="w-7 bg-gray-300 focus:outline-none rounded-none text-gray-800"
        >
          -
        </button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min={0}
          value={quantity}
          className="h-full text-center w-16 bg-white text-gray-900 border border-gray-300 outline-none"
          readOnly
        />
        <button
          onClick={increaseQuantity}
          className="w-7 bg-gray-300 focus:outline-none rounded-none text-gray-800"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
