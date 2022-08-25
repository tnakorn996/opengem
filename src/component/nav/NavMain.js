import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { appmainul } from '../../content/content'

import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ThemeMain from '../../layout/theme/ThemeMain'
import ChipMain from '../../layout/chip/ChipMain'

export default function NavMain({

}) {
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
        }
    ]

    const [appstatic, setappstatic] = useApp(navmain, navmainstate.navmainid,  navmainstate.navmainindex)

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
    <div className="h-[10vh]  dark:border dark:border-slate-700">
        <ThemeMain>
            <section className="absolute right-0 -top-28">
            <CardMain>
                <Link to={`/coupon/couponform`}>
                <figure className="w-[70px] h-[70px] text-center  rounded-full l-button ">
                    <p className="m-h6">+</p>
                </figure>
                </Link>
            </CardMain>
            </section>
            <section className="flex flex-row justify-between">
            {data?.map(data => (<> 
                <Link to={data.contentaction}>
                <CardMain>
                {data?.contenttitle}
                </CardMain>
                </Link>
            </>))}
            </section>
        </ThemeMain>
    </div>
  )
}
