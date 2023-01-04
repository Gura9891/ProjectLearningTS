import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { searchUserApi } from '../../../redux/reducers/userReducer'
import ModalUser from './ModalUser'
import TableUser from './TableUser'

type Props = {}

export default function UserAdmin ({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { userLogin, userToken } = useSelector(
    (state: RootState) => state.userReducer
  )

  useEffect(() => {
    if (userLogin !== null && Object.keys(userLogin).length !== 0 ) {
      if (userLogin?.maLoaiNguoiDung === 'HV') {
        navigate('/profile')
      } else if (userLogin?.maLoaiNguoiDung === 'GV') {
        navigate('/admin/user')
      }
    } else {
      navigate('/admin')
      message.error('Bạn phải đăng nhập tài khoản admin trước')
    }
  }, [])
  return (
    <div id='userAdmin'>
      <div className='d-flex flex-column'>
        <ModalUser />
        <div className='paper my-4 animate__animated animate__fadeIn animate__delay-1s'>
          <p className='fs-3'>Tìm kiếm tài khoản</p>
          <input
            className='mb-4 w-100'
            type='text'
            placeholder='Nhập vào tên tài khoản'
            onChange={e => {
              let key = e.target.value
              dispatch(searchUserApi(key))
            }}
          />
        </div>
        <TableUser />
      </div>
    </div>
  )
}
