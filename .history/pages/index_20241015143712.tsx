import axios from "axios";
import dynamic from "next/dynamic";
import { GetServerSideProps, NextPage } from "next";
import InfoSection from "../Shared/Components/Client/infoSection";
import InfoBoxOffer from "../Shared/Components/Client/InfoBoxOffer.tsx";
import Footer from "../Shared/Components/Client/Footer";
import { useEffect, useState } from 'react';
import MedicinesIcon from '../public/MedicinesIcon.svg';

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
      <InfoSection 
  data={data} 
  TITLE={TITLE} 
  DES={DES} 
  ProductID={data.id.toString()}  // ProductID özelliğini ekleyin
/>
        <InfoBoxOffer
    row={true}
    img={MedicinesIcon}
    desc=""
    title=""
    w={511}
    h={400}
/>

      </MainLayout>
    </div>
  );
};



// getServerSideProps fonksiyonu
export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = 'https://your-api-url.com/data'; // API URL'sini güncelleyin
  try {
      const response = await axios.get(apiUrl); // API'den veri alın
      const data = response.data; // Alınan veriyi JSON formatında çıkarın

      // Props olarak döndürün
      return {
          props: {
              data, // Veriyi props olarak ekleyin
              TITLE: "Your Title Here", // Başlık ekleyin
              DES: "Your description here.", // Açıklama ekleyin
          },
      };
  } catch (error) {
      console.error('Error fetching data:', error);
      // Hata durumunda varsayılan bir veri döndürün
      return {
          props: {
              data: { id: 0, name: "Fallback Data" }, // Varsayılan veri
              TITLE: "Your Title Here",
              DES: "Your description here.",
          },
      };
  }
};


export default Home;
