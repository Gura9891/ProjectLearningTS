import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { AxiosError } from "axios";
import { DataType } from "../../pages/Admin/UserAdmin/TableUser";

import {
  ACCESS_TOKEN,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN
} from '../../util/setting'
import { AppDispatch } from '../configStore'
import { getListUserNotReigsterCourseApi, getListUserRegisteredCourseApi, getListUserWaitRegisterCourseApi } from "./listCoursesReducer";

export interface Student {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  passConfirm: string;
}
export interface userLogin {
  taiKhoan: string;
  matKhau: string;
}

export interface Profile {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface userAdmin {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface deleteUser {
  taiKhoan: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  email: string;
}

export interface updateProfile {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  email: string;
  maLoaiNguoiDung: string;
  maNhom: string;
}

export interface userType {
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface ChiTietKhoaHocGhiDanh {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  ngayTao: Date;
  danhGia: number;
}
export interface courseOfStudent {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
}

export interface deleteCs {
  maKhoaHoc: string;
  taiKhoan: string;
}
export interface stateRedux {
  userLogin: Profile;
  arrUser: Profile[] | DataType[];
  userType: userType[];
  arrUserSearch: Profile[] | DataType[];
  listCourseOfStudent: courseOfStudent[];
  listCourseWaitRegister: courseOfStudent[];
  listCourseReigsterd: courseOfStudent[];
  userToken: string;
}

export interface deleteCre {
  maKhoaHoc: string;
  taiKhoan: string;
}
const initialState: stateRedux = {
  userLogin: getStoreJson(USER_LOGIN) || {},
  userToken: "",
  arrUser: [],
  userType: [],
  arrUserSearch: [],
  listCourseOfStudent: [],
  listCourseWaitRegister: [],
  listCourseReigsterd: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
    userCheck: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    arrUserAction: (state, action: PayloadAction<Profile[]>) => {
      state.arrUser = action.payload;
    },
    userTypeAction: (state, action: PayloadAction<userType[]>) => {
      state.userType = action.payload;
    },
    logoutAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
    getListCourseNotRegisterAction: (
      state,
      action: PayloadAction<courseOfStudent[]>
    ) => {
      state.listCourseOfStudent = action.payload;
    },
    getListCourseWaitRegisterAction: (
      state,
      action: PayloadAction<courseOfStudent[]>
    ) => {
      state.listCourseWaitRegister = action.payload;
    },
    getListCourseRegisteredAction: (
      state,
      action: PayloadAction<courseOfStudent[]>
    ) => {
      state.listCourseReigsterd = action.payload;
    },
  },
});

export const {
  getProfileAction,
  userCheck,
  arrUserAction,
  userTypeAction,
  logoutAction,
  getListCourseNotRegisterAction,
  getListCourseWaitRegisterAction,
  getListCourseRegisteredAction,
} = userReducer.actions;

export default userReducer.reducer;

//----------------API signUp-------------------

export const postSignUpApi = (student: Student) => {
  return async () => {
    try {
      await http.post("/QuanLyNguoiDung/DangKy", student);
      const key = "updatable";
      const openMessage = () => {
        message.loading({ content: "Vui lòng chờ", key });
        setTimeout(() => {
          message.success({ content: "Đăng ký thành công!", key, duration: 2 });
        }, 1000);
      };
      openMessage();
    } catch (error) {
      // alert(error.response.data)
    }
  };
};

// -----------------Login API --------------------

export const LogInApi = (userLogin: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/DangNhap", userLogin);
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.accessToken);
      dispatch(userCheck(result.data.accessToken));

      dispatch(getProfileApi());
    } catch (error) {
      // alert(error.response.data)
    }
  };
};

//------------Profile API-------------------------

export const getProfileApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThongTinNguoiDung");
      console.log(result);
      const action = getProfileAction(result.data);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data);
    } catch (error) {
      console.log(error);
    }
  };
};

//----------------UpdateAPI-----------------------

export const updateProfileApi = (userUpdate: updateProfile) => {
  return async () => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        userUpdate
      );
      const key = "updatable";
      const openMessage = () => {
        message.loading({ content: "Vui lòng chờ", key });
        setTimeout(() => {
          message.success({
            content: "Cập nhật thành công!",
            key,
            duration: 2,
          });
        }, 1000);
      };
      openMessage();
    } catch (error) {
      // alert(error.response.data)
    }
  };
};
//---------------------Get list user--------------------
export const getListUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
      dispatch(arrUserAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};
