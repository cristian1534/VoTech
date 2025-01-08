"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { FaSlack, FaGithub, FaTrello } from "react-icons/fa";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiRedux,
  SiNodedotjs,
  SiDjango,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";

export const IconSlider = () => {
  return (
    <div className="bg-gray-50 flex justify-center items-center p-4 rounded-sm h-[200px] text-gray-400 font-sans my-5">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={6}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
      
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <FaSlack style={{ fontSize: "4rem", color: "#4A154B" }} />
          <span>Slack</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <FaGithub style={{ fontSize: "4rem", color: "#000" }} />
          <span>GitHub</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <FaTrello style={{ fontSize: "4rem", color: "#0079BF" }} />
          <span>Trello</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiJavascript style={{ fontSize: "4rem", color: "#F7DF1E" }} />
          <span>JavaScript</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiPython style={{ fontSize: "4rem", color: "#3776AB" }} />
          <span>Python</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiReact style={{ fontSize: "4rem", color: "#61DAFB" }} />
          <span>React</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiRedux style={{ fontSize: "4rem", color: "#764ABC" }} />
          <span>Redux</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiNodedotjs style={{ fontSize: "4rem", color: "#68A063" }} />
          <span>NodeJS</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiDjango style={{ fontSize: "4rem", color: "#092D37" }} />
          <span>Django</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiExpress style={{ fontSize: "4rem", color: "#000" }} />
          <span>Express</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiMongodb style={{ fontSize: "4rem", color: "#4DB33D" }} />
          <span>Mongo</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiPostgresql style={{ fontSize: "4rem", color: "#336791" }} />
          <span>Postgres</span>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-full h-full flex-col">
          <SiMysql style={{ fontSize: "4rem", color: "#4479A1" }} />
          <span>MySQL</span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
