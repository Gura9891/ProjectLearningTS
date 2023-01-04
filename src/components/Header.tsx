import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Profile, userCheck } from "../redux/reducers/userReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/configStore";
import { DanhMuc, getCurriculumApi } from "../redux/reducers/coursesReducer";
import { Button } from "react-bootstrap";
import { ACCESS_TOKEN, USER_LOGIN } from "../util/setting";
import { getProfileAction } from "../redux/reducers/userReducer";

type Props = {};

export default function Header({}: Props) {
  const { arrCurriculum } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  let { userLogin } = useSelector((state: RootState) => state.userReducer);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const getCurriculumApiAction = getCurriculumApi();
    dispatch(getCurriculumApiAction);
  }, []);

  // SEARCH
  let keywordRef = useRef("");
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    keywordRef.current = e.target.value;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (keywordRef.current !== "") {
      navigate({
        pathname: "/search",
        search: `?keyword=${keywordRef.current.replace(" ", "+")}`,
      });
    }
  };

  //render userLogin
  const renderLoginNavItem = () => {
    if (Object.keys(userLogin).length === 0 || userLogin.taiKhoan === "") {
      return (
        <li className="nav-item">
          <NavLink className="nav-link text-center" to="/dangnhap">
            <button className="btn btn-outline-dark text-sm">Đăng nhập</button>
          </NavLink>
        </li>
      );
    }
    return (
      <li className="d-flex align-items-center">
        <div className="nav-item">
          <NavLink className="nav-link text-center" to="/profile">
            <button className="btn btn-outline-dark text-sm">
              Tài khoản
              <span className="text-uppercase"> {userLogin.taiKhoan}</span>
            </button>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink className="nav-link" to="">
            <button
              className="btn btn-outline-dark text-sm"
              onClick={() => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(USER_LOGIN);
                let user: Profile = {
                  chiTietKhoaHocGhiDanh: [],
                  taiKhoan: "",
                  matKhau: "",
                  hoTen: "",
                  soDT: "",
                  maLoaiNguoiDung: "",
                  maNhom: "",
                  email: "",
                };
                dispatch(getProfileAction(user));
                dispatch(userCheck(''))
              }}
            >
              Đăng xuất
            </button>
          </NavLink>
        </div>
      </li>
    );
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-sm navbar-light">
        <NavLink className="navbar-brand" to="/">
          <img src="./img/logo.png" alt="" style={{ width: 100 }} />
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav w-100 d-flex justify-content-between align-items-start align-items-sm-center mt-2 mt-lg-0">
            <li className="nav-item me-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="white"
                  className="btn btn-outline-dark"
                >
                  <i className="fas fa-bars"></i>
                  <span className="ms-2 d-none d-lg-inline">
                    Danh mục khoá học
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {arrCurriculum?.map((item: DanhMuc, index: number) => {
                    return (
                      <div key={index}>
                        <Dropdown.Item
                          className="py-2 btn-click"
                          href={`/category?maDanhMuc=${item.maDanhMuc}`}
                        >
                          {item.tenDanhMuc}
                        </Dropdown.Item>
                      </div>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item w-50 mt-2 mt-sm-0">
              <form className="d-flex" onSubmit={handleSubmit}>
                <input
                  id="keywordRef"
                  className="form-control me-1"
                  type="text"
                  placeholder="Tìm khoá học"
                  onChange={handleChange} 
                />
                <Button
                  className="d-none d-md-inline btn-light rounded-circle"
                  type="submit"
                >
                  <i className="fas fa-search"></i>
                </Button>
              </form>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link text-center" to="/dangky">
                <button className="btn btn-outline-dark text-sm">
                  Đăng ký
                </button>
              </NavLink>
            </li>
            {renderLoginNavItem()}
          </ul>
        </div>
      </nav>
    </div>
  );
}
