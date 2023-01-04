import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/configStore'
import {
  addUserApi,
  updateUserApi,
  userAdmin
} from '../../../redux/reducers/userReducer'

type Props = {
  user?: userAdmin 
}

export default function ModalUser ({ user }: Props) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch: AppDispatch = useDispatch()

  let regexPhone = new RegExp(
    '^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$'
  )
  let regexPass = new RegExp(
    '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$'
  )
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: user?.taiKhoan || '',
      matKhau: user?.matKhau || '',
      hoTen: user?.hoTen || '',
      soDT: user?.soDT || '',
      maNhom: user?.maNhom || 'GP01',
      email: user?.email || '',
      maLoaiNguoiDung: user?.maLoaiNguoiDung || 'HV'
    },

    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required('Tên tài khoản không được bỏ trống'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .email('Email không đúng định dạng'),
      hoTen: Yup.string().required('Tên không được để trống'),
      soDT: Yup.string()
        .required('Số điện thoại không được bỏ trống')
        .matches(regexPhone, 'Số điện thoại không đúng định dạng'),
      matKhau: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải từ 6-32 ký tự')
        .max(32, 'Mật khẩu từ 6-32 ký tự')
        .matches(regexPass, 'Mật khẩu không đúng định dạng')
    }),
    onSubmit: values => {
      if (user) {
        dispatch(updateUserApi(values))
      } else {
        dispatch(addUserApi(values))
      }
      setLoading(true)
      setTimeout(() => {
        form.resetForm()
        setLoading(false)
        setOpen(false)
      }, 2000)
    }
  })

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    form.handleSubmit()
  }

  const handleCancel = () => {
    form.resetForm()
    setOpen(false)
  }
  return (
    <>
      {user ? (
        <Button
          className='blue-button p-2 mx-2 h-100'
          type='primary'
          onClick={() =>{
            setOpen(true)
          }}
        >
          <i className='bi bi-pencil-square m-0 p-2'></i>
        </Button>
      ) : (
        <Button
          className='green-button fs-4 py-4 h-100 animate__animated animate__fadeIn'
          type='primary'
          onClick={showModal}
          style={{width: "fit-content"}}
        >
          {' '}
          Thêm người dùng
        </Button>
      )}
      <Modal
        open={open}
        title={user ? 'Sửa người dùng' : 'Thêm người dùng'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          user
            ? [
                <Button danger key='back' onClick={handleCancel}>
                  Trở lại
                </Button>,
                <Button
                  key='submit'
                  type='primary'
                  loading={loading}
                  onClick={handleOk}
                >
                  Cập nhật
                </Button>
              ]
            : [
                <Button danger key='back' onClick={handleCancel}>
                  Trở lại
                </Button>,
                <Button
                  key='submit'
                  type='primary'
                  loading={loading}
                  onClick={handleOk}
                >
                  Thêm
                </Button>
              ]
        }
      >
        <div className='paper'>
          <form className='row' onSubmit={form.handleSubmit}>
            <div className='form-item col-6 mb-4'>
              <p>Tài khoản</p>
              <input
                type='text'
                id='taiKhoan'
                name='taiKhoan'
                value={form.values.taiKhoan}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={user ? true : false}
              />
              {form.errors.taiKhoan && form.touched.taiKhoan ? (
                <div className='text-danger position-absolute'>
                  {form.errors.taiKhoan}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='form-item col-6 mb-4'>
              <p>Email</p>
              <input
                type='text'
                id='email'
                name='email'
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.email && form.touched.email ? (
                <div className='text-danger position-absolute'>
                  {form.errors.email}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='form-item col-6 mb-4'>
              <p>Mật khẩu</p>
              <input
                type='text'
                id='matKhau'
                name='matKhau'
                value={form.values.matKhau}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.matKhau && form.touched.matKhau ? (
                <div className='text-danger position-absolute'>
                  {form.errors.matKhau}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='form-item col-6 mb-4'>
              <p>Số điện thoại</p>
              <input
                type='text'
                id='soDT'
                name='soDT'
                value={form.values.soDT}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.soDT && form.touched.soDT ? (
                <div className='text-danger position-absolute'>
                  {form.errors.soDT}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='form-item col-6 mb-4'>
              <p>Họ Tên</p>
              <input
                type='text'
                id='hoTen'
                name='hoTen'
                value={form.values.hoTen}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.hoTen && form.touched.hoTen ? (
                <div className='text-danger position-absolute'>
                  {form.errors.hoTen}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='form-item col-6 mb-4'>
              <p>Loại người dùng</p>
              <select
                name='maLoaiNguoiDung'
                id='maLoaiNguoiDung'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.maLoaiNguoiDung}
              >
                <option value='GV'>Giáo vụ</option>
                <option value='HV'>Học viên</option>
              </select>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
