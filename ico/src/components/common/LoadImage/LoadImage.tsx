import React, {useState} from "react"
import Image from "next/image"
import { css } from "@emotion/react"

type LoadImageProps = {
	src: string
	alt: string
	customCSS?: any
    skeletonCSS?: any
    useSkeleton?: boolean;
    dev?: boolean;
}

function LoadImage({ src, alt, customCSS, useSkeleton, skeletonCSS, dev }: LoadImageProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
	return (
        <div className={'image-wrapper'} css={[customCSS, imageWrapperCSS({isLoading, dev})]}>
                {useSkeleton &&
                    <div css={[skeletonCSS, skeletonInitCSS({isLoading})]}/>
                }
                {/* <Image
                    css={[imageCss, imageCSS({isLoading, dev})]}
                    src={src}
                    alt={alt}
                    sizes={sizes}
                    priority={true}
                    fill
                    // objectFit="contain"
                    // objectPosition="center"
                    
                    onLoad={() => {setIsLoading(() => false)}}
                /> */}
                <img
                    css={[imageCSS({isLoading, dev})]}
                    src={src}
                    alt={alt}     
                    onLoad={() => {setIsLoading(() => false)}}
                />
   
            
        </div>
		
	)
}

const imageWrapperCSS = ({isLoading, dev}: {isLoading: boolean, dev?: boolean}) => {
    return css`
        position: relative;
        overflow: hidden;
        background-color: ${dev && 'blue'};
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
        /* object-fit: cover; */

        width: 100%;
        height: auto;
        
    `
}

export default LoadImage
