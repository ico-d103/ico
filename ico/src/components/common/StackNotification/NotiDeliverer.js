import React, { useEffect } from "react";
import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useSelector, useDispatch } from "react-redux";

const NotiDeliverer = (props) => {
  const dispatch = useDispatch();
  const stack = useSelector((state) => state.notificationSlice.stack);

  useEffect(() => {
    let key =
      Object.keys(stack).length !== 0
        ? parseInt(Object.keys(stack)[Object.keys(stack).length - 1]) + 1
        : 0;

    const data = {
      key: key,
      value: {
        content: props.content,
        duration: props.duration,
        width: props.width,
        height: props.height,
        passToFixed: props.passToFixed ? props.passToFixed : false,
      },
    };
    dispatch(notificationSliceActions.push(data));
    props.stateHandler(false);
  }, []);

  return;
  // return (
  //   <React.Fragment>

  //   </React.Fragment>
  // )
};

export default NotiDeliverer;
