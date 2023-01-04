import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import HomeTeplate from './templates/HomeTemplate/HomeTemplate'
import { Provider } from 'react-redux'
import { store } from './redux/configStore'
import Register from './pages/Register/Register'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'antd/dist/antd.css'
import './assets/scss/styles.scss'
import Profile from './pages/Profile/Profile'
import Admin from './pages/Admin/AdminPage/Admin'
import LoginAdmin from './pages/Admin/LoginAdmin/LoginAdmin'
import Admintemplate from './templates/AdminTemplate/Admintemplate'
import HomeAdmin from './pages/Admin/HomeAdmin/HomeAdmin'
import UserAdmin from './pages/Admin/UserAdmin/UserAdmin'
import CourseAdmin from './pages/Admin/CourseAdmin/CourseAdmin'
import Home from './pages/Home/Home'
import Detail from './pages/Detail/Detail'
import Category from './pages/Category/Category'
import Search from './pages/Search/Search'
import 'antd/dist/antd.css'
import './assets/scss/styles.scss'
import LogIn from './pages/LogIn/LogIn'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='category' element={<Category />}>
            <Route path=':maDanhMuc' element={<Category />}></Route>
          </Route>
          <Route path='detail'>
            <Route path=':maKhoaHoc' element={<Detail />}></Route>
          </Route>
          <Route path='search' element={<Search />}>
            <Route path=':keyword' element={<Search />}></Route>
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route path='dangky' element={<Register />}></Route>
        <Route path='dangnhap' element={<LogIn />}></Route>
      </Routes>
      <Routes>
        <Route path='admin' element={<Admin />}>
          <Route index element={<LoginAdmin />} />
          <Route path='*' element={<Navigate to='/admin/index' />} />
          <Route
            path='index'
            element={<Admintemplate Component={HomeAdmin} />}
          />
          <Route
            path='user'
            element={<Admintemplate Component={UserAdmin} />}
          />
          <Route
            path='course'
            element={<Admintemplate Component={CourseAdmin} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
