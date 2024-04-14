import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    onSubmit: (e: any) => void,
    method?: string,
    extraClassName?: string
}

export default function Form(props: IProps) {
  return (
    <form className={'bg-slate-800 text-white flex w-[500px] mt-5 text-xl self-center flex-col gap-3 p-5 rounded ' + props.extraClassName} 
        onSubmit={props.onSubmit} 
        method={props.method}>
        {props.children}
    </form>
  )
}
