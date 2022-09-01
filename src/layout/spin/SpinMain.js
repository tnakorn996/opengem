import React from 'react'
import {ImSpinner} from 'react-icons/im'
import {FaSpinner} from 'react-icons/fa'
import { RiLoader2Line, RiLoaderLine, RiMastercardFill, RiMastercardLine } from 'react-icons/ri'

export default function SpinMain() {
  return (
    <div>
        <main className="">
            <section className="">
                <div className="w-[90px] h-[90px]  border-2 dark:border-slate-800 dark:border-r-slate-300 animate-spin rounded-full" />
                {/* <RiLoader2Line className="text-3xl animate-spin" /> */}
            </section>
        </main>
    </div>
  )
}
