import React from 'react'

export default function ThemeMain({children}) {
  return (
    <div>
        <main className="">
            <section className="bg-white dark:bg-slate-800">
                {children}
            </section>
        </main>
    </div>
  )
}
