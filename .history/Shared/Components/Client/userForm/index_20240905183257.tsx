import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../Client/userInp/index';
import style from './form.module.css';
import { AppDispatch, RootState } from '../../../Redux/Store/store';
import uploadFile from '../../../Utils/uploadFile';
import { PutAuthUserr } from '../../../../Services/index';
import Spiner from '../../../Components/Client/Spiner/index';
import { useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../../Redux/Featuries/User/userSlice";

interface FormValues {
    phone: string;
    username: string;
    email: string;
    fullname: string;
    address: string;
}

const validationSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(/^\+994\d{9}$/, 'Phone number must start with +994 and have 9 additional digits')
        .required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    fullname: Yup.string().required('Full name is required'),
    address: Yup.string().required('Address is required'),
});

const UserForm: React.FC<{ img: any | undefined }> = ({ img }) => {
    const toast = useToast();
    const [logoding, setlogoding] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        let storedUser = localStorage.getItem("user_info");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) dispatch(setUser(parsedUser));
        }
    }, [dispatch]);

    const onSubmit = async (values: FormValues) => {
        console.log(img);

        if (!img) {
            toast({
                title: `You have to add image to profile`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            return;
        }

        setlogoding(true);

        try {
            const imgres = await uploadFile({
                file: img,
                collectionId: "users-hash-password",
                documentId: "users-hash-password"
            }) as string | null;

            if (!imgres) throw new Error('Image upload failed');

            const userInfo = { ...values, img_url: imgres };
            const res = await PutAuthUserr(userInfo);

            if (!res) throw new Error('User update failed');

            localStorage.setItem("user_info", JSON.stringify(userInfo));
            dispatch(setUser(userInfo));

            toast({
                title: `User info is Updated`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });

            setlogoding(false);
        } catch (err: any) {
            console.log(err);
            toast({
                title: `Error: ${err.message}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right',
                variant: 'subtle'
            });
            setlogoding(false);
        }
    };

    const initialValues: FormValues = {
        phone = user?.phoneNumber,
        username: user?.username,
        email: user?.email,
        fullname: user?.fullname,
        address: user?.address,
    };



    let { div, inpdiv, button } = style;
    
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}  
            >
                <Form>
                    <div className={div}>
                        <div className={inpdiv}>
                            <Input name='phone' type='text' placeholder='+994 XX XXX XX XX' title="Contact Number" />
                            <Input name='username' type='text' placeholder='User Name' title="User Name" />
                            <Input name='fullname' type='text' placeholder='Full Name' title="Full Name" />
                        </div>
                        <div className={inpdiv}>
                            <Input name='email' type='email' title='Email' />
                            <Input name='address' type='text' placeholder='Address' title="Address" />

                            <button type="submit" className={button} style={logoding ? { cursor: "not-allowed" } : { cursor: 'pointer' }}>
                                {logoding ? <Spiner /> : "Save"}
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default UserForm;
