import { SerializedStyles, css } from "@emotion/react";
import React, {useState, useEffect} from 'react'

type TranslatePropsType = {
  id: string;
  trigger?: boolean;
  duration: number;
  delay: number;
  offset: [string, string];
  option?: {
    opacityFrom?: string;
    opacityTo?: string;
    hasReverse?: boolean;
  };
};

type RotatePropsType = {
  id: string;
  trigger?: boolean;
  duration: number;
  delay: number;
  offset: string;
  option?: {
    hasReverse?: boolean;
  };
};

const Translate = ({
  id = "translate",
  trigger = true,
  duration,
  delay,
  offset,
  option = {
    opacityFrom: "0%",
    opacityTo: "100%",
    hasReverse: false,
  },
}: TranslatePropsType): SerializedStyles => {
  if (trigger) {
    return css`

      animation: ${id}-translate ${duration}ms ease forwards;
      animation-delay: ${delay}ms;
      -webkit-animation-delay: ${delay}ms;
      opacity: ${option.opacityFrom};
      transform: translate(${offset[0]}, ${offset[1]});
      @keyframes ${id}-translate {
        from {
          opacity: ${option.opacityFrom};
          transform: translate(${offset[0]}, ${offset[1]});
          visibility: visible;
        }

        to {
          opacity: ${option.opacityTo};
          transform: translate(0px, 0px);
          visibility: visible;
        }
      }
    `;
  } else if (option.hasReverse) {
    return css`
    
      animation: ${id}-reverse-translate ${duration}ms ease forwards;
      /* -webkit-animation-delay: ${delay}ms; */
      opacity: ${option.opacityTo};

      @keyframes ${id}-reverse-translate {
        from {
          opacity: ${option.opacityTo};
          transform: translate(0px, 0px);
          visibility: visible;
        }

        to {
          opacity: ${option.opacityFrom};
          transform: translate(${offset[0]}, ${offset[1]});
        }
      }
    `;
  } else {
    return css`
      opacity: ${option.opacityFrom};
    `;
  }
};

const Rotate = ({
  id = "rotate",
  trigger = true,
  duration,
  delay,
  offset,
  option = {
    hasReverse: false,
  },
}: RotatePropsType): SerializedStyles => {
  if (trigger) {
    return css`
      animation: ${id}-rotate ${duration}ms ease forwards;
      animation-delay: ${delay}ms;
      -webkit-animation-delay: ${delay}ms;

      @keyframes ${id}-rotate {
        from {
        }

        to {
          transform: rotate(${offset});
        }
      }
    `;
  } else if (option.hasReverse) {
    return css`
      animation: ${id}-reverse-rotate ${duration}ms ease forwards;
      /* -webkit-animation-delay: ${delay}ms; */

      @keyframes ${id}-reverse-rotate {
        from {
          transform: rotate(${offset});
        }

        to {
        }
      }
    `;
  } else {
    return css``;
  }
};





function useAnimator(condition: boolean) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (condition === true) {
      setRender(() => true);
    }
  }, [condition]);

  const Animator = {
    Translate,
    Rotate,
  };
  return {Animator, render}
}

export default useAnimator
// export default Animator;
