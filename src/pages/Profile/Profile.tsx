import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../assets/img/Color.png";
import * as Yup from "yup";
import { ACCESS_TOKEN, getStore, http } from "../../util/setting";
import { Input, Space } from "antd";
import { Rate } from "antd";
import {
  deleteCourse,
  deleteCre,
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducers/userReducer";
import { Navigate, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/configStore";
import { Button, Popover } from "antd";
import { Pagination } from "antd";
import { debounce } from "lodash";

export interface ProfileStudent {
  chiTietKhoaHocGhiDanh: ChiTietKhoaHocGhiDanh[];
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
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

type Props = {};

export default function Profile({}: Props) {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { chiTietKhoaHocGhiDanh } = useSelector(
    (state: RootState) => state.userReducer.userLogin
  );
  const navigate = useNavigate();

  const [update, setUpdate] = useState<ProfileStudent>({ ...userLogin });


  const pageSize = 2;

  interface stateType {
    data: ChiTietKhoaHocGhiDanh[];
    totalPage: number;
    current: number;
    minIndex: number;
    maxIndex: number;
  }
    const [state, setState] = useState<stateType>({
    data: chiTietKhoaHocGhiDanh,
    totalPage: chiTietKhoaHocGhiDanh?.length / pageSize,
    current: 1,
    minIndex: 0,
    maxIndex: pageSize,
  });

  let [sortArray, setSortArray] = useState<ChiTietKhoaHocGhiDanh[]>();

  const dispatch: AppDispatch = useDispatch();
  const [passwordType, setPassWordType] = useState("password");

  //-----------Search------------------------------
  const [inputText, setInputText] = useState("");

  let inputHandler = (e: any) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const debouceInputHandler = debounce(inputHandler, 500);

  useEffect(() => {
    if (inputText) {
      let sortArr = chiTietKhoaHocGhiDanh.filter((item) => {
        return item.tenKhoaHoc.toLowerCase().includes(inputText);
      });
      setSortArray(sortArr);
    } else {
      setState({...state,
        data:chiTietKhoaHocGhiDanh,
        totalPage:chiTietKhoaHocGhiDanh?.length /pageSize}) 
      setSortArray(chiTietKhoaHocGhiDanh);
    }
  }, [inputText, userLogin]);
  //-----------------------------------------------------

  //----------------Course ----------------------

  

  

  const handleChange = (page: number) => {
    setState({
      ...state,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  const { data, current, minIndex, maxIndex, totalPage } = state;

  //----------------------------------

  useEffect(() => {
     if (!getStore(ACCESS_TOKEN)) {
    //Nếu chưa đăng nhập => Chuyển hướng trang
    alert("Đăng nhập để vào trang này !");
    navigate("/dangnhap");
  }
    getProfileApi();
  }, []);

  

  const togglePassword = () => {
    if (passwordType === "password") {
      setPassWordType("text");
      return;
    }
    setPassWordType("password");
  };

  let regexName = new RegExp(
    "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$"
  );

  let regexPhone = new RegExp(
    "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
  );
  let regexPass = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
  );

  const frm = useFormik({
    initialValues: {
      taiKhoan: userLogin.taiKhoan,
      matKhau: update.matKhau,
      hoTen: update.hoTen,
      soDT: update.soDT,
      email: update.email,
      maLoaiNguoiDung: userLogin.maLoaiNguoiDung,
      maNhom: userLogin.maNhom,
    },
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      hoTen: Yup.string()
        .required("Tên không được để trống")
        .matches(regexName, "Tên không đúng định dạng"),
      soDT: Yup.string()
        .required("Số điện thoại không được bỏ trống")
        .matches(regexPhone, "Số điện thoại không đúng định dạng"),
      matKhau: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải từ 6-32 ký tự")
        .max(32, "Mật khẩu từ 6-32 ký tự")
        .matches(regexPass, "Mật khẩu không đúng định dạng"),
    }),
    onSubmit: (values) => {
      dispatch(updateProfileApi(values));
    },
  });

  useEffect(() => {
    setUpdate(userLogin);
  }, [userLogin]);

  const handleChangeInput = (e: any) => {
    let { id, value } = e.target;

    let newValue: any = { ...update };
    newValue[id] = value;
    setUpdate(newValue);
  };

  const content = (
    <div>
      <p>Tài khoản không thể chỉnh sửa</p>
    </div>
  );

  const { Search } = Input;
  const onSearch = (value: string) => {
    let lowerCase = value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="update">
      <div className="container order d-flex align-items-start flex-wrap justify-content-around ">
        <div
          className="nav flex-row nav-pills me-3 col-10"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active "
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="true"
          >
            Thông tin cá nhân
          </button>
          <button
            className="nav-link"
            id="v-pills-course-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-course"
            type="button"
            role="tab"
            aria-controls="v-pills-course"
            aria-selected="false"
          >
            Khoá học của tôi
          </button>
        </div>
        <div
          className="tab-content col-10 border border-dark border-2"
          id="v-pills-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <div className="contain d-flex h-100 w-100 ">
              <form
                className="form d-flex flex-wrap justify-content-between"
                onSubmit={frm.handleSubmit}
              >
                <div className="form-group col-md-10 mb-4 me-5">
                  <div className="input-group d-flex flex-column">
                    <h2>Email</h2>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control input-sm w-100"
                      onChange={frm.handleChange}
                      onInput={handleChangeInput}
                      value={update.email}
                    />
                    {frm.errors.email ? (
                      <span className="text-danger">{frm.errors.email} </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group col-md-10 mb-4 me-5">
                  <div className="input-group d-flex flex-column">
                    <h2>Tài khoản</h2>
                    <Popover content={content} trigger="hover" className="m-0">
                      <input
                        type="text"
                        name="taiKhoan"
                        id="taiKhoan"
                        className="form-control input-sm w-100"
                        aria-label="Disabled input example"
                        disabled
                        onChange={frm.handleChange}
                        onInput={handleChangeInput}
                        value={update.taiKhoan}
                      />
                      <Button></Button>
                    </Popover>
                  </div>
                </div>
                <div className="form-group col-md-10 mb-4 me-5">
                  <div className="input-group d-flex flex-column">
                    <h2>Họ tên</h2>
                    <input
                      data-type="hoTen"
                      type="text"
                      name="hoTen"
                      id="hoTen"
                      className="form-control input-sm w-100"
                      onChange={frm.handleChange}
                      value={update.hoTen}
                      onInput={handleChangeInput}
                    />

                    <span className="text-danger">{frm.errors.hoTen} </span>
                  </div>
                </div>

                <div className="form-group col-md-10 mb-4 me-5">
                  <div className="input-group d-flex flex-column">
                    <h2>Số điện thoại</h2>
                    <input
                      data-type="phone"
                      type="text"
                      name="soDT"
                      id="soDT"
                      className="form-control input-sm w-100"
                      value={update.soDT}
                      onChange={frm.handleChange}
                      onInput={handleChangeInput}
                    />
                    <span className="text-danger">{frm.errors.soDT} </span>
                  </div>
                </div>
                <div className="form-group col-md-10 mb-4 me-5">
                  <div className="input-group d-flex flex-column">
                    <h2>Mật khẩu</h2>
                    <input
                      data-type="password"
                      type={passwordType}
                      name="matKhau"
                      id="matKhau"
                      className="form-control input-sm w-100"
                      value={update.matKhau}
                      onChange={frm.handleChange}
                      onInput={handleChangeInput}
                    />

                    <span className="text-danger">{frm.errors.matKhau} </span>
                  </div>
                  <button type="button" onClick={togglePassword}>
                    {passwordType === "password" ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </button>
                </div>
                <div className="d-flex justify-content-between w-100 flex-row-reverse info">
                  <div className="submit">
                    <button type="submit" className="btn">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="v-pills-course"
            role="tabpanel"
            aria-labelledby="v-pills-course-tab"
          >
            <div className="mt-2">
              <div className="title d-lg-flex justify-content-between p-4">
                <h2>Các khoá học đã tham gia</h2>
                <div>
                  <Space direction="vertical">
                    <Search
                      placeholder="Nhập khoá học cần tìm"
                      onSearch={onSearch}
                      style={{ width: 400 }}
                      onChange={debouceInputHandler}
                    />
                  </Space>
                </div>
              </div>

              <hr />
              {sortArray?.map(
                (data, index): any =>
                  index >= minIndex &&
                  index < maxIndex && (
                    <div className="m-4" key={index}>
                      <div className="coursesRegistered d-md-flex border-top pt-2 bg-light p-2">
                        <div className="imageCourse col-md-3 col-lg-3 col-xl-2  me-md-4">
                          <img
                            src={data.hinhAnh}
                            alt={data.tenKhoaHoc}
                            className="w-100"
                            height={150}
                          />
                        </div>
                        <div className="detailCourse col-md-8 col-lg-6 col-xl-7 d-flex flex-column">
                          <h3 className="mt-2">{data.tenKhoaHoc}</h3>
                          <p>
                            {data.moTa.length > 100
                              ? data.moTa.substring(0, 200) + "..."
                              : data.moTa}
                          </p>
                        </div>
                        <div className="rate col-lg-3 col-xl-3 d-flex d-sm-none d-lg-flex flex-column align-items-center p-3 ">
                          <div>
                            <Rate value={data.danhGia} />
                          </div>
                          <span>({data.luotXem} học viên)</span>
                          <button
                            className="btn btn-warning mt-4 ms-4"
                            onClick={() => {
                              let deleteItem: deleteCre = {
                                maKhoaHoc: data.maKhoaHoc,
                                taiKhoan: userLogin.taiKhoan,
                              };
                              dispatch(deleteCourse(deleteItem));
                            }}
                          >
                            {" "}
                            Huỷ
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}

              <Pagination
                pageSize={pageSize}
                current={current}
                defaultCurrent={1}
                total={data?.length}
                onChange={handleChange}
                style={{ bottom: "0px", textAlign: "end", margin: "20px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
