import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";

const ImageSlider = () => {
  const imageUrls = [
    "https://static.bb.ge/static/media/Bm2IHGmkw61HaxrEXP04iEN3Jv6ASACTThD8gDBz.jpeg",
    "https://www.foxerp.com/wp-content/uploads/2023/01/Fox-ERP-Thriving-Agrotech-in-the-new-normal-with-GPS-Technology-scaled.jpg",
    "https://unctad.org/sites/default/files/2020-12/2020-12-24_Agritech-and-gender_1200x675.jpg",
    "https://agrotekplus.com/static/img/defaultimages/sliders/agrotechmum.png",
  ];

  return (
    <CustomSwiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {imageUrls.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <img src={imageUrl} alt={`Image ${index + 1}`} />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default ImageSlider;

const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  /* height: 100vh; */
  /* position: sticky; */
  /* top: 0; */
  .swiper-pagination-bullet {
    border-radius: 1px;
    width: 100px;
    height: 7px;
    left: 508px;
    top: 929px;
    background: #f5efe9;
    border-radius: 1px;
    @media screen and (max-width: 768px) {
      width: 70px;
      height: 5px;
    }
  }
  .swiper-pagination-bullet-active {
    background: #00ab89;
  }

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    @media screen and (max-width: 768px) {
      width: 500px;
      height: 100vh;
      display: flex;
      justify-content: center;
      margin: 0 auto;
      border-radius: 5px;
    }
  }
`;
