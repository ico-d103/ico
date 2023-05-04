import React, {useState} from "react"
import Image from "next/image"
import { css } from "@emotion/react"

type LoadImageProps = {
	src: string
	alt: string
	wrapperCss?: any
    imageCss?: any
    skeletonCss?: any
    useSkeleton?: boolean;
    dev?: boolean;
}

function LoadImage({ src, alt, wrapperCss, imageCss, useSkeleton, skeletonCss, dev }: LoadImageProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
	return (
        <div className={'image-wrapper'} css={[wrapperCss, imageWrapperCSS({isLoading})]}>
                {useSkeleton &&
                    <div css={[skeletonCss, skeletonInitCSS({isLoading})]}/>
                }
                <Image
                    css={[imageCss, imageCSS({isLoading, dev})]}
                    src={src}
                    alt={alt}
                    priority={true}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    
                    onLoad={() => {setIsLoading(() => false)}}
                />
   
            
        </div>
		
	)
}

const imageWrapperCSS = ({isLoading}: {isLoading: boolean}) => {
    return css`
        position: relative;
        overflow: hidden;
    `
}

const skeletonInitCSS = ({isLoading}: {isLoading: boolean}) => {
    return css`
        transition-property: opacity;
        transition-duration: 0.2s;
        opacity: ${isLoading ? '1000%' : '0%'};
        width: 100%;
        height: 100%;
        background-color: rgba(230, 230, 230, 1);
    `
}


const imageCSS = ({isLoading, dev}: {isLoading: boolean, dev?: boolean}) => {
    return css`
        transition-property: opacity;
        transition-duration: 0.2s;
        opacity: ${isLoading ? '0%' : '100%'};
        border: ${dev && '1px solid red'};
    `
}

export default LoadImage
