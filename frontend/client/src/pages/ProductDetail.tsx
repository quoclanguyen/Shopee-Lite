// ProductDetail.tsx
import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFindProductById } from "../api/services/productServices";
import Loading from "../components/Loading";
import useLoading from "../hooks/useLoading";
import { Rate } from "antd";
import { displayCurrencyVND } from "../utils";
import HomeLayout from "../layouts/HomeLayout";
import QuantityInput from "../components/QuantityInput";
import { useSelector } from "react-redux";
import cart, { cartSelector } from "../store/reducer/cart";
import { Product } from "../interfaces";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useFindProductById(id || "");
  const cartItems = useSelector(cartSelector);
  const foundItem = useMemo(() => {
    return (
      cartItems.find((item) => item.product._id === id) ?? {
        product: product,
        quantity: 0,
      }
    );
  }, [cartItems, id, product]);
  console.log({ foundItem, cartItems });
  if (isLoading) return <p>Loading...</p>;
  return (
    <HomeLayout>
      <div className="md:flex px-4 py-4 max-h-full">
        <div className="md:flex-shrink-0">
          <img
            className="h-[300px] w-[300px] object-contain border-4 border-orange-500"
            src={product?.product_thumb}
            alt={product?.product_name}
          />
        </div>
        <div className="px-8">
          <div className="uppercase tracking-wide text-gray-800 text-lg font-semibold">
            {product?.product_name}
          </div>
          <p className="mt-2 text-orange-500 font-medium text-2xl">
            {displayCurrencyVND(product?.product_price)}
          </p>
          {/*  <div className="mt-2">
            <Rate
              disabled
              defaultValue={product?.rating.rate}
              style={{ fontSize: 10 }}
            />
            <span className="text-sky-600 text-sm ml-4">
              {product?.rating.count} đánh giá
            </span>
          </div> */}
          <QuantityInput
            quantity={foundItem?.quantity}
            hasLabel
            cart={foundItem}
          />
          <div className="flex justify-start gap-x-4 items-center my-4 outline-none">
            <button className="rounded-none px-4 py-2 bg-amber-400 text-white w-[20vw] box-border">
              Mua ngay
            </button>

            <button className="rounded-none px-4 py-2 bg-orange-500 text-white w-[20vw] box-border outline-none">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProductDetail;
