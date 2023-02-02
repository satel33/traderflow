import React from "react"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { Button } from "../components/Button"
import { RoadmapItem } from "../components/RoadmapItem"

import { NftImg } from "../utils/imgImport"
import { benefitItems, roadmaps, spatials } from "../utils/staticData"

const IndexPage = () => {
  return (
    <>
      <section className="landing-back">
        <Header />

        {/* Hero Section */}
        <div className="container">
          <div className="pt-12 text-center sm:pt-[128px] sm:text-left">
            <h1 className="gold-linear font-heading text-[32px] font-bold leading-[44.8px] sm:text-[68px] sm:leading-[81.6px]">
              Trust But Verify
            </h1>
            <h1 className="max-w-[836px] font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-[68px] sm:leading-[81.6px]">
              Web 3.0 Trader Auditing, Trading Metaverse
            </h1>
            <p className="mx-auto mt-[12px] max-w-[355px] text-base text-gray sm:mx-0 sm:text-xl">
              Earn profits by laucnhing, staking and funding multi-chain ideas
            </p>
            <Button clsName="mt-10 btn-cta sm:mt-20">
              Sign up free of charge
            </Button>
          </div>
          <img className="mx-auto mt-16 sm:hidden" src={NftImg} alt="nft" />
          <div className="mt-20 sm:mt-[327px]">
            <h2 className="text-center font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-left sm:text-[56px] sm:leading-[67.2px]">
              Benefits
            </h2>
            <ul className="mt-14 flex flex-wrap justify-around sm:mt-[132px]">
              {benefitItems.map(item => (
                <li
                  key={item.title}
                  className="mb-16 max-w-[355px] text-center sm:mr-14 sm:text-left"
                >
                  <img
                    className="mx-auto mb-8 sm:mx-0"
                    src={item.icon}
                    alt={item.title}
                  />
                  <h4 className="mb-2 font-heading text-2xl font-semibold text-white xl:mb-4 xl:text-[32px] xl:leading-[44.8px]">
                    {item.title}
                  </h4>
                  <p className="text-base text-white xl:text-xl">
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spatials Section */}
        <div className="py-40 text-center sm:py-48">
          <h2 className="mb-[70px] font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-[56px] sm:leading-[67.2px]">
            Showcase your collections
            <br />
            <span className="gold-linear">in VR spatials</span>
          </h2>
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              freeMode={true}
              loop={true}
              grabCursor={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {spatials.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <img src={item.img} alt={item.lang} />
                  <p className="absolute bottom-3 left-4 text-left font-heading text-2xl font-semibold text-white sm:bottom-4 sm:left-6 sm:text-[32px] sm:leading-[44.8px]">
                    {item.lang}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Button type="secondary" clsName="mt-12 mx-auto">
            Sign up now
          </Button>
        </div>

        <div className="none ml-[30px] border-l-4 border-white lg:ml-0 lg:border-l-0 lg:border-b-4 ">
          <div className="container">
            <h2 className="mb-28 text-right font-heading text-[32px] font-bold leading-[44.8px] text-white sm:text-[56px] sm:leading-[67.2px]">
              Traderflow <span className="gold-linear">Roadmap</span>
            </h2>
            <div className="flex flex-col lg:flex-row">
              {roadmaps.map((item, idx) => (
                <RoadmapItem
                  key={idx}
                  height={item.height}
                  list={item.list}
                  quater={item.quater}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="py-28"></div>
      </section>
      <Footer />
    </>
  )
}

export default IndexPage
