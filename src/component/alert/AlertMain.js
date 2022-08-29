import React, { useContext, useState } from 'react'
import { RiCheckboxCircleLine, RiCheckDoubleLine, RiCheckLine, RiInformationLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ChipMain from '../../layout/chip/ChipMain'

export default function AlertMain({
  alertmaindata,
  alertmainstatic,

}) {
  const { 
  
  } = useContext(Context)

  function alertMainAction(first){
      if(first.alertmainstatus.includes(`error`)){
        return {
          icon: <RiInformationLine />,
          style: `!bg-red-200 !text-red-900`,
          data: first
        }
      }
      if(first.alertmainstatus.includes(`success`)){
        return {
          icon: <RiCheckboxCircleLine />,
          style: `!bg-green-200 !text-green-900`,
          data: first
        }
      }
  }

    function alertMainActionTwo(first){
      if(first.alertmainstatus.includes(`error`)){
        return {
          icon: <RiInformationLine />,
          style: `!text-red-300`,
          data: first
        }
      }
      if(first.alertmainstatus.includes(`success`)){
        return {
          icon: <RiCheckboxCircleLine />,
          style: `!text-green-300`,
          data: first
        }
      }
  }

  const claimcaption = [
    {
      alertmainrender: () => {
        if(alertmaindata.length > 0) {
          return appCaptionRender({
            data: alertMainAction({
                alertmainstatus: `error`,
                alertmaintitle: `This voulcher is unavaible for use`,
                alertmaindata: [{alertmainsubtitle: `The customer has yet already used their voucher.`}] 
            }) 
          })
        } 
        if(alertmaindata.length === 0) {
           return appCaptionRender({
            data: alertMainAction({
                alertmainstatus: `success`,
                alertmaintitle: `This voulcher is avaible for use`,
                alertmaindata: [{alertmainsubtitle: `The customer has't yet used their voucher.`}] 
            }) 
          })
        }
      }
    },
    {
      alertmainrender: () => {
        if(alertmaindata.length > 0) {
          return appCaptionRenderTwo({
            data: alertMainActionTwo({
              alertmainstatus: `success`,
              alertmaintitle: `Voucher claimed`,
              alertmaindata: [{alertmainsubtitle: `The customer has claimed their voucher.`}] 
            }) 
          })
        }
      }
    }
  ]

  const alertmain = [
    {
      alertmainid: `claimcaption`,
      alertmainref: claimcaption,
    }
  ]

  const [appstatic, setappstatic] = useApp(alertmain, alertmainstatic.alertmainid, alertmainstatic.alertmainindex, alertmaindata)

  // console.log('alertmaindata', alertmaindata)
  // if(typeof alertmaindata === 'undefined') return alert(`message`)

  return (
    <div>
        <main className="">
            <section className="">
              {appstatic?.map(data => (<>
                {data?.alertmainrender()}
              </>))}
            </section>
        </main>
    </div>
  )
}

export function appCaptionRender({data}) {
  // console.log('data', data)
  return (
    <div>
      <CardMain>
      <ChipMain>
      <section className={data.style}>
          <div className="flex flex-row items-center">
          {/* <CardMain >
          <figure className="">
            <p className="text-2xl">{data.icon}</p>
          </figure>
          </CardMain> */}
          <figcaption className="">
            <CardMain>
            <h1 className="m-h4">{data?.data.alertmaintitle}</h1>
            {/* {data.data.alertmaindata?.map(data => (<>
            <p className="font-light">{data.alertmainsubtitle}</p>
            </>))} */}
            </CardMain>
          </figcaption>
          </div>
      </section>
      </ChipMain>
      </CardMain>
    </div>
  )
}

export function appCaptionRenderTwo({data}) {
  // console.log('datsssa', data)
  return (
    <div>
      <main className="">
      <section className={data.style}>
          <div className="h-[80vh] flex flex-col justify-center text-center items-center">
          <CardMain >
          <figure className="">
            <p className="text-8xl">{data.icon}</p>
          </figure>
          </CardMain>
          <figcaption className="">
            <h1 className="text-2xl  m-h4">{data?.data.alertmaintitle}</h1>
            {/* {data.data.alertmaindata?.map(data => (<>
            <p className="font-light">{data.alertmainsubtitle}</p>
          </>))} */}
            {/* <CardMain>
            <Link to={-1}>
            <button className="m-button">Continue</button>
            </Link>
            </CardMain> */}
          </figcaption>
          </div>
      </section>
      </main>
    </div>
  )
}
