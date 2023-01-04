import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd'
import axios from 'axios'
import { http } from '../../util/setting'
import { AppDispatch } from '../configStore'
import { userAdmin } from './userReducer'

export interface listCourses {
  maKhoaHoc: string
  biDanh: string
  tenKhoaHoc: string
  moTa: string
  luotXem: number
  hinhAnh: string
  maNhom: string
  ngayTao: string
  soLuongHocVien: number
  nguoiTao: NguoiTao
  danhMucKhoaHoc: DanhMucKhoaHoc
}

export interface DanhMucKhoaHoc {
  maDanhMucKhoahoc: string
  tenDanhMucKhoaHoc: string
}

export interface DanhMuc {
  maDanhMuc: string
  tenDanhMuc: string
}

export interface NguoiTao {
  taiKhoan: string
  hoTen: string
  maLoaiNguoiDung: string
  tenLoaiNguoiDung: string
}

export interface CourseAdmin {
  maKhoaHoc: string
  biDanh: string
  tenKhoaHoc: string
  moTa: string
  luotXem: number
  danhGia: number
  hinhAnh: string
  maNhom: string
  ngayTao: string
  maDanhMucKhoaHoc: string
  taiKhoanNguoiTao: string
}

export interface fileData {
  tenKhoaHoc: string
  file: any
}
export interface UserRegisterCourse {
  taiKhoan: string
  hoTen: string
  biDanh: string
}

const initialState: any = {
  arrayListCourses: [],
  arrCourseDirectory: [],
  arrUserNotRegisterCourse: [],
  arrUserWaitRegisterCourse: [],
  arrUserRegisteredCourse: []
}

const listCourses = createSlice({
  name: 'listCoursesReducer',
  initialState,
  reducers: {
    getAllCoursesAction: (state, action: PayloadAction<listCourses[]>) => {
      state.arrayListCourses = action.payload
    },
    getAllCoursesDirectory: (
      state,
      action: PayloadAction<DanhMucKhoaHoc[]>
    ) => {
      state.arrCourseDirectory = action.payload
    },
    getArrUserNotRegisterCourseAction: (state, action: PayloadAction<UserRegisterCourse[]>) => {
      state.arrUserNotRegisterCourse = action.payload
    },
    getArrUserWaitRegisterCourseAction: (state, action: PayloadAction<UserRegisterCourse[]>) => {
      state.arrUserWaitRegisterCourse = action.payload
    },
    getArrUserRegisteredCourseAction: (state, action: PayloadAction<UserRegisterCourse[]>) => {
      state.arrUserRegisteredCourse = action.payload
    },

  }
})

export const {
  getAllCoursesAction,
  getAllCoursesDirectory,
  getArrUserNotRegisterCourseAction,
  getArrUserWaitRegisterCourseAction,
  getArrUserRegisteredCourseAction
} = listCourses.actions

export default listCourses.reducer

//-------------------------action API------------------------

export const getListCoursesApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/QuanLyKhoaHoc/LayDanhSachKhoaHoc')
      let arrCourses: listCourses[] = result.data
      const action = getAllCoursesAction(arrCourses)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}
export const getCourseDirectoryApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get('/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
      let arrCoursesDirectory: DanhMucKhoaHoc[] = result.data
      const action = getAllCoursesDirectory(arrCoursesDirectory)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

//------------Add course api------------------
export const addCourseAdminApi = (course: CourseAdmin, file: FormData) => {
  return async (dispatch: AppDispatch) => {
    await http.post('/QuanLyKhoaHoc/ThemKhoaHoc', course)
    try {
      await http.post('QuanLyKhoaHoc/UploadHinhAnhKhoaHoc', file)
      dispatch(getListCoursesApi())
      message.success('Thêm khoá học thành công')
    } catch (err:any) {
      console.log(err)
      message.error(err.response.data)
    }
  }
}

//---------------update course api-------------
export const updateCourseAdminApi = (course: CourseAdmin, file: FormData) => {
  return async (dispatch: AppDispatch) => {
    await http.put('QuanLyKhoaHoc/CapNhatKhoaHoc', course)
    try {
      await http.post('QuanLyKhoaHoc/UploadHinhAnhKhoaHoc', file)
      dispatch(getListCoursesApi())
    } catch (err) {
      console.log(err)
    }
  }
}

//----------------delete course-----------------
export const deleteCouseAdminApi = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.delete('QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=' + id)
      message.success(result.data)
      dispatch(getListCoursesApi())
    } catch (err:any) {
      message.error(err.response.data)
    }
  }
}

//---------------search course admin---------------
export const searchCourseAdminApi = (key: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (key) {
        let result = await http.get(
          'QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=' + key
        )
        console.log(result)
        dispatch(getAllCoursesAction(result.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

//--------------lấy danh sách học viên chưa đăng ký khóa học-------
export const getListUserNotReigsterCourseApi = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc
      }
      let result = await http.post("QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", data)
      dispatch(getArrUserNotRegisterCourseAction(result.data))
    }
    catch(err) {
      console.log(err)
    }
  }
}
//-------------lấy danh sách học sinh chờ xét duyệt khóa học-------
export const getListUserWaitRegisterCourseApi = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc
      }
      let result = await http.post("QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", data)
      dispatch(getArrUserWaitRegisterCourseAction(result.data))
    }
    catch(err) {
      console.log(err)
    }
  }
}
//-------------lấy danh sách học viên đã đăng ký khóa học----------
export const getListUserRegisteredCourseApi = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc
      }
      let result = await http.post("QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", data)
      dispatch(getArrUserRegisteredCourseAction(result.data))
    }
    catch(err) {
      console.log(err)
    }
  }
}