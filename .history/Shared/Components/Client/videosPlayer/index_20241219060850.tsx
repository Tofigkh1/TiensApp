import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box } from "@chakra-ui/react";
import Playbutton from "../../../../public/play-button (1).png"
import Image from "next/image";

const fetchMedia = async () => {
  const response = await axios.get("/api/uploads?folder=videos&all=true");
  console.log("response",response);
  
  return response.data.mediaList;
};

const VideoPlayer = () => {
  const [visibleVideo, setVisibleVideo] = useState(null); // Oynatılacak video
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const { data: mediaList, isLoading } = useQuery({
    queryKey: ["mediaList"],
    queryFn: fetchMedia,
  });

  const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // İlk veri yükleme ekranı
  }

  return (
<div>
  <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    navigation
    modules={[Autoplay, Pagination, Navigation]}
    onAutoplayTimeLeft={onAutoplayTimeLeft}
    style={{ width: "100vw", height: "100vh" }} // Tam ekran için stil
  >
    {mediaList.map((media, index) => (
      <SwiperSlide key={index}>
        <div
          style={{
            width: "100vw",
            height: "650px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "80px",
              height: "80px",
              padding: "10px 16px",
              background: "#007bff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              position: "absolute",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "500px",
            }}
            onClick={() => setVisibleVideo(media.videos[0].videoUrl)}
          >
         <Image src={Playbutton}/>
          </button>
          {media.covers.length > 0 ? (
            <img
              src={media.covers[0].coverImageUrl}
              alt="Cover"
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "calc(100% - 50px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Cover
            </div>
          )}
        </div>
      </SwiperSlide>
    ))}
    <div className="autoplay-progress" slot="container-end">
      <svg viewBox="0 0 48 48" ref={progressCircle}>
        <circle cx="24" cy="24" r="20"></circle>
      </svg>
      <span ref={progressContent}></span>
    </div>
    <div onClick={() => setVisibleVideo(null)}></div>
  </Swiper>

  {/* Video Modal */}
  {visibleVideo && (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Karartma efekti
          zIndex: "999", // ReactPlayer'ın altına yerleştir
        }}
        onClick={() => setVisibleVideo(null)} // Tıklanabilir yap
      ></div>

      {/* ReactPlayer */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Ortala
          zIndex: "1000", // En üstte görünmesini sağla
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="gray.900"
          color="white"
          p={4}
          borderRadius="20px"
          maxWidth="1100px"
        >
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Vidoe Player</h1>
          <ReactPlayer
            url={visibleVideo}
            playing={true} // Otomatik oynatma

            controls={true} // Oynatıcı kontrollerini göster
            config={{
              twitch: {
                options: {
                  autoplay: true, // Otomatik oynatma
          
                },
              },
            }}
            width="1100px" // Oynatıcı genişliği
            height="580px" // Oynatıcı yüksekliği
            style={{ borderRadius: "20px", overflow: "hidden" }}
          />
        </Box>
      </div>
    </>
  )}
</div>

  );
};

export default VideoPlayer;