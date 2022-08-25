
import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { supabase } from '../lib/supabase';

export const Context = createContext()

export const Provider = ({ 
    children 
}) => {
    const parseuser = JSON.parse(window.localStorage.getItem("iq-user"));
    if(!parseuser) {window.localStorage.setItem("iq-user", JSON.stringify([]))}
    const [appstate, setappstate] = useState()
    const [fieldmainstate, setfieldmainstate] = useState(true)
    const [dtamainstate, setdtamainstate] = useState(true)
    const [auth, setauth] = useState()
    const [useruserid, setuseruserid] = useState()
    const [couponuserid, setcouponuserid] = useState()

    useEffect(() => {
        setauth(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setauth(session)
        })
    }, [])

    useEffect(() => {
        if(typeof auth !== 'undefined' && auth !== null){
            const ref = auth.user.id
            contextSelectUserUserid(ref)
            contextSelectCouponUserid(ref)

            
        } 
    }, [auth])

    const contextSelectUserUserid = async (first) => {
        const { data, error} = await supabase.from('user').select(`*`).eq('userid', first)
        if(data) {setuseruserid(data)}
    }

    const contextSelectCouponUserid = async (first) => {
        const { data, error} = await supabase.from('coupon').select(`*`).eq('userid', first)
        if(data) {setcouponuserid(data)}
    }

    const userdl = [
        {
            contextid: `my`,
            contextdata: useruserid && useruserid,
        }
    ]

    const coupondl = [
        {
            contextid: `my`,
            contextdata: couponuserid && couponuserid,
        }
    ]

    const messagedl = [
        {
            contextid: `coupon`,
            contextdata: couponuserid && couponuserid,
        }
    ]

    return (
        <Context.Provider value={{
        appstate, setappstate,
        fieldmainstate, setfieldmainstate,
        dtamainstate, setdtamainstate,

        auth,
        userdl,
        coupondl,
        messagedl,
        
        }} >
        {children}
      </Context.Provider>
    )
}
