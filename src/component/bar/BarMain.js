import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {RiMenu2Line} from 'react-icons/ri'

import { appmainul } from '../../content/content'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import PostMain from '../post/PostMain'
import { Context } from '../../context/Context'

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
        if(location.pathname.includes(`index`)){
            setbarmainstate({
                barmainid: `apptfoot`,
                barmainindex: 1,
            })
        }
    }, [location])

    useEffect(() => {
      for(const data of appmainul){
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
                return appTfootRenderTwo()
            }
        },
    ]

    const barmain = [
        {
            barmainid: `apptfoot`,
            barmainref: apptfoot,
        }
    ]

    const [appstatic, setappstatic] = useApp(barmain, barmainstate.barmainid,  barmainstate.barmainindex, messagedl)
    
    if(auth === null) return null

  return (
    <div>
        <main className="">
                {appstatic?.map(data => (
                    data?.barmainrender()
                    ))}
        </main>
    </div>
  )
}

export function appTfootRender({data, datatwo}) {
  return (
    <div>
        <section className="flex flex-row items-center justify-between">
        <CardMain>
            <RiMenu2Line />
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

export function appTfootRenderTwo() {
  return (
    <div>
        <Link to={-1}>
        <CardMain>
        <p className="m-h6">←</p>
        </CardMain>
        </Link>
    </div>
  )
}
