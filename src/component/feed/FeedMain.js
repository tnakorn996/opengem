import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { appul, checkul, claimul, sortul } from '../../content/content'
import { Context } from '../../context/Context'
import useApp from '../../hook/useApp'
import CardMain from '../../layout/card/CardMain'
import ThemeMainTwo from '../../layout/theme/ThemeMainTwo'
import PostMain from '../post/PostMain'

export default function FeedMain({
    feedmainstatic,

}) {
    const {

        coupondl,
        messagedl,
        notificationdl,

    } = useContext(Context)

    const apparea = [
        {
            feedmainrender: () => { 
                return appul?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `appaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]


    const couponarea = [
        {
            feedmaintitle: `My coupons`,
            feedmainrender: () => { 
                return coupondl[0]?.contextdata?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `couponaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
        {
            feedmaintitle: `My archive`,
            feedmainrender: () => { 
                return coupondl[0]?.contextdata?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `couponaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]

     const filterarea = [
        {
            // feedmaintitle: `My coupons`,
            feedmainrender: () => { 
                const concat = claimul.concat(checkul)
                return concat?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `filteraddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]

    const sortarea = [
        {
            feedmainrender: () => { 
                return sortul?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `sortaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]

    const notificationarea = [
        {
            feedmaintitle: `New update`,
            feedmainrender: () => { 
                if(typeof notificationdl[0]?.contextdata() === 'undefined') return null
                // console.log(' notificationdl[0]?.contextdata()',  notificationdl[0]?.contextdata())
                const filter =  notificationdl[0]?.contextdata()?.filter(data => data.contextrender().bool === true)
                return filter?.map((data, index) => (<>
                <ThemeMainTwo>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `notificationaddress`, postmainindex: 0}} />
                </ThemeMainTwo>
                </>)) 
            }
        },
        {
            feedmaintitle: `All update`,
            feedmainrender: () => { 
                if(typeof notificationdl[0]?.contextdata() === 'undefined') return null
                // console.log(' notificationdl[0]?.contextdata()',  notificationdl[0]?.contextdata())
                const filter =  notificationdl[0]?.contextdata()?.filter(data => data.contextrender().bool === false)
                return filter?.map((data, index) => (<>
                <PostMain key={index} postmaindata={data} postmainstatic={{postmainid: `notificationaddress`, postmainindex: 0}} />
                </>)) 
            }
        },
    ]

    const feedmain = [
        {
            feedmainid: `apparea`,
            feedmainref: apparea,
        },
        {
            feedmainid: `couponarea`,
            feedmainref: couponarea,
        },
        {
            feedmainid: `filterarea`,
            feedmainref: filterarea,
        },
        {
            feedmainid: `sortarea`,
            feedmainref: sortarea,
        },
        {
            feedmainid: `notificationarea`,
            feedmainref: notificationarea,
        },
    ]

    const [appstatic, setappstatic] = useApp(feedmain, feedmainstatic.feedmainid, feedmainstatic.feedmainindex, 
        messagedl, notificationdl)

  return (
    <div>
        <main className="">
            {appstatic?.map((data, index) => (<>
            
            <section key={index} className="">
            {data?.feedmainrender()?.length > 0 && (<>
            <figcaption className="">
                <CardMain>
                <p className="m-h5">{data?.feedmaintitle}</p>
                </CardMain>
            </figcaption>
            
            <figure key={index} className="">
                {data?.feedmainrender()}
            </figure>
            </>)}
            </section>

            </>))}
        </main>
    </div>
  )
}
