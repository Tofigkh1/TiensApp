import axios from "axios";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect } from 'react';


const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

interface Props {
  data: any,
  TITLE: string,
  DES: string
}

const Home: NextPage = (props:Props) => {

  return (
<div>
      <MainLayout>
        <InfoSection />
        <InfoBoxOffer/>
        {/* <InfoBox/> */}
       
      </MainLayout>
      </div>
  );
};

export default Home;