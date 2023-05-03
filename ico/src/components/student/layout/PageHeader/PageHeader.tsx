import React, {useEffect, useState} from 'react'
import { css } from "@emotion/react"
import Portal from '@/components/common/Portal/Portal'



function PageHeader() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    const handleScroll = (event: any) => {
       if (window.scrollY === 0) {
        setIsScrolled(() => false)
       } else {
        setIsScrolled(() => true)
       }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { capture: true }); // 스크롤 이벤트 등록
        return () => {
          window.removeEventListener('scroll', handleScroll); 		// 스크롤 이벤트 제거
        };
      }, []);

  return (

      <div css={headerWrapperCSS}>
          fwefwefwef
        </div>

      

      

    
  )
}


const headerWrapperCSS = css`
    /* z-index: 9999999; */
    /* position:fixed; */
    top: 0;
    width: 100%;
    height: 85px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    /* filter: drop-shadow(0px 0px 10px 1px rgba(0, 0, 0, 0.2)); */
`





export default PageHeader