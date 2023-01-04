import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getListCourseApi, KhoaHoc } from "../../redux/reducers/coursesReducer";

type Props = {};

export default function Home({}: Props) {
  const { arrCourses } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getListCourseApiAction = getListCourseApi();
    dispatch(getListCourseApiAction);
  }, []);

  const ref = useRef<null | HTMLDivElement>(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickConsult = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const circularText = (text: string, radius: number) => {
    let txt: Array<string> = text.split("");
    let result: { radius: number; origin: number; char: string }[] = [];

    var deg = 180 / txt.length,
      origin: number = 0;

    txt.forEach((ea: string) => {
      result.push({ radius: radius, origin: origin, char: ea });
      origin += deg;
    });
    return result;
  };

  const text: { radius: number; origin: number; char: string }[] = circularText(
    "Chọn lộ trình cho bạn",
    100
  );

  const showingCourses: [] = arrCourses.slice(0, 8);
  return (
    <div className="py-5 container">
      {/* Carousel wrapper */}
      <div
        id="carouselVideoExample"
        className="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        {/* Inner */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="video_carousel">
              <video className="img-fluid" autoPlay loop muted>
                <source
                  src="https://mdbcdn.b-cdn.net/img/video/Tropical.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="gray_overlay"></div>
            </div>
            <div className="carousel-caption row d-block d-md-flex">
              <div className="caption-right col-12 col-md-8 ms-0 ms-md-4">
                <h2 className="text-start text-uppercase fs-1 fw-bold text-warning mb-1 mb-sm-4">
                  Khởi đầu sự nghiệp của bạn
                </h2>
                <h5 className="text-start mb-1 mb-sm-4 text-white">
                  Trở thành lập trình viên chuyên nghiệp tại Cybersoft
                </h5>
                <div className="d-flex">
                  <button
                    className="btn btn-warning me-4 px-0 px-sm-4 btn-hover"
                    onClick={handleClick}
                  >
                    Xem khoá học
                  </button>
                  <button
                    className="btn btn-light px-0 px-sm-4 btn-hover"
                    onClick={handleClickConsult}
                  >
                    Tư vấn học
                  </button>
                </div>
              </div>
              <div className="caption-left col-3 d-none d-sm-flex">
                <div className="animation">
                  <div className="circle-gif">
                    <img
                      src="https://media.giphy.com/media/Uqry4nIsyaBBmYzXdB/giphy.gif"
                      alt="circle"
                    />
                  </div>
                  <div className="circle">
                    <div className="circle-button">
                      <Button
                        className="link bg-transparent border-0"
                        onClick={handleClick}
                      >
                        <div className="play"></div>
                      </Button>
                    </div>
                    <div className="curve_text">
                      {text.map((item, index) => {
                        return (
                          <p
                            key={index}
                            className="py-5"
                            style={{
                              height: `${item.radius}`,
                              position: "absolute",
                              transform: `rotate(${item.origin}deg)`,
                              transformOrigin: "0 100%",
                            }}
                          >
                            {item.char}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel wrapper */}

      {/* content */}
      <div ref={ref} className="mt-5 px-5 content">
        <h3>Các khoá học mới nhất</h3>
        <div className="row">
          {showingCourses?.map((item: KhoaHoc, index: number) => {
            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mt-5"
                key={index}
                style={{ height: 400 }}
              >
                <div className="card h-100">
                  <img src={item.hinhAnh} alt="" className="h-50" />
                  <div className="card-body pt-2 pb-0">
                    <h5 className="card-title h-25">{item.tenKhoaHoc}</h5>
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
                        to={`/category?maDanhMuc=${item.danhMucKhoaHoc.maDanhMucKhoahoc}`}
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
    </div>
  );
}
