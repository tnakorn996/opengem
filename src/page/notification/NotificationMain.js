import React from 'react'
import FeedMain from '../../component/feed/FeedMain'
import FieldMain from '../../component/field/FieldMain'

export default function NotificationMain() {

  return (
    <div>
        <main className="">
            <section className="">
                <FieldMain fieldmainstatic={{fieldmainid: `clickform`, fieldmainindex: 0}} />
                <FeedMain feedmainstatic={{feedmainid: `notificationarea`, feedmainindex: null}} />
            </section>
        </main>
    </div>
  )
}
