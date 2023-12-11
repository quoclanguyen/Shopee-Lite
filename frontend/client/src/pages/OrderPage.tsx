import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Tabs } from "antd";

function OrderPage() {
  return (
    <HomeLayout>
      <div className="m-4 p-4 bg-white rounded-md">
        <h1 className="text-2xl uppercase font-bold text-gray-800 border-l-4 border-l-orange-500 pl-4">
          Đơn hàng của tôi
        </h1>
        <hr className="my-4" />
        <Tabs
          defaultActiveKey="1"
          centered
          items={["pending", "confirmed"].map((_, i) => {
            const id = String(i + 1);
            return {
              label: `${_}`,
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />
      </div>
    </HomeLayout>
  );
}

export default OrderPage;
