import React from 'react'

export default function ChipMain({children}) {
  return (
    <div>
        <main className="">
            <section className="rounded-3xl overflow-hidden">
                {children}
            </section>
        </main>
    </div>
  )
}
