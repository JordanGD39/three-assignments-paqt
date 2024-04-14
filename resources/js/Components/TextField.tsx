import React from 'react'

interface IProps {
  id: string
  type?: string
  onChange?: (e: any) => void
  value?: string | number
  extraClassName?: string
}

export default function TextField(props: IProps) {
  return (
    <input type={props.type || "text"} id={props.id} onChange={props.onChange} value={props.value} 
        className={'block border-2 focus:border-sky-400 bg-slate-900 border-sky-500 rounded ' + props.extraClassName}/>
  )
}