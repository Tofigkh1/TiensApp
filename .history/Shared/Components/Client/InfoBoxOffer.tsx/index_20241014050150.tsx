import React, { useEffect, useState } from 'react';
import style from './infoBoxOffer.module.css';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MedicinesIcon from '../../../../public/MedicinesIcon.svg';
import Exclude from '../../../../public/Exclude.svg';
import buttonVector from '../../../../public/buttonVector.svg';
import bcichlesIcon from '../../../../public/bcichlesIcon.svg';
import groupHuman from '../../../../public/groupHuman.svg';
import feedBackImg from '../../../../public/Feedback.jpg';
import Testimonial from '../Testimol';
import { useRouter } from 'next/router';

interface Props {
    row: boolean,
    img: any,
    desc: string,
    title: string,
    w: number,
    h: number
}

function InfoBoxOffer(props: Props) {
    const [mobile, setMobile] = useState(false);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        AOS.init({
            once: true, // Animasyonların yalnızca bir kez çalışmasını sağlamak için
        });

        if (!animationPlayed) {
            AOS.refreshHard(); // Sayfa yüklendiğinde veya yenilendiğinde animasyonları zorla tetikler
            setAnimationPlayed(true);
        }

        if (window.innerWidth < 800) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, [animationPlayed]);

    let { Title, des, bgDiv1, IMG, bgDiv2 } = style;
    let { row, img, desc, title, w, h } = props;

    return (
  
    );
}

export default InfoBoxOffer;
