
import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { supabase } from '../lib/supabase';

export const Context = createContext()

export const Provider = ({ 
    children 
}) => {
    const [appstate, setappstate] = useState()
    const [tabmainstate, settabmainstate] = useState({ tabmainindex: 0 })
    // const [couponmainstate, setcouponmainstate,] = useState({})
    const [fieldmainstate, setfieldmainstate] = useState(true)
    const [dtamainstate, setdtamainstate] = useState(true)
    const [ptamainstate, setptamainstate] = useState(true)
    const [rtamainstate, setrtamainstate] = useState(true)

    const parseuser = JSON.parse(window.localStorage.getItem("opengem-user"));
    const parsefilter = JSON.parse(window.localStorage.getItem("opengem-filterpframe"));
    const parsesort = JSON.parse(window.localStorage.getItem("opengem-sortrframe"));
    if(!parseuser) {window.localStorage.setItem("opengem-user", JSON.stringify([]))}
    if(!parsefilter) {window.localStorage.setItem("opengem-filterpframe", JSON.stringify([]))}
    if(!parsesort) {window.localStorage.setItem("opengem-sortrframe", JSON.stringify([{contentid: `new`, contenttitle: `Recently created`, contentbool: false}]))}
    const [auth, setauth] = useState()
    const [useruserid, setuseruserid] = useState()
    const [couponuserid, setcouponuserid] = useState()
    const [claimuserid, setclaimuserid] = useState()
    const [checkuserid, setcheckuserid] = useState()

    useEffect(() => {
        setauth(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setauth(session)
        })
//         const { user, error } = supabase.auth.api.getUser('ACCESS_TOKEN_JWT')
// console.log('user', user)
    }, [])

    useEffect(() => {
        if(typeof auth !== 'undefined' && auth !== null){
            const ref = auth.user.id
            contextSelectUserUserid(ref)
            contextSelectCouponUserid(ref)
            contextSelectClaimUserid(ref)
            contextSelectCheckUserid(ref)
            
        } 
    }, [auth, fieldmainstate, ptamainstate, rtamainstate])

    const contextSelectUserUserid = async (first) => {
        const { data, error} = await supabase.from('user').select(`*`).eq('userid', first)
        if(data) {setuseruserid(data)}
    }

    const contextSelectCouponUserid = async (first) => {
        const { data, error} = await supabase.from('coupon').select(`*`).filter("userid", "eq", first).order('created_at', { ascending: Object.assign(...parsesort).contentbool })
        if(data) {setcouponuserid(data)}
    }

    const contextSelectClaimUserid = async (first) => {
        const { data, error} = await supabase.from('claim').select(`*, couponid!inner(*)`).filter("couponid.userid", "eq", first).order('created_at', { ascending: Object.assign(...parsesort).contentbool })
        if(data) {setclaimuserid(data)}
    }

    const contextSelectCheckUserid = async (first) => {
        const { data, error} = await supabase.from('check').select(`*, couponid!inner(*)`).filter("couponid.userid", "eq", first).order('created_at', { ascending: Object.assign(...parsesort).contentbool })
        if(data) {setcheckuserid(data)}
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
        },
    ]

    const claimdl = [
        {
            contextid: `my`,
            contextdata: claimuserid && claimuserid,
        },
    ]

    const checkdl = [
        {
            contextid: `my`,
            contextdata: checkuserid && checkuserid,
        },
    ]

    const messagedl = [
        {
            contextid: `coupon`,
            contextdata: couponuserid && couponuserid,
        },
        {
            contextid: `claim`,
            contextdata: claimuserid && claimuserid,
        },
          {
            contextid: `check`,
            contextdata: checkuserid && checkuserid,
        },
    ]

    // const guidedl = [
    //     {
    //         spreadid: 'activity',
    //         spreadtitle: 'My activity',
    //         spreadicon: `💬`,
    //         spreaddata: () => {
    //             if(typeof useruserid === 'undefined') return null
    //             return userul.map(data => (
    //                 {
    //                     spreadidtwo: data.breadid,
    //                     spreadhref: `/guide/guideindex/` + data.breadid,
    //                     spreaddetail: `${data.breadtitle}`,
    //                     spreadrender: () => {
    //                         const ref = useruserid[0][data.breadid] === null
    //                         return contextRenderFive(ref, data.breadid, data.breadaction)
    //                     }
    //                 }
    //             ))
    //         }
    //     },
    // ]

    return (
        <Context.Provider value={{
        appstate, setappstate,
        fieldmainstate, setfieldmainstate,
        dtamainstate, setdtamainstate,
        tabmainstate, settabmainstate,
        ptamainstate, setptamainstate,
        rtamainstate, setrtamainstate,

        auth,
        userdl,
        coupondl,
        claimdl,
        checkdl,
        messagedl,
        
        }} >
        {children}
      </Context.Provider>
    )
}
