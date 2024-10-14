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
        <div className=' mt-20'>
     

            <div className=' mt-24 justify-around'>
                <div className={style.oneOfferDiv}>
                    <div 
                     
                  >
                        <Image src={feedBackImg} alt="Icon" width={420} height={0} />
                    </div>

                    <div className='' data-aos={mobile ? 'fade-up' : "fade-left"}>
                        <div className=' mr-10'>
                            <Testimonial />
                        </div>
                    </div>
                </div>
            </div>

            <div data-aos="zoom-in" data-aos-delay="300" style={{ display: 'none' }}>
                {/* İçerik */}
            </div>
        </div>
    );
}

export default InfoBoxOffer;
