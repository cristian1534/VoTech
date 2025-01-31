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
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="py-8 px-4"
      >
        {[
          { Icon: FaSlack, name: "Slack", color: "#4A154B" },
          { Icon: FaGithub, name: "GitHub", color: "#fff" },
          { Icon: FaTrello, name: "Trello", color: "#0079BF" },
          { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
          { Icon: SiPython, name: "Python", color: "#3776AB" },
          { Icon: SiReact, name: "React", color: "#61DAFB" },
          { Icon: SiRedux, name: "Redux", color: "#764ABC" },
          { Icon: SiNodedotjs, name: "NodeJS", color: "#68A063" },
          { Icon: SiDjango, name: "Django", color: "#092D37" },
          { Icon: SiExpress, name: "Express", color: "#fff" },
          { Icon: SiMongodb, name: "MongoDB", color: "#4DB33D" },
          { Icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
          { Icon: SiMysql, name: "MySQL", color: "#4479A1" },
        ].map(({ Icon, name, color }) => (
          <SwiperSlide key={name} className="select-none">
            <div className="flex flex-col items-center gap-3 group transition-transform duration-300 hover:scale-110">
              <div className="p-4 mt-2 rounded-xl bg-gray-800/50 border border-gray-700/30 backdrop-blur-sm group-hover:border-gray-600/50 transition-all">
                <Icon 
                  style={{ 
                    fontSize: "3rem", 
                    color: color,
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.1))"
                  }} 
                />
              </div>
              <span className="mb-2 text-sm font-medium text-gray-400 group-hover:text-gray-300">
                {name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
