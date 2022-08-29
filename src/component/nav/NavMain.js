import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { appmainul } from '../../content/content'

import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ThemeMain from '../../layout/theme/ThemeMain'
import ChipMain from '../../layout/chip/ChipMain'
import StaMain from '../sta/StaMain'
import { Context } from '../../context/Context'

export default function NavMain({

}) {
    const {

        auth,

    } = useContext(Context)
    const location = useLocation()

    const [navmainstate, setnavmainstate] = useState({
        navmainid: `apptbody`,
        navmainindex: 0,
    })

    useEffect(() => {
        if(location.pathname.includes(`main`)) {
            return setnavmainstate({
                navmainid: `apptbody`,
                navmainindex: 0,
            })
        }
        if(location.pathname.includes(`index`)) {
            return setnavmainstate({
                navmainid: `apptbody`,
                navmainindex: 1,
            })
        }
    }, [location])
    
    const apptbody = [
        {
            navmainrender: () => {
                const filter = appmainul.filter(data => data.contentid.includes(`main`))
                return appTbodyRender({
                    data: filter
                })
            }
        },
        {
            navmainrender: () => {
                return null
            }
        },
    ]

    const navmain = [
        {
            navmainid: `apptbody`,
            navmainref: apptbody,
        },
    ]

    const [appstatic, setappstatic] = useApp(navmain, navmainstate.navmainid,  navmainstate.navmainindex)

    if(!auth || typeof auth === 'undefined') return null
    
  return (
    <div>
        <main className="">
            <section className="">
                {appstatic?.map(data => (
                    data?.navmainrender()
                ))}
            </section>
        </main>
    </div>
  )
}

export function appTbodyRender({data}) {
  return (
    <ThemeMain>
        <div className="dark:border dark:border-slate-700">
            <section className="relative">
                <div className="absolute right-0 bottom-0">
                <CardMain>
                    <Link to={`/coupon/couponform`}>
                    <figure className="w-[70px] h-[70px] text-center  rounded-full l-button ">
                        <p className="m-h6">+</p>
                    </figure>
                    </Link>
                </CardMain>
                </div>
            </section>
            <section className="h-[10vh] flex flex-row justify-between items-center">
            {data?.map(data => (<> 
                <Link to={data.contentaction}>
                <CardMain>
                {data?.contenttitle}
                </CardMain>
                </Link>
            </>))}
            </section>
        </div>
    </ThemeMain>
  )
}
