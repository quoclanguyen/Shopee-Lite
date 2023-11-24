import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import storage from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getCurrentDateAsString } from '../utils';
import { clothSize } from '../constants';
const ProductForm = ({record, isEditForm}) => {
    const { handleSubmit, control, register, getValues, watch, reset, setValue } = useForm({
        defaultValues: isEditForm ? record : null,
        mode: 'onBlur'
    });
    const values = getValues();
    console.log("Values: ", values)
    console.log("Record: ", record)
    // useEffect(()=>{
    //     if(record){
    //       switch(record.product_type){
    //         case "Electronics": {
    //             setValue("product_name", record.product_name)
    //             setValue("product_price", record.product_price)
    //             setValue("product_quantity", record.product_quantity)
    //             setValue("product_thumb", record.product_thumb)
    //             setValue("product_type", record.product_type);
    //             setValue("product_attributes.manufacturer", record.product_attributes.manufacturer);
    //             setValue("product_attributes.model", record.product_attributes.model);
    //             setValue("product_attributes.color", record.product_attributes.color);
    //             setValue("product_attributes.brand", null);
    //             setValue("product_attributes.size", null);
    //             setValue("product_attributes.material", null);
    //             break;
    //         }
    //         case "Furniture": {
    //             setValue("product_name", record.product_name)
    //             setValue("product_price", record.product_price)
    //             setValue("product_quantity", record.product_quantity)
    //             setValue("product_thumb", record.product_thumb)
    //             setValue("product_type", record.product_type);

    //             break;
    //         }
    //         case "Clothes": {
    //             setValue("product_attributes.manufacturer", null);
    //             setValue("product_attributes.model", null);
    //             setValue("product_attributes.color", null);
    //             setValue("product_name", record.product_name)
    //             setValue("product_price", record.product_price)
    //             setValue("product_quantity", record.product_quantity)
    //             setValue("product_thumb", record.product_thumb)
    //             setValue("product_type", record.product_type);
    //             setValue("product_attributes.brand", record.product_attributes.brand);
    //             setValue("product_attributes.size", record.product_attributes.size);
    //             setValue("product_attributes.material", record.product_attributes.material);
    //             break;
    //         }
    //       }
    //     }
    // },[record])
    watch();
 
    const [product, setProduct] = useState(null)
    const handleReset = () => {
        reset();
    };
    const [imageUrl, setImageUrl] = useState("")
    const onSubmit = (data) => {
        const { product_name, product_description, product_quantity, product_price, product_thumb, product_type } = data;
        console.log({data})
        const storageRef = ref(storage, `/products/product-${getCurrentDateAsString()}`);
        const uploadTask = uploadBytesResumable(storageRef, product_thumb);
        new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // update progress
                    setPercentage(percent);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                },
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        setProduct({
                            product_name,
                            product_thumb,
                            product_description,
                            product_price,
                            product_quantity,
                            product_type,
                            product_attributes: {
                                brand: 'Local brand',
                                size: 'XL',
                                material: 'Cotton',
                            },
                        })
                        resolve(url);

                    }
                    catch (error) {
                        console.log("Error getting download url")
                        reject(error);
                    }

                }
            );
        })
    };
    console.log({ product })
    function renderType() {
        const category = getValues("product_type");
        console.log({category})
        switch (category) {
            case "Electronics": return <div class="w-full flex gap-x-4 items-center">
            <div className='w-full'>
                <label>Hãng</label>
                <input
                    type="text"
                    id="product_attributes.manufacturer"
                    name="product_attributes.manufacturer"
                    {...register('product_attributes.manufacturer', { required: true, min: 1 })}
                    className="p-2 border rounded-md w-full"
                />
            </div>

            <div className='w-full'>

                <label>Dòng</label>
                <input
                    type="text"
                    id="product_attributes.model"
                    name="product_attributes.model"
                    {...register('product_attributes.model', { required: true, min: 1 })}
                    className="p-2 border rounded-md w-full"
                />
            </div>
            <div className='w-full'>

                <label>Màu sắc</label>
                <input
                    type="text"
                    id="product_attributes.color"
                    name="product_attributes.color"
                    {...register('product_attributes.color', { required: true, min: 1 })}
                    className="p-2 border rounded-md w-full"
                />
            </div>

        </div>;;
            case "Furniture": return <div class="w-full flex gap-x-4 items-center">

            </div>;
            case "Clothes": return <div class="w-full flex gap-x-4 items-center">
                <div className='w-full'>
                    <label>Nhãn hàng</label>
                    <input
                        type="text"
                        id="brand"
                        name="product_attributes.brand"
                        {...register('product_attributes.brand', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>

                <div className='w-full'>

                    <label>Kích thước</label>
                    <Controller
                        name="product_attributes.size"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <select id="sizeSelect" {...field} className="p-2 border rounded-md w-full">
                                {
                                    clothSize.map((item, index) => <option value={item} key={index}>{item}</option>)
                                }
                            </select>
                        )}
                    />
                </div>
                <div className='w-full'>

                    <label>Chất liệu</label>
                    <input
                        type="text"
                        id="product_attributes.material"
                        name="product_attributes.material"
                        {...register('product_attributes.material', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>

            </div>;
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <label htmlFor="product_name" className="block text-sm font-medium text-gray-600">
                Tên sản phẩm:
            </label>
            <input
                type="text"
                id="product_name"
                name="product_name"
                {...register('product_name', { required: true })}
                className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mt-4">
                Mô tả:
            </label>
            <textarea
                id="description"
                name="product_description"
                {...register('product_description', { required: true })}
                className="mt-1 p-2 border rounded-md w-full"
                rows="4"
            />

            <label htmlFor="quantity" className="block text-sm font-medium text-gray-600 mt-4">
                Số lượng:
            </label>
            <input
                type="number"
                id="quantity"
                name="product_quantity"
                {...register('product_quantity', { required: true, min: 1 })}
                className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mt-4">
                Giá:
            </label>
            <input
                type="number"
                id="price"
                name="product_price"
                {...register('product_price', { required: true, min: 0.01 })}
                className="mt-1 p-2 border rounded-md w-full"
            />
            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mt-4">
                Loại:
            </label>
            <Controller
                name="product_type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <select id="categorySelect" {...field} className="mt-1 p-2 border rounded-md w-full">
                        <option value="">-- Select --</option>
                        <option value="Electronics">Điện tử</option>
                        <option value="Clothes">Quần áo</option>
                        <option value="Furniture">Nội thất</option>
                    </select>
                )}
            />
            {renderType()}
            <label htmlFor="image" className="block text-sm font-medium text-gray-600 mt-4">
                Tải ảnh lên:
            </label>
            <Controller
                name="product_thumb"
                control={control}
                render={({ field }) => (
                    <input type="file" onChange={(e) => field.onChange(e.target.files[0])} className="mt-1 p-2" />
                )}
                rules={{ required: true }}
            />
            <div className="flex justify-center items-center w-full gap-x-4">
                <input
                    type="submit"
                    value="Submit"
                    className="block mx-auto w-[80%] mt-4 bg-gray-800 text-white text-xl p-2 rounded-md cursor-pointer hover:bg-gray-600"
                />
                <button onClick={handleReset}
                    className="block mx-auto w-[20%] mt-4 bg-red-800 text-white text-xl p-2 rounded-md cursor-pointer hover:bg-red-600"
                >Reset</button>
            </div>
        </form>
    );
};

export default ProductForm;
