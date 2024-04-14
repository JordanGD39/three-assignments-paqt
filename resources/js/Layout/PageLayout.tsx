import React, { PropsWithChildren } from 'react'
import Header from '../Components/Header'

export default function PageLayout(props: PropsWithChildren) {
  return (
    <div className='text-white bg-slate-900 min-h-full h-max z-0 absolute w-full flex flex-col'>
        <Header />
        {props.children}
    </div>
  )
}
