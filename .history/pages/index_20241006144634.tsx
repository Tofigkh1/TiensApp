import axios from "axios";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect, useState } from 'react';

const MainLayout = dynamic(() => import("../Shared/Components/Layout/MainHeaderLayout"), { ssr: false });

interface Props {
    row: boolean,
    img: any,
    desc: string,
    title: string,
    w: number,
    h: number
}

const Home: NextPage = (props) => {
  // Örnek olarak data, TITLE, ve DES sabit veriler
  const data = { id: 1, name: "Example Data" };
  const TITLE = "";
  const DES = "";

  return (
    <div>
      <MainLayout>
        <InfoSection data={data} TITLE={TITLE} DES={DES} />
        row={true}
    img={MedicinesIcon}
    desc="Get all your medicine in one place."
    title="All your Medicine needs in one place"
    w={511}
    h={400}
      </MainLayout>
    </div>
  );
};

export default Home;
