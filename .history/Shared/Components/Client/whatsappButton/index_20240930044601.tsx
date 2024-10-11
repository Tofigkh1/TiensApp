import { WhatsApp } from '@mui/icons-material';
import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '994503552716'; // Telefon numarası (başında '+' olmadan)
        const message = 'Merhaba, bu ürünü almak istiyorum.'; // Gönderilecek mesaj
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Kullanıcıyı WhatsApp URL'ine yönlendir
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button onClick={handleWhatsAppClick}>
             <FaWhatsapp width={70}/>
            WhatsApp ile Mesaj Gönder
        </button>
    );
};

export default WhatsAppButton;