//-------------------Get user type--------------------
export const getUserTypeApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
      );
      dispatch(userTypeAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//------------------Add User-----------------
export const addUserApi = (data: userAdmin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThemNguoiDung", data);
      message.success("Thêm người dùng thành công");
    } catch (err: any) {
      message.error(err.response.data);
      console.log(err);
    }
  };
};
//-----------------delete user--------------
export const deleteUserApi = (user: string) => {
  console.log(user);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`
      );
      message.success(result.data);
      dispatch(getListUserApi());
    } catch (err: any) {
      console.log(err);
      message.error(err.response.data);
    }
  };
};
//----------------update user--------------
export const updateUserApi = (user: userAdmin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        user
      );
      message.success("Cập nhật thành công");
      dispatch(getListUserApi());
    } catch (err) {
      console.log(err);
    }
  };
};
// ----------------------Search api---------------
export const searchUserApi = (key: string) => {
  console.log(key);
  return async (dispatch: AppDispatch) => {
    try {
      if (key !== "") {
        const result = await http.get(
          "/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=" + key
        );
        dispatch(arrUserAction(result.data));
      } else {
        dispatch(getListUserApi());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//--------------------lấy danh sách khóa học chưa ghi danh-----------
export const getListCourseNotRegisterApi = (tenTaiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=" + tenTaiKhoan
      );
      dispatch(getListCourseNotRegisterAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
// ------------lấy danh sách khoá học chờ xét duyệt------------------
export const getListCourseWaitRegisterApi = (taiKhoan: string) => {
  console.log(taiKhoan)
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        taiKhoan: taiKhoan,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        data
      );
      console.log(result);
      dispatch(getListCourseWaitRegisterAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//----------lấy danh sác kháo học đã xét duyệt--------------------
export const getListCourseRegisteredApi = (taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        taiKhoan: taiKhoan,
      };
      let result = await http.post(
        "QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        data
      );
      console.log(result);
      dispatch(getListCourseRegisteredAction(result.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//----------ghi danh khoá học----------------------
export const registerCourseApi = (maKhoaHoc: string, taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan
      }
      let result = await http.post("QuanLyKhoaHoc/GhiDanhKhoaHoc",data)
      console.log(result)
      message.success(result.data)
      dispatch(getListCourseNotRegisterApi(taiKhoan))
      dispatch(getListCourseRegisteredApi(taiKhoan))
      dispatch(getListCourseWaitRegisterApi(taiKhoan))
      dispatch(getListUserNotReigsterCourseApi(maKhoaHoc))
      dispatch(getListUserWaitRegisterCourseApi(maKhoaHoc))
      dispatch(getListUserRegisteredCourseApi(maKhoaHoc))
    } catch (err:any) {
      message.error(err.response.data)
      console.log(err);
    }
  };
};
//-----------huỷ ghi danh khoá học----------------
export const UnRegisterCourseApi = (maKhoaHoc: string, taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan
      }
      let result = await http.post("QuanLyKhoaHoc/HuyGhiDanh",data)
      console.log(result)
      message.success(result.data)
      dispatch(getListCourseNotRegisterApi(taiKhoan))
      dispatch(getListCourseRegisteredApi(taiKhoan))
      dispatch(getListCourseWaitRegisterApi(taiKhoan))
      dispatch(getListUserNotReigsterCourseApi(maKhoaHoc))
      dispatch(getListUserWaitRegisterCourseApi(maKhoaHoc))
      dispatch(getListUserRegisteredCourseApi(maKhoaHoc))
    } catch (err:any) {
      message.error(err.response.data)
      console.log(err)
    }
  };
};

//----------------Delete Course------------------

export const deleteCourse = (info: deleteCs) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyKhoaHoc/HuyGhiDanh", info);
      alert(result.data);
      dispatch(getProfileApi());
    } catch (error: any) {
      alert(error.response.data);
    }
  };
};

//----------dang ky khoá học----------------------
export const signUpCourseApi = (
  maKhoaHoc: string | undefined,
  taiKhoan: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let data = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: taiKhoan,
      };
      let result = await http.post("QuanLyKhoaHoc/DangKyKhoaHoc", data);
      console.log(result);
      message.success(result.data);
    } catch (err) {
      console.log(err);
    }
  };
};
