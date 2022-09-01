import React from 'react'
import FeedMain from '../../component/feed/FeedMain'

export default function AppMain() {
  
  return (
    <div>
        <main className="">
            <section className="">
                <FeedMain feedmainstatic={{feedmainid: `apparea`, feedmainindex: 0}} />
            </section>
        </main>
    </div>
  )
}
