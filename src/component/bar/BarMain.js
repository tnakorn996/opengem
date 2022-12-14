import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {RiMenu2Line} from 'react-icons/ri'

import { appul } from '../../content/content'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ThemeMain from '../../layout/theme/ThemeMain'
import PostMain from '../post/PostMain'
import DtaMain from '../dta/DtaMain'

export default function BarMain({


}) {
    const { 
        auth, 
        userdl,
        messagedl,
    
    } = useContext(Context)
    const location = useLocation()

    const [barmainstate, setbarmainstate] = useState({
        barmainid: `apptfoot`,
        barmainindex: 0,
    })
    const [barmaintitle, setbarmaintitle] = useState(``)

    useEffect(() => {
        if(location.pathname.includes(`main`)){
            setbarmainstate({
                barmainid: `apptfoot`,
                barmainindex: 0,
            })
        }
        if(location.pathname.includes(`index`)
        // || location.pathname.includes(`form`)
        // || location.pathname.includes(`status`)
        ){
            setbarmainstate({
                barmainid: `apptfoot`,
                barmainindex: 1,
            })
        }
    }, [location])

    useEffect(() => {
      for(const data of appul){
        if(location.pathname === data.contentaction){
            setbarmaintitle(data.contenttitle)
        } 
      }
    }, [location])
    
    const apptfoot = [
        {
            barmainrender: () => {
                return appTfootRender({
                    data: barmaintitle,
                    datatwo: userdl[0]?.contextdata
                })
            }
        },
        {
            barmainrender: () => {
                return appTfootRenderTwo({
                    data: barmaintitle,
                })
            }
        },
    ]

    const barmain = [
        {
            barmainid: `apptfoot`,
            barmainref: apptfoot,
        }
    ]

    const [appstatic, setappstatic] = useApp(barmain, barmainstate.barmainid,  barmainstate.barmainindex, messagedl, barmaintitle)
    
    if(auth === null) return null

  return (
    <div>
        <main className="">
            <ThemeMain>
            <section className="">
                {appstatic?.map(data => (
                    data?.barmainrender()
                    ))}
            </section>
            </ThemeMain>
        </main>
    </div>
  )
}

export function appTfootRender({data, datatwo}) {
  return (
    <div>
        <section className="flex flex-row items-center justify-between">
        <CardMain>
            <DtaMain
            dtamaindata={{dtamainhref: `/app/appmain`}} 
            dtamainstatic={{dtamainid: `appdframe`, dtamainindex: 0}} >
            <RiMenu2Line />
            </DtaMain>
        </CardMain>
        <CardMain>
            {data}
        </CardMain>
        <CardMain>
            <PostMain postmaindata={datatwo} postmainstatic={{postmainid: `useraddress`, postmainindex: 0}} />
        </CardMain>
        </section>
    </div>
  )
}

export function appTfootRenderTwo({data}) {
  return (
    <div>
        <section className="flex flex-row items-center justify-between">
        <Link to={-1}>
        <CardMain>
        <p className="m-h6">???</p>
        </CardMain>
        </Link>
        <CardMain>
            {data}
        </CardMain>
        </section>
    </div>
  )
}
