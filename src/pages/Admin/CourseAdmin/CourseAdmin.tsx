import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../redux/configStore'
import { searchCourseAdminApi } from '../../../redux/reducers/listCoursesReducer'
import ModalCourse from './ModalCourse'
import TableCourse from './TableCourse'

export default function CourseAdmin () {
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
        navigate('/admin/course')
      }
    } else {
      navigate('/admin')
      message.error('Bạn phải đăng nhập tài khoản admin trước')
    }
  }, [])
  return (
    <div id='courseAdmin'>
      <div className='d-flex flex-column'>
        <ModalCourse />
        <div className='paper my-4 animate__animated animate__fadeIn animate__delay-1s'>
          <p className='fs-3'>Tìm kiếm khóa học</p>
          <input
            className='mb-4 w-100'
            type='text'
            placeholder='Nhập vào tên khóa học'
            onChange={e => {
              dispatch(searchCourseAdminApi(e.target.value))
            }}
          />
        </div>
        <TableCourse />
      </div>
    </div>
  )
}
