import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/configStore'
import {
  getListCourseNotRegisterApi,
  registerCourseApi
} from '../../../../redux/reducers/userReducer'
import UserTableRegisted from './UserTableRegisted'
import UserTableRegister from './UserTableRegister'

type Props = {
  taiKhoan: string
}

export default function UserRegisterCourseModal ({ taiKhoan }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { listCourseOfStudent } = useSelector(
    (state: RootState) => state.userReducer
  )
  const [maKhoaHoc, setMaKhoaHoc] = useState("")

  const dispatch: AppDispatch = useDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setMaKhoaHoc(listCourseOfStudent[0]?.maKhoaHoc)
  },[taiKhoan])

  return (
    <>
      <Button
        className='green-button p-2 h-100'
        type='primary'
        onClick={() => {
          showModal()
          dispatch(getListCourseNotRegisterApi(taiKhoan))
        }}
      >
        <i className='bi bi-plus-circle m-0 p-2'></i>
      </Button>
      <Modal
        title='Ghi danh khóa học'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <section id='register-user-admin' className=''>
          <div className='form-item w-100'>
            <p className='fs-5 py-4'>Đăng ký khoá học</p>
            <div className='form-action w-100'>
              <select
                name='tenKhoaHoc'
                id='tenKhoaHoc'
                className='w-75'
                defaultValue={listCourseOfStudent[0]?.maKhoaHoc}
                onChange={e => {
                  setMaKhoaHoc(e.target.value)
                }}
              >
                {listCourseOfStudent.map((item, index) => {
                  return (
                    <option value={index === 0 ? "" : item.maKhoaHoc} key={index}>
                      {index === 0 ? "Chọn khóa học" : item.tenKhoaHoc}
                    </option>
                  )
                })}
              </select>
              <button
                className='blue-button w-25 p-3'
                onClick={() => {
                  dispatch(registerCourseApi(maKhoaHoc, taiKhoan))
                }}
              >
                Đăng ký
              </button>
            </div>
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Khóa học chờ đăng ký</p>
            <UserTableRegister taiKhoan={taiKhoan} />
          </div>
          <div className='form-item'>
            <p className='fs-5 py-4'>Khóa học đã đăng ký</p>
            <UserTableRegisted taiKhoan={taiKhoan} />
          </div>
        </section>
      </Modal>
    </>
  )
}
