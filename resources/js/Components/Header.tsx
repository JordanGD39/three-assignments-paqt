import { Link } from '@inertiajs/react'
import React from 'react'
import HeaderLink from './HeaderLink'

export default function Header() {
  return (
    <div className='w-full h-20 bg-slate-800 flex items-center justify-center gap-5'>
        <HeaderLink href='/'>FizzBuzz</HeaderLink>
        <HeaderLink routeName='divideCollect'>Divide and collect</HeaderLink>
        <HeaderLink routeName='mondaysPeriod'>Mondays in a period</HeaderLink>
    </div>
  )
}
