import React from 'react'
import { Space, Table as AntdTable, Tag } from 'antd';

const Table = (props) => {
  const { columns, data } = props
  return (
    <AntdTable columns={columns} dataSource={data} className='rounded-full' bordered/>
  )
}

export default Table