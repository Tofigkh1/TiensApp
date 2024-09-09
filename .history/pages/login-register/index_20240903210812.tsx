import React, { useEffect, useState, useLayoutEffect } from "react";
import style from './loginRegister.module.css';
import Image from "next/image";
import registerIcon from '../../public/TiensRegister.png';
import SignInForm from '../../Shared/Components/Client/login-register/loginForm/index';
import RegisterForm from '../../Shared/Components/Client/login-register/RegisterForm/index';
import { useRouter } from "next/router";

function LoginRegister() {
  const [singin, setSingin] = useState(false);
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const { email } = router.query; // Get email from query parameter

  useEffect(() => {
    if (window.innerWidth < 800) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [mobile]);

  useLayoutEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('user_info');
      if (user) {
        router.replace('/');
      }
    };
    checkUser();

    // If query has form=register, activate RegisterForm
    if (router.query.form === 'register') {
      setSingin(true);
    }

    return () => {};
  }, [router]);

  return (
    <div>
      <div className={style.Body + ' w-full h-full p-7 '}>
        <header className={style.blackbg + '  h-28 flex items-center justify-between  p-9 rounded-md '}>
          <img style={{ width: '80px', height: '80px' }} className={style.logo} src="/Logo.png" alt="Logo" onClick={() => router.push("/")} />
        </header>

        <div className={mobile ? ' flex flex-col gap-3 ' : ' flex flex-row gap-3 '}>
         

          <div className={mobile ? style.loginbg + '  h-full mt-5 rounded-md' : style.loginbg + ' w-2/5 h-full mt-5 rounded-md'}>
            <div className='flex flex-row gap-16 justify-center h-full mt-20'>
              <button className={!singin ? style.headerTextActive : style.headerTextDeActive} onClick={() => setSingin(false)}>Login</button>
              <button className={singin ? style.headerTextActive : style.headerTextDeActive} onClick={() => setSingin(true)}>Register</button>
            </div>
            {singin ? <RegisterForm setsingin={() => setSingin(true)} initialEmail={email} /> : <SignInForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
