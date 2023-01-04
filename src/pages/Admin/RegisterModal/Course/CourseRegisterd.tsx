import React, { useEffect } from 'react'
import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AppDispatch, RootState } from '../../../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { getListUserRegisteredCourseApi } from '../../../../redux/reducers/listCoursesReducer'
import { UnRegisterCourseApi } from '../../../../redux/reducers/userReducer'

type Props = {
  maKhoaHoc: string
}

interface DataType {
  taiKhoan: string
  hoTen: string
  biDanh: string
}
export default function CourseRegisterd ({ maKhoaHoc }: Props) {
  const dispatch: AppDispatch = useDispatch()

  const {arrUserRegisteredCourse} = useSelector((state: RootState) => state.listCoursesReducer)

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: 200
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen'
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: e => (
        <div className='d-flex justify-content-between'>
          <button
            className='red-button px-3 py-1 mx-2'
            onClick={() => {
              dispatch(UnRegisterCourseApi(maKhoaHoc, e.taiKhoan))
            }}
          >
            <i className='m-0 bi bi-x-square'></i>
          </button>
        </div>
      )
    }
  ]

  const data: DataType[] = arrUserRegisteredCourse

  useEffect(() => {
    dispatch(getListUserRegisteredCourseApi(maKhoaHoc))
  },[maKhoaHoc])

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  )
}
