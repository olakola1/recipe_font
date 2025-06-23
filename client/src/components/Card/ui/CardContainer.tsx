import style from './style.module.scss'
import {ReactNode} from "react";

interface IProps {
    children: ReactNode
}

export const CardContainer = ({children} : IProps) => {

    return (
        <div className={style.container_card}>
            {children}
        </div>
    )
}