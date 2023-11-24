import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout'
import Table from '../components/Table'
import {findAllProducts} from "../services/product";
import { MdModeEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";

import { Modal } from 'antd';
import ProductForm from '../components/ProductForm';
import { displayCurrencyVND } from '../utils';
import { useDispatch } from 'react-redux';
import { setProduct } from '../store/reducer/product';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [product, setProduct] = useState(null)
  const handleCancel = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllProducts();
        setProducts(response.metadata)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData(); 
  }, []);
  const columns = [
      {
        title: 'Tên sản phẩm',
        dataIndex: 'product_name',
        key: 'product_name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Giá',
        dataIndex: 'product_price',
        key: 'product_price',
        width: 300,
        render: (_, record) => <span>{displayCurrencyVND(record.product_price)}</span>
      },
      {
        title: 'Mô tả',
        dataIndex: 'product_description',
        key: 'product_description',
      },
      {
        title: 'Số lượng',
        key: 'product_quantity',
        dataIndex: 'product_quantity',
        width: 150,
      },
      {
        title: 'Thao tác',
        key: 'action',
        width: 100,
        render: (_, record) => (
          <div className="flex items-center gap-x-4">
            <MdModeEdit onClick={()=> {
              setModalOpen(true);
              setIsEditForm(true);
              setProduct(record)
            }} className='cursor-pointer hover:text-red-500 hover:scale-105' />
            <BsTrash3Fill className='cursor-pointer hover:text-red-500 hover:scale-105'/>
          </div>
        ),
      },
    ];
  console.log({product})
  return (
    <AdminLayout>
        <div className='m-8'>
            <h1 className="font-bold text-3xl p-4">Product</h1>
            <button className="bg-gray-800 rounded-md px-4 py-2 text-white mb-4 flex items-center gap-x-2" onClick={() => {setModalOpen(true); setIsEditForm(false)}}>
            <FaPlus />
              <span>Tạo sản phẩm mới</span></button>
            <Table data={products} columns={columns}/>
        </div>
        <Modal title={<h1 className="text-3xl font-bold">{isEditForm ? product.product_name : "Thêm sản phẩm"}</h1>} open={modalOpen}  footer={null} onCancel={handleCancel} className='min-w-[50vw]'>
          <ProductForm record={product} isEditForm={isEditForm}/>
      </Modal>
    </AdminLayout>
  )
}

export default Product