import React, {useState} from 'react'
import { css } from "@emotion/react"
import Carousel from '@/components/common/Carousel/Carousel'

function test() {
  const [ content, setContent ] = useState<any>(
    [
      <img src={"/assets/guide/background1.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background2.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background3.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background1.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background2.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background3.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background1.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background2.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background3.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background1.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background2.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background3.jpg"} css={css`width: auto; height: 100%;`}/>,
      <img src={"/assets/guide/background3.jpg"} css={css`width: auto; height: 100%;`}/>,
  ]
  )

  const test = () => {
    setContent((prev: any) => {
      return [...prev, <img src={"/assets/guide/background3.jpg"} css={css`width: auto; height: 100%;`}/>]
    })
  }

  const post = <div>pfrgjerhslghfsjhflawfhlgesvfd</div>

  return (
    <div>
        <Carousel content={[...content, post]} identifier={'shop'} css={css`width: 100vw; height: 50vh; overflow: hidden;`} scrollToRecent={true} />
        <button onClick={test}>dwfewfe</button>
    </div>
  )
}

export default test