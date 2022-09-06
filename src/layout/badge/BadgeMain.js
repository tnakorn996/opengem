import React from 'react'

export default function BadgeMain({children}) {

  return (
    <div>
        <main className="">
          {children && (<>
            <section className="min-w-[25px] min-h-[25px] flex items-center justify-center  text-slate-900 bg-slate-200 shadow-2xl rounded-full">
                {children}
            </section>
          </>)}
        </main>
    </div>
  )
}
