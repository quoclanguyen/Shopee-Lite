import { useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { cartSelector } from "../store/reducer/cart";
import { displayCurrencyVND } from "../utils";
import { Cart } from "../interfaces";
import { sumBy } from "lodash";

function ConfirmOrder() {
  const cart = useSelector(cartSelector);
  const extractedItems = cart
    .filter((item: Cart) => item.select)
    .map((item: Cart) => ({
      product_price: item?.product.product_price,
      quantity: item?.quantity,
    }));
  const totalPrice = sumBy(
    extractedItems,
    (item) => item?.product_price * item?.quantity
  );
  return (
    <HomeLayout>
      <div className="bg-white p-4 m-4 rounded-md">
        <h1 className="text-gray-900 text-xl font-semibold">
          Kiểm tra đơn hàng
        </h1>
        <hr className="my-4" />
        <div className="grid grid-cols-3 gap-4 justify-between items-center w-full px-8">
          <p>Tên sản phẩm</p>
          <p className="text-center">Số lượng</p>
          <p className="text-right">Thành tiền</p>
          {cart.map((item) => (
            <>
              <div className="flex items-center gap-x-2">
                <img
                  src={item.product.product_thumb}
                  className="h-20 border rounded-sm border-gray-500"
                />
                <p className="uppercase text-gray-900 font-semibold">
                  {item.product.product_name}
                </p>
              </div>
              <h1 className="text-xl font-semibold text-gray-600 text-center">
                x {item.quantity}
              </h1>
              <h1 className="text-xl font-semibold text-gray-600 text-right">
                {displayCurrencyVND(item.quantity * item.product.product_price)}
              </h1>
            </>
          ))}
        </div>
        <h1 className="font-semibold text-xl text-gray-800 my-4 text-right pr-8">
          Tổng tiền: {displayCurrencyVND(totalPrice)}
        </h1>
      </div>
      <div className="bg-white rounded-md p-4 m-4">
        <h1 className="text-gray-900 text-xl font-semibold">
          Địa chỉ giao hàng
        </h1>
        <hr className="my-4" />
      </div>
    </HomeLayout>
  );
}

export default ConfirmOrder;
