import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import './slider.scss';

const Slider = () => {

    return (
        <div className="mt-4">
            <Swiper
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }} 
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper">
                  <SwiperSlide>
                    <img className="w-100" src="images/slider/1.jpg" alt="slider-item" />
                  </SwiperSlide>
                  <SwiperSlide>
                  <img className="w-100" src="images/slider/2.jpg" alt="slider-item" />
                  </SwiperSlide>
                  <SwiperSlide>
                  <img className="w-100" src="images/slider/3.jpg" alt="slider-item" />
                  </SwiperSlide>
                  <SwiperSlide>
                  <img className="w-100" src="images/slider/4.jpg" alt="slider-item" />
                  </SwiperSlide>
                  <SwiperSlide>
                  <img className="w-100" src="images/slider/5.png" alt="slider-item" />
                  </SwiperSlide>
                  <SwiperSlide>
                  <img className="w-100" src="images/slider/6.jpg" alt="slider-item" />
                  </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider;