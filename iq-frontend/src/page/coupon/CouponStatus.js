import React from 'react'

import PostMain from '../../component/post/PostMain'
import useClient from '../../hook/useClient'
import useSplit from '../../hook/useSplit'

export default function CouponStatus() {
  const [splitstaticthree, setsplitstaticthree] = useSplit(3)
  const [clientstatic, setclientstatic] = useClient({
          from: `coupon`,
          select: `*`,
          order: [`couponid`, { ascending: false }],
          eq: ['couponid', splitstaticthree],
          limit: 1,
  })

  if(typeof clientstatic === 'undefined') return null

  return (
    <div>
        <main className="">
            <section className="">
                <PostMain 
                postmaindata={clientstatic && clientstatic}
                postmainstatic={{
                  postmainid: `couponaddress`, 
                  postmainindex: 4}} />
            </section>
        </main>
    </div>
  )
}
