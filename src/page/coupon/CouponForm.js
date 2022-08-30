import React from 'react'

import FieldMain from '../../component/field/FieldMain'
import BreadMain from '../../component/bread/BreadMain'


export default function CouponForm() {
  return (
    <div>
        <main className="">
          <section className="">
            <BreadMain />
          </section>
            <section className="">
              <FieldMain fieldmainstatic={{
                fieldmainid: `couponform`,
                fieldmainindex: 0,
              }}
              />
            </section>
        </main>
    </div>
  )
}
