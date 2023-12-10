import { Modal, message, Tag } from 'antd';
import React, { useState } from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import ProductForm from '../components/ProductForm';
import Table from '../components/Table';
import AdminLayout from '../layout';
import { deleteProduct, useFindAllProduct } from "../services/product";
import { displayCurrencyVND, renderStatusTags } from '../utils';
import Loading from '../components/Loading';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { shopSelector } from '../store/reducer/auth';
import { useFindAllOrdersByShopId } from '../services/order';

const Order = () => {
  const shop = useSelector(shopSelector);
  const id = shop._id;
  const { data } = useFindAllOrdersByShopId(id);
  console.log({data})
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [product, setProduct] = useState(null)
  const { data: products, isLoading } = useFindAllProduct()
  const handleCancel = () => {
    setModalOpen(false);
    setIsEditForm(false)
  };
  const handleDeletePopupCancel = () => {
    setDeleteModalOpen(false);
    setIsEditForm(false)
  };
  const handleDeleteProduct = async (product) => {
    handleDeletePopupCancel();
    const key = 'delete';
    messageApi.open({
      key,
      type: 'loading',
      content: 'Đang xóa...',
    });
    const response = await deleteProduct(product._id, product);
    console.log({ response })
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Đã xóa ' + product.product_name + ' thành công!',
        duration: 3,
      });
    }, 1500);

  }
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      width: 50
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => <p>{record.user.name}</p>
    },
    {
      title: 'Giá',
      dataIndex: 'overallTotalPrice',
      key: 'overallTotalPrice',
      width: 200,
      render: (_, record) => <span className='font-semibold text-xl'>{displayCurrencyVND(record.overallTotalPrice)}</span>
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (_,  record) => <>
      {
        renderStatusTags(record.status) 
      }
      </>
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <div className="items-center">
          <div className='py-1'>
            <MdModeEdit onClick={() => {
              setModalOpen(true);
              setIsEditForm(true);
              setProduct(record)
            }} className='cursor-pointer hover:text-red-500 hover:scale-105 inline-block' />
            <p className='inline-block px-2'>Chi tiết đơn hàng</p>
          </div>
        </div>
      ),
    },
  ];


  return (
    <AdminLayout>
      {contextHolder}
      <div className='m-8 h-full'>
        <h1 className="font-bold text-3xl p-4">Danh sách đơn hàng</h1>
        <button className="bg-gray-800 rounded-md px-4 py-2 text-white mb-4 flex items-center gap-x-2" onClick={() => { setModalOpen(true); setIsEditForm(false) }}>
          <FaPlus />
          <span>Tạo sản phẩm mới</span></button>
        {isLoading ? <Loading /> : <Table data={data} columns={columns} />}
      </div>
      <Modal title={<span>Xóa <strong>{isEditForm && product.product_name}</strong> hả?</span>} open={deleteModalOpen} onCancel={handleDeletePopupCancel} className='w-[10vw] h-[10vw]'
        footer={[
          <button
            onClick={handleDeletePopupCancel}
            className="px-4 py-1 rounded-md bg-white border text-red-500 border-red-500 mr-2">Hủy</button>,
          <button
            onClick={() => handleDeleteProduct(product)}
            className="px-4 py-1 rounded-md bg-red-500 text-white">OK</button>
        ]}
      ></Modal>
      <Modal
        title={<h1 className="text-3xl font-bold">{isEditForm ? product.product_name : "Thêm sản phẩm"}</h1>}
        open={modalOpen}
        footer={null}
        onCancel={handleCancel}
        className='min-w-[50vw]'
      >
        <ProductForm record={product} isEditForm={isEditForm} methods={{ setModalOpen }} />
      </Modal>
    </AdminLayout>
  )
}

export default Order