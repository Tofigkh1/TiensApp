import axios from "axios";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect } from 'react';


const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

interface InfoSectionProps {
  data: any;
  TITLE: string;
  DES: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ data, TITLE, DES }) => {
  return (
    <div>
      <h1>{TITLE}</h1>
      <p>{DES}</p>
      {/* data kullanımı */}
    </div>
  );
};

export default Home;