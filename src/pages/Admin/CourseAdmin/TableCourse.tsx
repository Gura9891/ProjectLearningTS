import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/configStore'
import {
  DanhMucKhoaHoc,
  deleteCouseAdminApi,
  getCourseDirectoryApi,
  getListCoursesApi,
  NguoiTao
} from '../../../redux/reducers/listCoursesReducer'
import { getListUserApi } from '../../../redux/reducers/userReducer'
import CourseRegisterUserModal from '../RegisterModal/Course/CourseRegisterUserModal'
import ModalCourse from './ModalCourse'

type Props = {}

export interface DataType {
  maKhoaHoc: string
  biDanh: string
  tenKhoaHoc: string
  moTa: string
  luotXem: number
  hinhAnh: string
  maNhom: string
  ngayTao: string
  soLuongHocVien: number
  nguoiTao: string
  danhMucKhoaHoc: DanhMucKhoaHoc
}

export default function TableCourse ({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const { arrayListCourses } = useSelector(
    (state: RootState) => state.listCoursesReducer
  )

  const columns: ColumnsType<DataType> = [
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: text => <img src={text} alt='' style={{ width: 50 }} />
    },
    { title: 'Mã khóa học', dataIndex: 'maKhoaHoc', key: 'maKhoaHoc' },
    { title: 'Tên khóa học', dataIndex: 'tenKhoaHoc', key: 'tenKhoaHoc', width: 300 },
    {
      title: 'Người tạo',
      dataIndex: 'nguoiTao',
      key: 'nguoiTao',
      render: text => <>{text.hoTen}</>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao'
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      key: 'luotXem'
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width:100,
      render: e => (
        <div className='d-flex justify-content-between'>
          <CourseRegisterUserModal maKhoaHoc={e.maKhoaHoc}/>
          <ModalCourse course={e} />
          <button className='red-button p-2' onClick={() => {
            dispatch(deleteCouseAdminApi(e.maKhoaHoc))
          }}>
            <i className='bi bi-trash3 m-0 p-2'></i>
          </button>
        </div>
      )
    }
  ]

  const data: DataType[] = arrayListCourses

  useEffect(() => {
    dispatch(getListCoursesApi())
    dispatch(getCourseDirectoryApi())
    dispatch(getListUserApi())
  }, [])

  return <Table columns={columns} dataSource={data} className="animate__animated animate__fadeIn animate__delay-2s"/>
}
