import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  DanhMuc,
  getCourseByCategoryApi,
  KhoaHoc,
} from "../../redux/reducers/coursesReducer";

type Props = {};

export default function Category({}: Props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const maDanhMucKhoahoc: string | null = searchParams.get("maDanhMuc");
  console.log(maDanhMucKhoahoc);

  const { arrCourseByCategory, arrCurriculum } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const dispatch: AppDispatch = useDispatch();

  const selectedCurriculum: DanhMuc = arrCurriculum.find(
    (item: DanhMuc) => item.maDanhMuc === maDanhMucKhoahoc
  );

  useEffect(() => {
    const getCourseByCategoryApiAction =
      getCourseByCategoryApi(maDanhMucKhoahoc);
    dispatch(getCourseByCategoryApiAction);
  }, []);
  return (
    <div className="container py-3">
      <h1 className="text-uppercase">{selectedCurriculum?.tenDanhMuc}</h1>
      <h3 className="mt-4">Các khoá học phổ biến</h3>
      <div className="row py-3 px-5">
        {arrCourseByCategory?.map((item: KhoaHoc, index: number) => {
          return (
            <div
              className="col-12 col-sm-6 col-lg-4 mt-5"
              key={index}
              style={{ height: 400 }}
            >
              <div className="card h-100">
                <img src={item.hinhAnh} alt="" className="h-50" />
                <div className="card-body pt-4 pb-0">
                  <h5 className="card-title" style={{ height: 60 }}>
                    {item.tenKhoaHoc}
                  </h5>
                  <div className="card-text mt-3">
                    <span className="me-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half"></i>
                      4.5
                    </span>
                    ({item.luotXem})
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <NavLink
                      to={`/detail/${item.maKhoaHoc}`}
                      className="btn btn-warning text-uppercase btn-hover"
                    >
                      Đăng ký
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
