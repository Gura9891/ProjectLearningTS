import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import image from '../../assets/img/brand.png'

type props = {
  Component: React.FC
}

export default function Admintemplate ({ Component }: props) {
  const location = useLocation()
  const [isActive, setActive] = useState(location.pathname)
  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname])
  return (
    <div className='adminTemplate d-flex' id='adminTemplate'>
      <div className='admin-navbar d-flex flex-column align-items-center'>
        <div className='admin-navbar-brand text-center'>
          <img src={image} alt='' className='' />
        </div>
        <div className='admin-navbar-items  h-100 w-100'>
          <ul>
            <li className='animate__animated animate__fadeIn'>
              <NavLink
                to={'/admin/index'}
                className={` ${
                  isActive === '/admin/index'
                    ? 'fs-4 fw-normal isactive'
                    : 'fs-4 fw-normal'
                }`}
              >
                <i className='bi bi-house'></i>Trang chủ
              </NavLink>
            </li>

            <li className='animate__animated animate__fadeIn animate__delay-1s'>
              <NavLink
                to={'/admin/user'}
                className={` ${
                  isActive === '/admin/user'
                    ? 'fs-4 fw-normal isactive'
                    : 'fs-4 fw-normal'
                }`}
              >
                <i className='bi bi-person'></i>Người dùng
              </NavLink>
            </li>

            <li className='animate__animated animate__fadeIn animate__delay-2s'>
              <NavLink
                to={'/admin/course'}
                className={` ${
                  isActive === '/admin/course'
                    ? 'fs-4 fw-normal isactive'
                    : 'fs-4 fw-normal'
                }`}
              >
                <i className='bi bi-book'></i>Khóa học
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      
      <div className='admin-navbar-mobile'>
        <div className='admin-navbar-brand text-center'>
          <img src={image} alt='' className='' />
        </div>
        <div className='admin-navbar-mobile-dropdown'>
          <button
            className='btn btn-primary'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasWithBothOptions'
            aria-controls='offcanvasWithBothOptions'
          >
            <i className="bi bi-list m-0"></i>
          </button>
          <div
            className='offcanvas offcanvas-top'
            data-bs-scroll='true'
            tabIndex={-1}
            id='offcanvasWithBothOptions'
            aria-labelledby='offcanvasWithBothOptionsLabel'
          >
            <div className='offcanvas-body d-flex align-items-center justify-content-center'>
            <ul className='w-75'>
            <li>
              <NavLink
                to={'/admin/index'}
                className={` ${
                  isActive === '/admin/index'
                    ? 'fs-4 fw-normal isactive'
                    : 'fs-4 fw-normal'
                }`}
              >
                <i className='bi bi-house'></i>Trang chủ
              </NavLink>
            </li>

            <li>
              <NavLink
                to={'/admin/user'}
                className={` ${
                  isActive === '/admin/user'
                    ? 'fs-4 fw-normal isactive'
                    : 'fs-4 fw-normal'
                }`}
              >
                <i className='bi bi-person'></i>Người dùng
              </NavLink>
            </li>

            <li>
              <NavLink
                to={'/admin/course'}
                className={` ${
                  isActive === '/admin/course'
                    ? 'fs-4 fw-normal isactive'
                    : 'fs-4 fw-normal'
                }`}
              >
                <i className='bi bi-book'></i>Khóa học
              </NavLink>
            </li>
          </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='admin-content'>
        <Component />
      </div>
    </div>
  )
}
