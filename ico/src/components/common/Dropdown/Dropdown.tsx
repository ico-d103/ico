import React, { useState, useEffect } from 'react'
import { css } from "@emotion/react"


type DropdownProps = {
    compState: any
    closeComp: any
    element: {name:string, content: any, label: string, function: Function}[],
    height: string
    width: string
    align?: 'left' | 'right'
}

function Dropdown({compState, closeComp, element, height, width, align}: DropdownProps) {
    const [dropState, setDropState] = useState<boolean>(false)
    
    useEffect(() => {
        if (compState) {
            setDropState(() => compState)
        } else {
            setTimeout(() => {
                setDropState(() => compState)
                closeComp()
            }, 300)
        }
        
    }, [compState])


    const dropdownHandler = () => {
        closeComp()
    }

    useEffect(() => {
        if (compState) {
          window.addEventListener("mouseup", dropdownHandler);
        } else {
          window.removeEventListener("mouseup", dropdownHandler);
        }
      }, [compState]);


    const renderDropdown = element.map((el, idx) => {

        return (
            <div css={dropdownIndividualCSS({height})} onClick={(event) => {el.function(); dropdownHandler();}}>
                {el.content}
                {el.label}
            </div>
        )

        
    })

    return (
        <div onClick={(event) => {event.stopPropagation()}} css={dropdownWrapperCSS({compState, dropState, width, height, listCount: element.length, align})}>
            {dropState && renderDropdown}
        </div>
    )
    // if (dropState) {
    //     return (
    //         <div css={dropdownWrapperCSS({dropState, perHeight, listCount: element.length})}>
    //             fswfewfsfesfseadfvfasd
    //         </div>
    //       )
    // } else {
    //     return (
    //         <React.Fragment/>
    //     )
    // }
  
}

const dropdownWrapperCSS = ({compState, dropState, width, height, listCount, align}: {compState: boolean, dropState: boolean, width: string, height: string, listCount: number, align: undefined | 'left' | 'right'}) => {

    return css`
        width: ${width};
        height: ${compState ? `calc(${height} * ${listCount})` : '0px'};
        transition-property: height;
        transition-duration: 0.3s;
        box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        border-radius: 10px;
        position: absolute;
        background-color: var(--common-back-color-2);
        ${align ? align : 'left'}: 0;
        top: 0;
    `
}

const dropdownIndividualCSS = ({height}: {height: string}) => {
    return css`
        height: ${height};
        display: flex;
        padding-left: 24px;
        align-items: center;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: 0.3s;
        font-weight: 500;
        &:hover {
            background-color: rgba(0,0,0,0.05);
        }
    `
}

export default Dropdown