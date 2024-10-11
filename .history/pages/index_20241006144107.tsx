type InfoSectionProps = {
  data: any;  // Verinin tipi neyse ona göre güncelleyebilirsin
  TITLE: string;
  DES: string;
};

const InfoSection: React.FC<InfoSectionProps> = ({ data, TITLE, DES }) => {
  return (
    <div>
      <h1>{TITLE}</h1>
      <p>{DES}</p>
      <MainLayout>
        <InfoSection />
        <InfoBoxOffer/>

       
      </MainLayout>
    </div>
  );
};

export default InfoSection;
