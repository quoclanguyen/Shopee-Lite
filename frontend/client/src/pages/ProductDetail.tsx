// ProductDetail.tsx
import { Breadcrumb, Rate } from "antd";
import { useMemo } from "react";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useFindProductBySlug } from "../api/services/productServices";
import QuantityInput from "../components/QuantityInput";
import { Cart } from "../interfaces";
import HomeLayout from "../layouts/HomeLayout";
import { addItem, cartSelector } from "../store/reducer/cart";
import { displayCurrencyVND } from "../utils";
import { renderAttributesByType } from "../helper";

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useFindProductBySlug(slug || "");
  const cartItems = useSelector(cartSelector);
  const isProductInCart = useMemo(() => {
    return cartItems.find((item: Cart) => item.product._id === product._id);
  }, [product, cartItems]);
  const dispatch = useDispatch();
  const foundItem = useMemo(() => {
    return (
      cartItems.find((item) => item.product._id === product._id) ?? {
        product: product,
        quantity: 0,
      }
    );
  }, [cartItems, slug, product]);
  console.log({ product });
  if (isLoading) return <p>Loading...</p>;
  return (
    <HomeLayout>
      <div className="m-4">
        <Breadcrumb
          className="mb-4"
          items={[
            {
              title: (
                <Link to="/">
                  <div className="flex items-center justify-center gap-x-1">
                    <FaHome />
                    <span>Trang chủ</span>
                  </div>
                </Link>
              ),
            },
            {
              title: (
                <Link to={`/category?=${product?.product_type}`}>
                  {product?.product_type}
                </Link>
              ),
            },
            {
              title: (
                <Link to={`/product/${product?.product_slug}`}>
                  {product?.product_name}
                </Link>
              ),
            },
          ]}
        />
        <div className="md:flex p-4 max-h-full bg-white rounded-md">
          <div className="md:flex-shrink-0">
            <img
              className="h-[300px] w-[300px] object-contain border-4 border-orange-500"
              src={product?.product_thumb}
              alt={product?.product_name}
            />
          </div>
          <div className="px-8">
            <div className="uppercase tracking-wide text-gray-800 text-xl font-semibold">
              {product?.product_name}
            </div>
            <Rate
              disabled
              defaultValue={product.product_ratingsAverage}
              allowHalf
              style={{ fontSize: 16 }}
            />
            <p className="mt-2 text-orange-500 font-medium text-2xl">
              {displayCurrencyVND(product?.product_price)}
            </p>
            <div>
              <span>Sản phẩm của</span>
              <span className="ml-2 text-orange-500">Lân shopee</span>
            </div>

            <hr className="my-4" />
            <div className="grid grid-cols-2">
              {renderAttributesByType(product.product_type, product)}
            </div>
            <hr className="my-4" />
            <QuantityInput
              quantity={foundItem?.quantity}
              hasLabel
              cart={foundItem}
            />
            <div className="flex justify-start gap-x-4 items-center my-4 outline-none">
              <button className="rounded-none px-4 py-2 bg-amber-400 text-white w-[20vw] box-border">
                Mua ngay
              </button>
              <button
                className="rounded-none px-4 py-2 bg-orange-500 text-white w-[20vw] box-border outline-none"
                onClick={() => {
                  const cart: Cart = {
                    product,
                    quantity: 1,
                  };
                  dispatch(addItem(cart));
                }}
              >
                {isProductInCart ? "Xoá khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-md my-4">
          <h1 className="text-gray-900 text-xl font-semibold">Mô tả</h1>
          <hr className="my-4" />
          <p className="italic text-gray-500">{product.product_description}</p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ProductDetail;
