import React, {
  ReactNode,
  useState,
  Children,
  ReactElement,
  isValidElement,
  useMemo,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { css } from "@emotion/react";
import { throttle, debounce } from "lodash";

type ContainerPropsType = {
  currentStep: number;
  duration: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
};

type StepPropsType = {
  children: ReactNode;
};

type IndicatorPropsType = {
  totalStep: number;
  currentStep: number;
  duration: number;
};

export type setConditionType = (currentStep: number) => conditionType;

type conditionType = {
  maintain: boolean;
  immediate: boolean;
};

const useContainer = ({
  init,
  duration,
}: {
  init: number;
  duration: number;
}) => {
  const [step, setStep] = useState(init);
  const [completeStep, setCompleteStep] = useState(init);

  useEffect(() => {
    setTimeout(() => {
      setCompleteStep(() => step);
    }, duration);
  }, [step]);

  const setStepHandler = throttle((param: any) => {
    if (step === completeStep) {
      setStep(param);
    }
  }, duration);

  const setCondition = (currentStep: number): conditionType => {
    const condition = {
      maintain: currentStep === step || currentStep === completeStep,
      immediate: currentStep === step,
    };

    return condition;
  };

  return [step, completeStep, setStepHandler, setCondition] as const;
};

const Container = ({
  currentStep,
  setStep,
  duration,
  children,
}: ContainerPropsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [completeStep, setCompleteStep] = useState(currentStep);

  useEffect(() => {
    setTimeout(() => {
      setCompleteStep(() => currentStep);
    }, duration);
  }, [currentStep]);

  const onScrollHandler = throttle((e: React.WheelEvent<HTMLDivElement>) => {
    console.log(containerRef);
    const last = validChildren && validChildren.length;
    if (containerRef.current) {
      if (e.deltaY > 0 && currentStep < Number(last)) {
        if (
          containerRef.current.clientHeight >=
            containerRef.current.scrollHeight ||
          containerRef.current.scrollHeight <=
            containerRef.current.clientHeight + containerRef.current.scrollTop
        ) {
          setStep((prev) => prev + 1);
        }
      } else if (e.deltaY < 0 && currentStep > 1) {
        if (
          containerRef.current.clientHeight >=
            containerRef.current.scrollHeight ||
          containerRef.current.scrollTop === 0
        ) {
          setStep((prev) => prev - 1);
        }
      }
    }
  }, duration);

  const validChildren =
    children &&
    (Children.toArray(children) as Array<ReactElement<StepPropsType>>);

  const render =
    validChildren &&
    useMemo(
      () =>
        validChildren.map((el, idx) => {
          if (
            (idx + 1 === currentStep - 1 && completeStep <= currentStep) ||
            idx + 1 === currentStep ||
            (idx + 1 === currentStep + 1 && completeStep >= currentStep)
          ) {
            return (
              <div
                id={`container-${idx + 1}`}
                onWheel={onScrollHandler}
                key={`step-${idx + 1}`}
                ref={currentStep === idx + 1 ? containerRef : null}
                css={stepComponentCSS({
                  step: currentStep,
                  targetStep: idx + 1,
                  duration,
                })}
              >
                {el.props.children}
              </div>
            );
          }
        }),
      [validChildren]
    );

  return (
    <div css={containerWrapperCSS}>
      <Indicator
        totalStep={validChildren ? validChildren.length : 0}
        currentStep={currentStep}
        duration={duration}
      />
      {render}
    </div>
  );
};

const Indicator = ({
  currentStep,
  totalStep,
  duration,
}: IndicatorPropsType) => {
  return (
    <div css={indicatorWrapperCSS({ totalStep })}>
      <div css={indicatorCSS({ totalStep, currentStep, duration })} />
    </div>
  );
};

export const Step = ({ children }: StepPropsType) => {
  return <>{children}</>;
};

const containerWrapperCSS = css`
  position: relative;
  overflow-y: hidden;
  max-height: 100vh;
  min-height: 100vh;
`;

const stepComponentCSS = ({
  step,
  targetStep,
  duration,
}: {
  step: number;
  targetStep: number;
  duration: number;
}) => {
  return css`
    position: absolute;
    min-height: 100vh;
    max-height: 100vh;
    min-width: 100%;
    max-width: 100%;
    transition-duration: ${duration}ms;
    transition-property: all;
    overflow-y: scroll;
    /* transform: translateY(calc(-100% * ${step - targetStep})); */
    transform: ${step - 1 === targetStep
      ? `translateY(-100%)`
      : `translateY(0%)`};
    z-index: ${step - targetStep};
    transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */

    & ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 오페라, 엣지 */
    }
  `;
};

const indicatorWrapperCSS = ({ totalStep }: { totalStep: number }) => {
  return css`
    position: fixed;
    z-index: ${totalStep + 1};
    width: 4px;
    height: ${48 * totalStep}px;
    background-color: rgba(255, 255, 255, 0.4);
    mix-blend-mode: exclusion;
    left: 5vw;
    top: calc(50vh - (${48 * totalStep}px / 2));
  `;
};

const indicatorCSS = ({
  totalStep,
  currentStep,
  duration,
}: {
  totalStep: number;
  currentStep: number;
  duration: number;
}) => {
  return css`
    width: 100%;
    height: 48px;
    position: absolute;
    background-color: rgba(255, 255, 255, 1);

    transition-property: transform;
    transition-duration: ${duration}ms;
    mix-blend-mode: color;
    transform: translateY(calc(48px * ${currentStep - 1}));
  `;
};

Container.Step = Step;
export { useContainer, Container };
