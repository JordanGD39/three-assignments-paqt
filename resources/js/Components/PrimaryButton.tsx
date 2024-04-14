import React, { PropsWithChildren } from 'react'

interface IProps extends PropsWithChildren {
    onClick?: () => void,
    type?: "button" | "submit" | "reset"
    extraClassName?: string
}

export default function PrimaryButton(props: IProps) {
  return (
    <button className={'px-5 font-semibold text-l md:text-xl bg-sky-500 hover:bg-sky-400 rounded py-2 cursor-pointer transition ' + props.extraClassName} 
        onClick={props.onClick}
        type={props.type}>
        {props.children}
    </button>
  )
}