import React, { useState } from 'react'

type Props = {}

type dataTodo = {
  tenCongViec: string
}

export default function Todo ({}: Props) {
  let dataTodo: dataTodo[] = [
    { tenCongViec: 'thêm học viên' },
    { tenCongViec: 'thêm khóa học' },
    { tenCongViec: 'sửa khóa học' }
  ]

  const renderListTodo = () => {
    return dataTodo.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.tenCongViec}</td>
          <td>
            <input type='checkbox'/>
            <button className='px-3 text-danger mx-2'>X</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className='todo'>
      <p className='fs-3'>Việc làm hôm nay</p>
      <table className='table'>
        <thead>
          <tr>
            <td>Việc làm</td>
            <td>Trạng thái</td>
          </tr>
        </thead>
        <tbody>{renderListTodo()}</tbody>
      </table>
    </div>
  )
}
