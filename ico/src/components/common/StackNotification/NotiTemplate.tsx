import React from "react"
import { css } from "@emotion/react"
import UseAnimations from "react-useanimations";
import alertTriangle from 'react-useanimations/lib/alertTriangle';
import radioButton from 'react-useanimations/lib/radioButton';


function NotiTemplate({type, content}: {type: string; content: string}) {
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
                <div css={css`flex: 1; margin-right: 16px;`}>
                    {content}
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
                <div css={css`flex: 1; margin-right: 16px;`}>
                    {content}
                </div>
                
            </div>
        )
    }
    return data[type]
}

export default NotiTemplate
