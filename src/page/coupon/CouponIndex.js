import React, { useEffect } from 'react'
import AlertMain from '../../component/alert/AlertMain'

import PostMain from '../../component/post/PostMain'
import useClient from '../../hook/useClient'
import useSplit from '../../hook/useSplit'

export default function CouponIndex() {
    const [splitstaticthree, setsplitstaticthree] = useSplit(3)
    const [clientstatic, setclientstatic] = useClient({
          // id: 'couponindex',
          from: `coupon`,
          select: `*`,
          order: [`couponid`, { ascending: false }],
          eq: ['couponid', splitstaticthree],
          limit: 1,
  })
  const [clientstatictwo, setclientstatictwo] = useClient({
          // id: 'couponindex',
          from: `claim`,
          select: `*`,
          order: [`claimid`, { ascending: false }],
          eq: ['couponid', splitstaticthree],
          limit: 1,
  })

  if(typeof clientstatic === 'undefined'
  || typeof clientstatictwo === 'undefined') return null

//   console.log('clientstastic && clientstatic', clientstatic && clientstatic)
    
  return (
    <div>
        <main className="">
            <section className="">
                <PostMain 
                postmaindata={clientstatic && clientstatic} 
                postmaindatatwo={clientstatictwo && clientstatictwo} 
                postmainstatic={{postmainid: `couponaddress`, postmainindex: 1}} />
            </section>
        </main>
    </div>
  )
}
