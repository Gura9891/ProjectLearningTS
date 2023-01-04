import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getCourseApi } from "../../redux/reducers/coursesReducer";
import {
  registerCourseApi,
  signUpCourseApi,
} from "../../redux/reducers/userReducer";

type Props = {};

type CourseParams = {
  maKhoaHoc: string;
};
const writing = require("../../assets/img/writing.jpg");

export default function Detail({}: Props) {
  const { maKhoaHoc } = useParams<CourseParams>();
  console.log(maKhoaHoc);

  const { selectedCourse } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const { userLogin } = useSelector((state: RootState) => state.userReducer);

  const dispatch: AppDispatch = useDispatch();

  console.log(selectedCourse);
  useEffect(() => {
    const getCourseApiAction = getCourseApi(maKhoaHoc);
    dispatch(getCourseApiAction);
  }, []);

  return (
    <div className="container px-0 py-3">
      <div
        className="d-flex align-items-center "
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${writing})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 400,
        }}
      >
        <div className="row d-block d-sm-flex flex-row-reverse align-items-center px-5">
          <div className="col-5 ps-5">
            <img src={selectedCourse.hinhAnh} alt="" className="w-75" />
          </div>
          <div className="col-12 col-sm-7 mt-4 ps-5 text-white mx-auto">
            <h1 className="text-uppercase text-white">
              {selectedCourse?.tenKhoaHoc}
            </h1>
            <div>
              <h4 className="text-white d-block d-sm-inline">
                Đánh giá khoá học
              </h4>
              <span className="ms-2">
                <i className="fas fa-star text-warning me-1"></i>
                <i className="fas fa-star text-warning me-1"></i>
                <i className="fas fa-star text-warning me-1"></i>
                <i className="fas fa-star text-warning me-1"></i>
                <i className="fas fa-star text-warning"></i>
              </span>
            </div>
            <NavLink to="">
              <button
                className="mt-4 btn btn-outline-dark text-white border-white "
                onClick={() => {
                  let action = signUpCourseApi(maKhoaHoc, userLogin.taiKhoan);
                  dispatch(action);
                }}
              >
                Đăng ký
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="mt-3 p-4" style={{ backgroundColor: "#dee2e6" }}>
        <h3>Giới thiệu khóa học</h3>
        <p className="mt-2">{selectedCourse.moTa}</p>
      </div>
    </div>
  );
}
