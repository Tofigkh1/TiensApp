import axios from "axios";
import dynamic from "next/dynamic";
import { NextPage } from "next";

import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect } from 'react';
import { initializeAppCheck } from '../server/configs/firebase';


const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });



const Home: NextPage = (props) => {

  return (
    <>

      <MainLayout />

      {/* <Footer /> */}
      {/* <footer className="bg-blue-900 text-white py-10">
            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">D-Express</h2>
                    <p>Your favourite online pharmacy store. We offer onsite delivery and your health is our priority</p>
                </div>
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Sign up for our Newsletter</h2>
                    <p className="mb-4">Get to know updates in the field of medicine and know how often our stores are stocked</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="w-full rounded-l-full px-4 py-2"
                        />
                        <button className="bg-green-500 text-white rounded-r-full px-6 py-2">
                            Subscribe
                        </button>
                    </form>
                </div>
              
                <div>
                    <h2 className="text-2xl font-bold mb-4">Quick links</h2>
                    <ul>
                        <li className="mb-2"><a href="#" className="hover:underline">Contact us</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Services</h2>
                    <ul>
                        <li className="mb-2"><a href="#" className="hover:underline">Delivery</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Purchase</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Consult Specialist</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Social Media</h2>
                    <ul>
                        <li className="mb-2"><a href="#" className="hover:underline">Facebook</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Twitter</a></li>
                        <li className="mb-2"><a href="#" className="hover:underline">Linkedin</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-10">
                <p>Designed by sophisticateddev. copyright©</p>
            </div>
        </footer> */}
    


      <MainLayout>
        <InfoSection />
        <InfoBoxOffer/>
        {/* <InfoBox/> */}
       
      </MainLayout>

    </>
  );
};

export default Home;