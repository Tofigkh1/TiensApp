import React, { useState, useEffect } from 'react';
import eyeIcon from '../../../../../public/eye.svg';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import styles from './loginInp.module.css';
import Image from 'next/image';

interface Props {
    title: string;
    type: string;
    icon: boolean;
    name: string;
}

function LoginInp(props: Props) {
    const { title, type, icon, name } = props;
    const [show, setShow] = useState(false);

    // Formik context to reset the field value
    const { setFieldValue } = useFormikContext();

    // Reset the input value on component mount
    useEffect(() => {
        setFieldValue(name, '');
    }, [name, setFieldValue]);

    return (
        <div className={styles.div}>
            <label htmlFor={name} className={styles.label}>{title}</label>
            <div className={`flex flex-row ${styles.relative}`}>
                <Field
                    className={styles.inp}
                    type={show ? 'text' : type}
                    name={name}
                />
                {!icon && (
                    <Image
                        src={eyeIcon}
                        alt='eyeIcon'
                        width={35}
                        height={32}
                        className={styles.ayeIcon}
                        onClick={() => setShow(prev => !prev)}
                    />
                )}
            </div>
            <ErrorMessage name={name} component="div" />
        </div>
    );
}

export default LoginInp;
