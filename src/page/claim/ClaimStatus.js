import React from 'react'

import PostMain from '../../component/post/PostMain'
import useClient from '../../hook/useClient'
import useSplit from '../../hook/useSplit'

export default function ClaimStatus() {
  const [splitstaticthree, setsplitstaticthree] = useSplit(3)
  const [clientstatic, setclientstatic] = useClient({
          from: `claim`,
          select: `*`,
          order: [`claimid`, { ascending: false }],
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
                  postmainid: `claimaddress`, 
                  postmainindex: 1}} />
            </section>
        </main>
    </div>
  )
}
