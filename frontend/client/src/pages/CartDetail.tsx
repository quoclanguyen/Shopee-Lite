/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Empty } from "antd";
import { countBy, sumBy } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import Checkbox from "../components/Checkbox";
import { Cart } from "../interfaces";
import HomeLayout from "../layouts/HomeLayout";
import { cartSelector, deselectAll, selectAll } from "../store/reducer/cart";

function CartDetail() {
  const cart = useSelector(cartSelector);
  const [selectedAll, setSelectedAll] = useState(false);
  useEffect(() => {
    const selectedCount = countBy(cart, "selected")["true"] || 0;
    setSelectedAll(selectedCount === cart.length);
  }, [cart]);
  const dispatch = useDispatch();

  const extractedItems = cart
    .filter((item: Cart) => item.selected)
    .map((item: Cart) => ({
      product_price: item?.product.product_price,
      quantity: item?.quantity,
    }));
  console.log("Detail:", cart);
  const selectedCount = sumBy(cart, (item: Cart) =>
    item.selected ? item.quantity : 0
  );
  const totalPrice = sumBy(
    extractedItems,
    (item) => item?.product_price * item?.quantity
  );
  const handleSelectedAll = () => {
    setSelectedAll(!selectedAll);
    dispatch(!selectedAll ? selectAll() : deselectAll());
  };
  return (
    <HomeLayout>
      <App>
        <div className="px-16 py-8">
          <div className="flex justify-between items-start gap-x-4">
            <div className="flex flex-col w-full gap-2">
              {cart?.length > 1 && (
                <div className="bg-white rounded-md shadow-md overflow-hidden relative cursor-pointer duration-100 p-2 flex-grow gap-x-4 flex">
                  <Checkbox
                    checked={selectedAll}
                    onChange={handleSelectedAll}
                  />
                  <span>{!selectedAll ? "Chọn tất cả" : "Bỏ chọn tất cả"}</span>
                </div>
              )}
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
            <CartSummary total={totalPrice} cartQuantity={selectedCount} />
          </div>
        </div>
      </App>
    </HomeLayout>
  );
}

export default CartDetail;
