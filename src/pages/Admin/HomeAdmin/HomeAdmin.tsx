import { message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../redux/configStore'
import {
  getCourseDirectoryApi,
  getListCoursesApi
} from '../../../redux/reducers/listCoursesReducer'
import {
  getListUserApi,
  logoutAction
} from '../../../redux/reducers/userReducer'
import {
  ACCESS_TOKEN,
  deleteCookie,
  deleteStore,
  getStoreJson,
  USER_LOGIN
} from '../../../util/setting'
import ModalUser from '../UserAdmin/ModalUser'
import ChartCourse from './ChartCourse'
import ChartUser from './ChartUser'
import CountUp from 'react-countup'
import Todo from './Todo'

export default function HomeAdmin () {
  const { userLogin, arrUser, userToken } = useSelector(
    (state: RootState) => state.userReducer
  )
  const { arrayListCourses } = useSelector(
    (state: RootState) => state.listCoursesReducer
  )
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getListUserApi())
    dispatch(getListCoursesApi())
    dispatch(getCourseDirectoryApi())
  }, [])
  useEffect(() => {
    if (userLogin !== null && Object.keys(userLogin).length !== 0 ) {
      if (userLogin?.maLoaiNguoiDung === 'HV') {
        navigate('/profile')
      } else if (userLogin?.maLoaiNguoiDung === 'GV') {
        navigate('/admin/index')
      }
    } else {
      navigate('/admin')
      message.error('Bạn phải đăng nhập tài khoản admin trước')
    }
  }, [])
  return (
    <div id='homeAdmin' className='d-flex flex-wrap justify-content-between'>
      <div className='admin-profile text-center admin-item paper animate__animated animate__fadeIn'>
        <img src='/img/avatar.png' alt='' className='w-50 m-3' />
        <p className='fs-4 m-3'>Xin chào {userLogin.hoTen}</p>
        <div className='admin-profile-button'>
          <ModalUser user={userLogin} />
          <button
            className='red-button p-2 mx-2 h-100'
            onClick={() => {
              deleteCookie(ACCESS_TOKEN)
              deleteStore(ACCESS_TOKEN)
              deleteStore(USER_LOGIN)
              dispatch(logoutAction(getStoreJson(USER_LOGIN)))
              navigate('/admin')
              message.success('Đăng xuất thành công')
            }}
          >
            <i className="bi bi-box-arrow-left m-0 p-2"></i>
          </button>
        </div>
      </div>
      <div className='admin-course d-flex align-items-center justify-content-around  m-0 admin-item animate__animated animate__fadeIn animate__delay-1s'>
        <div className='number-data'>
          <h4 className='text-white'>Khóa học: </h4>
          <CountUp end={arrayListCourses.length} className="fs-1"/>
        </div>
        <ChartCourse />
      </div>
      
      <div className='admin-member m-0 admin-item d-flex align-items-center justify-content-around animate__animated animate__fadeIn animate__delay-2s'>
        <div className='number-data'>
          <h4 className='text-white'>Thành viên:</h4>
          <CountUp end={arrUser.length} className="fs-1" />
        </div>
        <ChartUser />
      </div>
      <div className='admin-todo m-0 admin-item paper animate__animated animate__fadeIn animate__delay-3s'>
        <Todo />
      </div>
    </div>
  )
}
