import React from 'react';
import TelegramIcon from '../../../../public/telegram.png'
const TelegramButton = () => {
    const handleTelegramClick = () => {
        const phoneNumber = '+994515037927'; // Telegram numarası
        const message = encodeURIComponent('Merhaba!'); // Önceden yazılı mesaj (opsiyonel)
        const telegramUrl = `https://t.me/${phoneNumber}?text=${message}`;

        // Kullanıcıyı Telegram URL'ine yönlendir
        window.open(telegramUrl, '_blank');
    };

    return (
        <button onClick={handleWhatsAppClick}>
        <Image src={WhatssapIcon} width={70} height={70} alt='icon'/>
       WhatsApp ile Mesaj Gönder
   </button>
    );
};

export default TelegramButton;
