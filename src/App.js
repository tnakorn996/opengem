
import React, {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';

import './App.css';
import BarMain from './component/bar/BarMain';
import NavMain from './component/nav/NavMain';
import AuthMain from './page/auth/AuthMain';
import AuthForm from './page/auth/AuthForm';
import CouponMain from './page/coupon/CouponMain';
import CouponForm from './page/coupon/CouponForm';
import CouponIndex from './page/coupon/CouponIndex';
import ClaimForm from './page/claim/ClaimForm';
import GraphMain from './component/graph/GraphMain';
import BackdropMain from './layout/backdrop/BackdropMain';
import ClaimStatus from './page/claim/ClaimStatus';

export default function App() {

  return (
      <div className="App">
        <BackdropMain>
        <GraphMain />
        <main className="">
        <section className="sticky h-[10vh] top-0 right-0">
         <BarMain />
        </section>
        
        <section className="min-h-screen">
        <Routes>
          <Route path='/auth/authmain' element={<AuthMain />} /> 
          <Route path='/auth/authform' element={<AuthForm />} /> 

          <Route path='/coupon/couponmain' element={<CouponMain />} /> 
          <Route path='/coupon/couponform' element={<CouponForm />} /> 
          <Route path='/coupon/couponform/:id' element={<CouponForm />} /> 
          <Route path='/coupon/couponindex/:id' element={<CouponIndex />} /> 

          <Route path='/claim/claimform/:id' element={<ClaimForm />} /> 
          <Route path='/claim/claimstatus/:id' element={<ClaimStatus />} /> 

        </Routes> 
        </section>

        <section className="sticky bottom-0 right-0">
          <NavMain />
        </section>
        </main>
        </BackdropMain>
      </div>

    );

}
