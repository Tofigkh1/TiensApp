import React from 'react';
import TelegramIcon from '../../../../public/telegram.png'
import Image from 'next/image';
const TelegramButton = () => {
    const handleTelegramClick = () => {
        const phoneNumber = '994503552716'; // Telegram numarası
        const message = encodeURIComponent('Merhaba!'); // Önceden yazılı mesaj (opsiyonel)
        const telegramUrl = `https://t.me/${phoneNumber}?text=${message}`;

        // Kullanıcıyı Telegram URL'ine yönlendir
        window.open(telegramUrl, '_blank');
    };

    return (
        <button onClick={handleTelegramClick}>
        <Image src={TelegramIcon} width={70} height={70} alt='icon'/>
       Telegram ile Mesaj Gönder
   </button>
    );
};

export default TelegramButton;
