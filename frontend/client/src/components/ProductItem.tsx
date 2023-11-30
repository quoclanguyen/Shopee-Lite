/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rate, Tag } from "antd";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Cart, Product } from "../interfaces";
import { displayCurrencyVND } from "../utils";
import { addItem, cartSelector } from "../store/reducer/cart";
import clsx from "clsx";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);
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
  const isProductInCart = cartItems.find(
    (item: Cart) => item.product.id === product.id
  );
  return (
    <div
      key={product.id}
      className="bg-white rounded-md shadow-md overflow-hidden flex-grow relative cursor-pointer hover:scale-110 duration-100"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {showCart && (
        <FaShoppingCart
          className={clsx(
            "absolute right-2 top-2 bg-transparent text-gray-400 cursor-pointer fade-in text-2xl",
            {
              "text-orange-500": isProductInCart,
            }
          )}
          onClick={(event) => {
            const cart: Cart = {
              product,
              quantity: 1,
            };
            event.stopPropagation();
            dispatch(addItem(cart));
          }}
        />
      )}
      <img
        src={product.image}
        alt={product.title}
        className="h-[150px] w-[200px] object-contain pb-2"
      />
      <div className="p-2 border-t-gray-100 border-t-2 card">
        <h1 className="text-gray-900 font-semibold text-base w-full text-ellipsis line-clamp-2 ">
          {renderTag(product.tag)}
          {product.title}
        </h1>
        <h1 className="text-orange-500 font-medium text-2xl">
          {displayCurrencyVND(product.price)}
        </h1>
        <div>
          <Rate
            disabled
            defaultValue={product.rating.rate}
            style={{ fontSize: 10 }}
          />
          <span className="text-gray-400 text-sm ml-4">
            ({product.rating.count})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
