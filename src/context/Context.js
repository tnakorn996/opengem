
import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { couponul } from '../content/content';

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
    const [clickuserid, setclickuserid] = useState()

    useEffect(() => {
        setauth(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            contextUpsert(session)
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
            contextSelectClickUserid(ref)
            
        } 
    }, [auth, fieldmainstate, ptamainstate, rtamainstate])


    const contextUpsert = async (session) => {
        const user = supabase.auth.user()
        const query = {
            userid: user.id,
            useremail: user.email,
            username: user.email.split(`@`)[0],
        }
        const { error } = await supabase.from('user').upsert(query, {returning: 'minimal'})
            //   alert(error.message)
            //   navigate(`/workout/workoutmain`)
            // setfieldmainbool(!fieldmainbool)
            // setfieldmainstate(!fieldmainstate)
            // navigate(`/coupon/couponmain`)
    }

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

    const contextSelectClickUserid = async (first) => {
        const { data, error} = await supabase.from('click').select(`*`).filter("userid", "eq", first).limit(1).single().order('created_at', { ascending: false})
        if(data) {setclickuserid(data)}
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

    // function contextAction(second, result) {
    //     if(questuserid && questuserid.filter(data => data?.spreadidtwo === second).length === 0) {
    //         return Object.assign({booltwo: true}, result)
    //     } 
    //     return Object.assign({booltwo: false}, result)
    // }

    function contextAction(first, second, navigate, data) {
        if(first) {return  {navigate: navigate, bool: true, data: data}}  
        return  {navigate: navigate, bool: false, data: data} 
    }

    const guidedl = [
        {
            contextid: 'coupon',
            contexttitle: 'First coupon',
            contexticon: `📝`,
            contextdata: () => {
                if(typeof couponuserid === 'undefined') return null
                return couponul.map(data => (
                    {
                        contextidtwo: data.contentid,
                        contexthref: `/guide/guideindex/` + data.contentid,
                        contextdetail: `${data.contenttitle}`,
                        contextrender: () => {
                            const ref = couponuserid?.length === 0;
                            return contextAction(ref, data.contentid, data.contentaction)
                        }
                    }
                ))
            }
        },
        {
            contextid: 'click',
            contexttitle: 'First click',
            contexticon: `✅`,
            contextdata: () => {
                if(typeof clickuserid === 'undefined') return null
                return clickuserid.map(data => (
                    {
                        contextidtwo: data.contentid,
                        contexthref: `/guide/guideindex/` + data.contentid,
                        contextdetail: `${data.clicktitle}`,
                        contextrender: () => {
                            const ref = clickuserid?.length === 0;
                            return contextAction(ref, data.contentid, data.contentaction)
                        }
                    }
                ))
            }
        },
    ]

    // const date = new Date(
    // new Date().getFullYear(),
    // new Date().getMonth() - 1, 
    // new Date().getDate()
    // )
    // const toisostring = date.toISOString();

    const date = new Date()
    const toisostring = date.toISOString();
    // console.log('clickuserid?.created_at', clickuserid)

    const notificationdl = [
        {
            contextid: 'all',
            contexttitle: 'All claim check',
            contexticon: `🔔`,
            contextdata: () => {
                if(typeof claimuserid === 'undefined'
                || typeof checkuserid === 'undefined') return null
                const concat = (claimuserid.concat(checkuserid)).sort((a, b) => b.created_at.localeCompare(a.created_at))
                return concat.map(data => (
                    {
                        contextidtwo: data.claimid || data.checkid,
                        contexthref: `/notification/notificationindex/${data.claimid || data.checkid}`,
                        contextdetail: `${data.couponid.coupontitle} was marked as ${data.claimid ? `claimed` : `donated`}`,
                        contextrender: () => {
                            const ref = (data?.created_at > (clickuserid && clickuserid.created_at)) || (data?.created_at < toisostring)
                            return contextAction(ref, data.claimid || data.checkid, data.couponid.couponid, data)
                        }
                    }
                ))
            }
        },
    ]

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
        guidedl,
        notificationdl,
        
        }} >
        {children}
      </Context.Provider>
    )
}
