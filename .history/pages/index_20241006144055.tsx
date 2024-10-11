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
      {/* Diğer içerikler */}
    </div>
  );
};

export default InfoSection;
