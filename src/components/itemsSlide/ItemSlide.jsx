import React from 'react';
import Card from "../card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation} from "swiper";
import './itemSlider.scss';


const ItemSlide = ({medicens}) => {

  console.log('from item slider');
  
    return (
        <>
        <h5 className="mt-5 me-4 mb-3" >{medicens[0].kind}</h5>
        <div className="item-slide mt-2">
              <Swiper
            breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
              }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper siper02">
                {medicens.map((item) =><SwiperSlide key={item.id}><Card data= {item} /></SwiperSlide>)}
            </Swiper>
        </div>
        </>
    )
}

export default ItemSlide