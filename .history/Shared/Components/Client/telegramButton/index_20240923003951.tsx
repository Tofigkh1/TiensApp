import React from 'react';

const TelegramButton = () => {
    const handleTelegramClick = () => {
        const phoneNumber = '+994515037927'; // Telegram numarası
        const message = encodeURIComponent('Merhaba!'); // Önceden yazılı mesaj (opsiyonel)
        const telegramUrl = `https://t.me/${phoneNumber}?text=${message}`;

        // Kullanıcıyı Telegram URL'ine yönlendir
        window.open(telegramUrl, '_blank');
    };

    return (
        <button onClick={handleTelegramClick}>
            <img src="/path-to-telegram-icon.png" alt="Telegram" />
            Telegram ile Mesaj Gönder
        </button>
    );
};

export default TelegramButton;
