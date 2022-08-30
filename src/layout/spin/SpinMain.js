import React from 'react'
import {ImSpinner} from 'react-icons/im'
import {FaSpinner} from 'react-icons/fa'
import { RiLoader2Line, RiLoaderLine, RiMastercardFill, RiMastercardLine } from 'react-icons/ri'

export default function SpinMain() {
  return (
    <div>
        <main className="">
            <section className="animate-ping">
                {/* <div className="w-[50px] h-[50px]  border dark:border-slate-700 dark:border-r-slate-300 animate-spin rounded-full" /> */}
                <RiLoader2Line className="text-3xl animate-spin" />
            </section>
        </main>
    </div>
  )
}
