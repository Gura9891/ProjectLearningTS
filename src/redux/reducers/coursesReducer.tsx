import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";

export interface KhoaHoc {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: string;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  danhMucKhoaHoc: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
  maDanhMucKhoahoc: string;
  tenDanhMucKhoaHoc: string;
}
export interface DanhMuc {
  maDanhMuc: string;
  tenDanhMuc: string;
}

const initialState: any = {
  arrCurriculum: [],
  arrCourses: [],
  arrCourseByCategory: [],
  selectedCourse: {
    maKhoaHoc: "",
    biDanh: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: "",
    hinhAnh: "",
    maNhom: "",
    soLuongHocVien: 0,
    danhMucKhoaHoc: { maDanhMucKhoahoc: "", tenDanhMucKhoaHoc: "" },
  },
};

const coursesReducer = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    getCurriculumAction: (state, action: PayloadAction<DanhMuc[]>) => {
      state.arrCurriculum = action.payload;
    },
    getListCourseAction: (state, action: PayloadAction<KhoaHoc[]>) => {
      state.arrCourses = action.payload;
    },
    getCourseByCategoryAction: (state, action: PayloadAction<KhoaHoc[]>) => {
      state.arrCourseByCategory = action.payload;
    },
    getCourseAction: (state, action: PayloadAction<KhoaHoc>) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  getCurriculumAction,
  getListCourseAction,
  getCourseByCategoryAction,
  getCourseAction,
} = coursesReducer.actions;

export default coursesReducer.reducer;

// ---------- action api ---------------

export const getCurriculumApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      let arrCurriculum: DanhMuc[] = result.data;
      const action = getCurriculumAction(arrCurriculum);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getListCourseApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
      let arrCourses: KhoaHoc[] = result.data;
      const action = getListCourseAction(arrCourses);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCourseByCategoryApi = (
  maDanhMucKhoahoc: string | null | undefined
) => {
  console.log(maDanhMucKhoahoc);
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMucKhoahoc}`
      );
      let arrCourseByCategory: KhoaHoc[] = result.data;
      const action = getCourseByCategoryAction(arrCourseByCategory);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCourseApi = (maKhoaHoc: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/QuanLyKhoaHoc//LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
      );
      console.log(result);
      let selectedCourse: KhoaHoc = result.data;
      const action = getCourseAction(selectedCourse);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
