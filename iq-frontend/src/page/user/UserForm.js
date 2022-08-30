import React from 'react'

import FieldMain from '../../component/field/FieldMain'

export default function UserForm() {
  return (
    <div>
        <main className="">
            <section className="">
                <FieldMain fieldmainstatic={{
                    fieldmainid: `authform`,
                    fieldmainindex: 2,
                }} />
            </section>
        </main>
    </div>
  )
}