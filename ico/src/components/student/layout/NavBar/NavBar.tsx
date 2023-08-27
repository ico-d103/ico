import React from 'react'
import { NAVBAR_CLASS, NAVBAR_GOVERNMENT, NAVBAR_STORE, NAVBAR_HOME } from "./NavBarIcons"
import { css } from "@emotion/react"
import useMediaQuery from "@/hooks/useMediaQuery"
import NavBarDesktop from './NavBarDesktop'
import NavBarMobile from './NavBarMobile'
import { NAVBAR_ELEMENT, NAVBAR_ROUTES } from '@/constants/StudentMenu'

type NavBarProps = {
    children: any
}

function NavBar({children}: NavBarProps) {
    const isDesktop = useMediaQuery("(min-width: 769px")



    if (isDesktop) {
        return (
            <NavBarDesktop routes={NAVBAR_ROUTES} navBarData={NAVBAR_ELEMENT}>{children}</NavBarDesktop>
          )
    } else {
        return (
            <NavBarMobile routes={NAVBAR_ROUTES} navBarData={NAVBAR_ELEMENT}>{children}</NavBarMobile>
          )
    }
  
}

export default NavBar