
import React, {useState, useEffect, useContext} from 'react'
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { motion } from 'framer-motion';
import { Context } from './context/Context';
import BarMain from './component/bar/BarMain';
// import BreadMain from './component/bread/BreadMain';
import NavMain from './component/nav/NavMain';
import AuthMain from './page/auth/AuthMain';
import AuthForm from './page/auth/AuthForm';
import UserForm from './page/user/UserForm';
import CouponMain from './page/coupon/CouponMain';
import CouponForm from './page/coupon/CouponForm';
import CouponIndex from './page/coupon/CouponIndex';
import ClaimForm from './page/claim/ClaimForm';
import GraphMain from './component/graph/GraphMain';
import BackdropMain from './layout/backdrop/BackdropMain';
import ClaimStatus from './page/claim/ClaimStatus';
import ClaimMain from './page/claim/ClaimMain';
import CouponStatus from './page/coupon/CouponStatus';
import NotificationMain from './page/notification/NotificationMain';

export default function Setting() {
  const {
    appstate,

    auth,

  } = useContext(Context)
  // console.log('auth', auth)

  return (
      <div className="Setting">
        <BackdropMain>
        <GraphMain graphmainstatic={{graphmainid: `guidebase`, graphmainindex: 0}} />
        <motion.main className={`duration-200 scale-100 ${appstate && `!scale-95`}`}>

        {auth 
        && <section className="z-20 sticky h-[10vh] top-0 right-0">
         <BarMain />
        </section>}
{/* 
        <section className="">
         <BreadMain />
        </section> */}
        
        
        <section className="min-h-[90vh]">
        <Routes>
          <Route path='/auth/authform' element={<AuthForm />} /> 

          <Route path='/user/userform' element={<UserForm />} /> 

          <Route path='/coupon/couponform' element={<CouponForm />} /> 
          <Route path='/coupon/couponform/:id' element={<CouponForm />} /> 

          <Route path='/claim/claimform/:id' element={<ClaimForm />} /> 

        </Routes> 
        </section>

        {auth && <section className="sticky bottom-0 right-0">
          <NavMain />
        </section>}
        </motion.main>
        </BackdropMain>
      </div>

    );

}
