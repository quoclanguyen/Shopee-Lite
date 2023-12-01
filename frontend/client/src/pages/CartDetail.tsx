/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Cart } from "../interfaces";
import HomeLayout from "../layouts/HomeLayout";
import { cartSelector, cartTotalSelector } from "../store/reducer/cart";
import CartSummary from "../components/CartSummary";
import _ from "lodash";
import { Empty } from "antd";

function CartDetail() {
  const cart = useSelector(cartSelector);
  const cartQuantity = useSelector(cartTotalSelector);
  const extractedItems = cart.map((item: Cart) => ({
    product_price: item?.product.product_price,
    quantity: item?.quantity,
  }));
  const totalPrice = _.sumBy(
    extractedItems,
    (item) => item?.product_price * item?.quantity
  );
  console.log("Cart Detail:", cart);
  return (
    <HomeLayout>
      <div className="px-16 py-8">
        <div className="flex justify-between items-start gap-x-4">
          <div className="flex flex-col gap-4 w-full">
            {cart?.length === 0 && (
              <Empty
                image="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                imageStyle={{
                  height: 120,
                  width: "fit-content",
                  margin: "0 auto",
                }}
                description={<span>Giỏ hàng rỗng</span>}
              />
            )}
            {cart.map((item: Cart) => (
              <CartItem cart={item} />
            ))}
          </div>
          <CartSummary total={totalPrice} cartQuantity={cartQuantity} />
        </div>
      </div>
    </HomeLayout>
  );
}

export default CartDetail;
