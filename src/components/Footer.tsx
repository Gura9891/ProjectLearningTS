import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="container p-4 bg-dark text-white">
      <div className="row">
        <div className="col-12 col-lg-4 d-flex flex-column justify-content-between mt-3">
          <div>
            <img src="./img/logo.png" alt="" className="w-50" />
            <p>
              Cybersoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự
              án thực tế.
            </p>
          </div>
          <div>
            <h4 className="text-white">Nhận tin sự kiện & khuyến mãi</h4>
            <p>
              Cybersoft sẽ gửi các khoá học trực tuyến và các chương tình
              CyberLive hoàn toàn miễn phí và các chương trình khuyến mãi hấp
              dẫn đến các bạn
            </p>
            <form className="d-block d-lg-flex justify-content-between">
              <div className="col-12 col-lg-8 me-2 mt-2">
                <input
                  className="form-control "
                  placeholder="your.address@email.com"
                />
              </div>
              <div className="col-12 col-lg-4 mt-2">
                <button className="px-2 btn btn-warning btn-hover">
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex flex-column justify-content-between mt-3">
          <h4 className="text-white"> Đăng ký tư vấn</h4>
          <form>
            <input className="mt-2 form-control" placeholder="Họ và tên *" />
            <input
              className="mt-2 form-control"
              placeholder="Email liên hệ *"
            />
            <input
              className="mt-2 form-control"
              placeholder="Điện thoại liên hệ *"
            />
            <p className="mt-1 mb-1">Nhấn vào ô bên dưới</p>
            <div className="px-2 d-flex justify-content-around align-items-center bg-white">
              <div className="form-check w-75">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="captcha"
                />
                <label
                  className="form-check-label text-dark"
                  htmlFor="flexCheckDefault"
                >
                  I'm not a robot
                </label>
              </div>
              <div className="w-25">
                <img
                  src="./img/recaptchaLogo.png"
                  alt="recaptcha"
                  className="w-100"
                />
              </div>
            </div>
            <button className="mt-2 btn btn-warning btn-hover">
              Đăng ký tư vấn
            </button>
          </form>
        </div>
        <div className="col-12 col-lg-4 mt-3">
          <iframe
            title="facebook"
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet&show_posts=true&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width={340}
            height={331}
            style={{ border: '"none",overflow:"hidden"}}', width: "100%" }}
            scrolling="no"
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
      <div className="row mt-4 pb-2 border-bottom">
        <div className="col-12 col-lg-4">
          <ul className="px-0 mt-2">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span className="ms-2">Cơ sở 1: 376 Võ Văn Tần - Quận 3</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span className="ms-2">Cơ sở 2: 459 Vạn Hạnh - Quận 10</span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span className="ms-2">
                Cơ sở 3: Ung Văn Khiêm - Quận Bình Thạnh
              </span>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span className="ms-2">Cơ sở 4: Đà Nẵng - Quận Hải Châu</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span className="ms-2">098.105.1014 098.407.5035</span>
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-4">
          <p>
            Lập trình Front End | Lập trình React JS | Lập trình React Angular |
            Lập trình tư duy | Lập trình Node JS | Lập trình Back End | Lập
            trình Java Web | Lập trình Java Spring - Lập trình Java Boot| Tôi đi
            code dạo | Học lập trình trực tuyến
          </p>
        </div>
        <div className="mt-3 mt-lg-0 col-12 col-lg-4">
          <p>
            Anh ngữ giao tiếp Khởi động anh ngữ giao tiếp Lấy đà anh ngữ giao
            tiếp Bật nhảy anh ngữ giao tiếp
          </p>
        </div>
      </div>
    </div>
  );
}
