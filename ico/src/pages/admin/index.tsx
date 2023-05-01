import React from "react"
import { css } from "@emotion/react"
import Button from "@/components/common/Button/Button";

function index() {
	const dummy: { id: string; name: string; image: string }[] = [
		{
			id: "jook1356",
			name: "김뿡빵",
			image: "https://velog.velcdn.com/images/eddy_song/post/dc0bf670-a3cf-4d53-beff-f81193b48e9d/image.png",
		},
        {
			id: "jook1356a",
			name: "응우옌 꾸억 응우옌",
			image: "https://velog.velcdn.com/images/eddy_song/post/dc0bf670-a3cf-4d53-beff-f81193b48e9d/image.png",
		},
	]


    
    const indivRender = dummy.map((el, idx) => { 
        return (
            <div css={individualCSS}>
                <div css={textWrapperCSS}>
                    {el.id}, {el.name}
                </div>
                <div>
                    <img css={imgCSS} src={el.image}/>
                </div>
                <div css={buttonWrapperCSS}>
                    <Button text={"승인"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"positive"} onClick={() => {}} />
                    <Button text={"반려"} fontSize={`var(--teacher-h5)`} width={"200px"} theme={"warning"} onClick={() => {}} />
                </div>
                
            </div>
        )
    })

	return (
        <div>
            {indivRender}
        </div>
    )
}

const individualCSS = css`
    display: flex;
    align-items: center;
    width: 100vw;
    justify-content: space-between;
    border: 1px solid black;

`

const imgCSS = css`
    max-width: 500px;
    max-height: auto; 
`

const textWrapperCSS = css`
    max-width: 200px;
    width: 200px;
`

const buttonWrapperCSS = css`
    display: flex;
`

export default index
