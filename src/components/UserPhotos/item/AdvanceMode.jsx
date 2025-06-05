import { Grid } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ItemPhoto from "./ItemPhoto";

const AdvanceMode = (props) => {
  const {
    photos,
    userInfo,
    onComment,
    setOnComment,
    onDelete,
    setOnDelete
  } = props;
  const moreThanOne = photos?.length > 1;

  const listModule = moreThanOne
    ? [Navigation, Pagination, Mousewheel, Keyboard]
    : [];

  return (
    <Grid container xs={12} display={"flex"} justifyContent="center">
      <Swiper
        initialSlide={0}
        cssMode={moreThanOne}
        navigation={moreThanOne}
        pagination={moreThanOne}
        mousewheel={moreThanOne}
        keyboard={moreThanOne}
        modules={listModule}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {photos?.map((photo) => {
          return (
            <SwiperSlide>
              <ItemPhoto
                userInfo={userInfo}
                photo={photo}
                onComment={onComment}
                setOnComment={setOnComment}
                onDelete={onDelete}
                setOnDelete={setOnDelete}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Grid>
  );
};
export default AdvanceMode;
