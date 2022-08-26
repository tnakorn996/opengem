import React from 'react'

export default function ThemeMain({children}) {
  return (
    <div>
        <main className="">
            <section className="bg-slate-200 dark:bg-slate-700">
                {children}
            </section>
        </main>
    </div>
  )
}
