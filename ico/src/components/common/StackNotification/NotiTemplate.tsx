import React from "react"
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations";
import alertTriangle from 'react-useanimations/lib/alertTriangle';
import radioButton from 'react-useanimations/lib/radioButton';
import Button from "../Button/Button";


function NotiTemplate({type, content, buttons}: {type: string; content: string; buttons?: {label: string, function: Function}[]}) {
	const renderButtons = (<div css={css`flex: 1; display: flex; gap: 8px; padding-top: 16px;`}>{buttons?.map((el, idx) => {
        return (
            <Button
					text={el.label}
					fontSize={`var(--student-h3)`}
					width={"auto"}
                    cssProps={css`flex: 1; margin-right: 8px;`}
					theme={"cancelDark"}
					onClick={() => {
						el.function()
						
					}}
				/>
        )
    }) }</div>)
    
    const data: {[prop: string]: any} = {
        alert: (
            <div
                css={css`
                    display: flex;
                    align-items: center;
                    width: 100%;
                `}
            >
                <UseAnimations animation={alertTriangle} size={82} />
                <div css={css`flex: 1; margin-right: 16px; display: flex; flex-direction: column;`}>
                    {content}
                    {buttons && renderButtons}
                </div>
                
            </div>
        ),
        ok: (
            <div
                css={css`
                    display: flex;
                    align-items: center;
                    width: 100%;
                    margin-left: 16px;
                `}
            >
                <UseAnimations animation={radioButton} reverse={true} size={48} css={css`margin: 0px 16px 0px 0px;`} />
                <div css={css`flex: 1; margin-right: 16px; display: flex; flex-direction: column;`}>
                    {content}
                    {buttons && renderButtons}

                </div>
                
            </div>
        )
    }
    return data[type]
}

export default NotiTemplate
