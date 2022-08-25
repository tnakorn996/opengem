import React from 'react'

export default function SheetMain({children}) {

  return (
    <div>
        <main className="">
            <section className="border dark:border-slate-700 rounded-3xl">
                {children}
            </section>
        </main>
    </div>
  )
}
