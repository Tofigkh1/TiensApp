import React from "react";
import Image from "next/image";




function AboutUs() {
 
//
  return (
    <>
     
        <main className="hidden sm:block">
          <section className=" flex flex-wrap py-8 md:py-[110px] mx-auto gap-[60px]  justify-center xxl:justify-between">
            <div
              data-aos="fade-right"
              className="max-w-[565px] flex flex-col gap-8 ml-8"
            >
              <p className="font-mukta text-[45px] font-semibold leading-8 tracking-tight ">
              About Us
              </p>
              <p className=" text-[#828282] font-roboto text-[20px] font-medium leading-7 tracking-tight">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and visual
                mockups.Lorem ipsum is placeholder text commonly used in the
                graphic, print, and publishing industries for previewing layouts
                and visual mockups.Lorem ipsum is placeholder text commonly used
                in the graphic, print, and publishing industries for previewing
                layouts and visual mockups.
              </p>
            </div>
            <div
              data-aos="fade-left"
              className=" relative w-[634px] h-[789px] mr-[50px] "
            >
              <Image
                width={680}
                className=""
                height={407}
                src={"/aboutUsYellow.svg"}
                alt="yellow-bg"
              />

              <Image
                width={274}
                className=" mx-auto absolute top-[-10px] left-[330px] "
                height={174}
                src={"/aboutUsCoffe.svg"}
                alt="yellow-bg"
              />
              <Image
                width={274}
                className=" mx-auto absolute top-[195px] left-[50px] "
                height={174}
                src={"/aboutUsCoffe.svg"}
                alt="yellow-b"
              />
              <Image
                width={274}
                className=" mx-auto absolute top-[375px]  right-0"
                height={174}
                src={"/aboutUsCoffe.svg"}
                alt="yellow-bg"
              />
              <Image
                width={274}
                className=" mx-auto absolute  bottom-[0px] left-0"
                height={174}
                src={"/aboutUsCoffe.svg"}
                alt="yellow-bg"
              />
            </div>
          </section>
        </main>
        {/* Responsive Design */}
        <section className=" block sm:hidden">
          <div className="">
            <div className=" text-center">
              <p className="font-mukta text-[35px] font-semibold leading-8 tracking-tight ">
              About Us
              </p>
              <p className=" p-5 text-center text-[#828282] font-roboto text-base leading-8 font-medium  tracking-tighter">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and ver
                text commonly used in the graphic, print, and publishing
                industries for previewing layouts and visual mockups.
              </p>
            </div>
            <div className="bg-[#8d4fff]  rounded-[100px] w-[280px] h-[480px] mx-auto  flex flex-col  items-center pt-6  gap-8">
              <Image
                width={230}
                className=""
                height={144}
                src={"/aboutUsCoffe.svg"}
                alt="yellow-bg"
              />
              <Image
                width={230}
                className="  "
                height={144}
                src={"/aboutUsCoffe.svg"}
                alt="yellow-bg"
              />
            </div>
          </div>
        </section>
      
    </>
  );
};

export default AboutUs;