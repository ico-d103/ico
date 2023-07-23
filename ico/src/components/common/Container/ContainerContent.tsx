import React, { ReactNode } from "react";
import { SerializedStyles, css } from "@emotion/react";

type ContainerContentPropsType = {

  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type InnerContentPropsType = {

  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function ContainerContent({ children, ...props }: ContainerContentPropsType) {
  return (
    <div
      css={containerContentWrapperCSS}
      {...props}
    >
      {children}
    </div>
  );
}

function InnerContent({ children, ...props }: InnerContentPropsType) {
  return (
    <div
      css={innerContentWrapperCSS}
      {...props}
    >
      {children}
    </div>
  );
}

const containerContentWrapperCSS = css`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  /* height: 100%; */
  background-color: white;
`;

const innerContentWrapperCSS = css`
  position: absolute;
  z-index: 10;
  min-width: 100%;
  min-height: 100%;
  padding: 10vw 15vw 10vw 15vw;
  /* background-color: blue; */
`;

ContainerContent.Inner = InnerContent;
export default ContainerContent;
