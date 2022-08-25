import React from 'react'

import FeedMain from '../../component/feed/FeedMain'

export default function CouponMain() {

  return (
    <div>
        <main className="">
            <section className="">
                <FeedMain feedmainstatic={{feedmainid: `couponarea`, feedmainindex: 0}} />
                <FeedMain feedmainstatic={{feedmainid: `couponarea`, feedmainindex: 1}} />
            </section>
        </main>
    </div>
  )
}
