import React, { useContext } from 'react'

import FieldMain from '../../component/field/FieldMain'
import { Context } from '../../context/Context'

export default function AuthForm() {
  const { 
    tabmainstate,

} = useContext(Context)

  return (
    <div>
      <main className="">
        <section className="">
           {tabmainstate?.tabmainindex === 0 && (<>
                <FieldMain fieldmainstatic={{
                    fieldmainid: `authform`,
                    fieldmainindex: 0,
                }} />
                </>)}
                {tabmainstate?.tabmainindex === 1 && (<>
                <FieldMain fieldmainstatic={{
                    fieldmainid: `authform`,
                    fieldmainindex: 1,
                }} />
                </>)}
        </section>
      </main>
    </div>
  )
}
