import React from 'react'

export default function ChipMain({children, chipmainstyle}) {
  return (
    <div>
        <main className="">
            <section className={`rounded-3xl overflow-hidden ${chipmainstyle}`}>
                {children}
            </section>
        </main>
    </div>
  )
}
