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
import { useRouter } from "next/router";

type ContainerPropsType = {
  steps: number[];
  duration: number;
  setStep: (value: number) => void;
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
  const [steps, setSteps] = useState([0, 0, 0]);
  const [reserveStep, setReserveStep] = useState(init);
  const [completeStep, setCompleteStep] = useState(init);
  const [isReady, setIsReady] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/") {
      setReserveStep(() => init);
    } else {
      const init = Number(router.asPath.split("#")[1]);
      setReserveStep(() => init);
    }
  }, []);

  useEffect(() => {
    const hashPath = Number(router.asPath.split("#")[1]);
    if (
      isReady === true &&
      steps[1] === completeStep &&
      reserveStep === 0 &&
      steps[1] !== hashPath
    ) {
      setReserveStep(() => hashPath);
      setIsReady(() => false);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (reserveStep !== 0) {
      const position = steps[1] > reserveStep ? "left" : "right";
      if (position === "left") {
        setSteps(() => [reserveStep, steps[1], steps[2]]);
      } else if (position === "right") {
        setSteps(() => [steps[0], steps[1], reserveStep]);
      }
    }
  }, [reserveStep]);

  useEffect(() => {
    const position = steps[1] > reserveStep ? "left" : "right";
    const reservedContainerIdx = steps.indexOf(reserveStep);
    if (
      reserveStep !== 0 &&
      reservedContainerIdx !== 1 &&
      reservedContainerIdx !== -1
    ) {
      if (position === "left") {
        setTimeout(
          () => setSteps(() => [steps[0] - 1, steps[0], steps[1]]),
          100
        );
      } else if (position === "right") {
        setTimeout(
          () => setSteps(() => [steps[1], steps[2], steps[2] + 1]),
          100
        );
      }
    }

    if (steps[1] === reserveStep) {
      setReserveStep(() => 0);
      setTimeout(() => {
        setCompleteStep(() => steps[1]);
      }, duration);
    }
  }, [steps]);

  useEffect(() => {
    if (
      steps[1] === completeStep &&
      (steps[1] - steps[0] !== 1 || steps[2] - steps[1] !== 1)
    ) {
      setSteps(() => [steps[1] - 1, steps[1], steps[1] + 1]);
    }

    setIsReady(() => true);
    const hashPath = Number(router.asPath.split("#")[1]);

    if (hashPath !== steps[1] && steps[1] === completeStep) {
      setReserveStep(() => hashPath);
    }
  }, [completeStep]);

  const setStepHandler = throttle((value: number) => {
    if (steps[1] === completeStep && isReady === true && reserveStep === 0) {
      router.push(`/#${value}`);
    }
  }, duration);

  const setCondition = (currentStep: number): conditionType => {
    const condition = {
      maintain: currentStep === steps[1] || currentStep === completeStep,
      immediate: currentStep === steps[1],
    };

    return condition;
  };

  return [steps, setStepHandler, setCondition] as const;
};

const Container = ({
  steps,
  setStep,
  duration,
  children,
}: ContainerPropsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [completeStep, setCompleteStep] = useState(steps[1]);

  useEffect(() => {
    setTimeout(() => {
      setCompleteStep(() => steps[1]);
    }, duration);
  }, [steps]);

  const onScrollHandler = throttle((e: React.WheelEvent<HTMLDivElement>) => {
    const last = validChildren && validChildren.length;
    if (containerRef.current && completeStep === steps[1]) {
      if (e.deltaY > 0 && steps[1] < Number(last) - 1) {
        if (
          containerRef.current.clientHeight >=
            containerRef.current.scrollHeight ||
          containerRef.current.scrollHeight <=
            containerRef.current.clientHeight + containerRef.current.scrollTop
        ) {
          setStep(steps[1] + 1);
        }
      } else if (e.deltaY < 0 && steps[1] > 1) {
        if (
          containerRef.current.clientHeight >=
            containerRef.current.scrollHeight ||
          containerRef.current.scrollTop === 0
        ) {
          setStep(steps[1] - 1);
        }
      }
    }
  }, duration);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = throttle(
    (e: React.TouchEvent<HTMLDivElement>) =>
      setTouchEnd(e.targetTouches[0].clientY),
    duration
  );

  const onTouchHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart || !touchEnd) return;
    const deltaY = touchStart - touchEnd;

    const last = validChildren && validChildren.length;
    if (containerRef.current && completeStep === steps[1]) {
      if (
        deltaY > 0 &&
        deltaY > minSwipeDistance &&
        steps[1] < Number(last) - 1
      ) {
        if (
          containerRef.current.clientHeight >=
            containerRef.current.scrollHeight ||
          containerRef.current.scrollHeight <=
            containerRef.current.clientHeight + containerRef.current.scrollTop
        ) {
          setStep(steps[1] + 1);
        }
      } else if (deltaY < 0 && deltaY < -minSwipeDistance && steps[1] > 1) {
        if (
          containerRef.current.clientHeight >=
            containerRef.current.scrollHeight ||
          containerRef.current.scrollTop === 0
        ) {
          setStep(steps[1] - 1);
        }
      }
    }
  };

  const validChildren = children && [
    <div />,
    ...(Children.toArray(children) as Array<ReactElement<StepPropsType>>),
  ];

  const render =
    validChildren &&
    useMemo(
      () =>
        validChildren.map((el, idx) => {
          const valid = steps.indexOf(idx);
          if (valid !== -1) {
            return (
              <div
                id={`container-${idx}`}
                key={`step-${idx}`}
                ref={steps[1] === idx ? containerRef : null}
                css={stepComponentCSS({
                  step: steps[1],
                  validIdx: valid,
                  duration,
                  totalStep: validChildren.length,
                  currentStep: idx + 1,
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
    <div
      onWheel={onScrollHandler}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchHandler}
      css={containerWrapperCSS}
    >
      <Indicator
        totalStep={validChildren ? validChildren.length : 0}
        currentStep={steps[1]}
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
    <div css={indicatorWrapperCSS({ totalStep: totalStep - 1 })}>
      <div
        css={indicatorCSS({ totalStep: totalStep - 1, currentStep, duration })}
      />
    </div>
  );
};

export const Step = ({ children }: StepPropsType) => {
  return <>{children}</>;
};

const containerWrapperCSS = css`
  position: relative;
  overflow-y: hidden;
  max-height: 100%;
  height: 100%;
  min-height: 100%;
`;

const stepComponentCSS = ({
  step,
  validIdx,
  duration,
  totalStep,
  currentStep,
}: {
  step: number;
  validIdx: number;
  duration: number;
  totalStep: number;
  currentStep: number;
}) => {
  return css`
    position: absolute;
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    min-width: 100%;
    width: 100%;
    max-width: 100%;
    transition-duration: ${duration}ms;
    transition-property: all;
    overflow-y: scroll;
    transform: ${validIdx === 0 && `translateY(-100%)`};
    visibility: ${validIdx === 0 && "hidden"};
    /* transform: translateY(calc(100% * ${validIdx - 1})); */
    z-index: ${totalStep - currentStep};
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
