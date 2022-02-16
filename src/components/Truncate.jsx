import React, { useRef } from "react";

import styling from "./Truncate.module.scss";
import { useIsOverflow } from "hooks/useOverflow";

const Truncate = ({ children, className }) => {
  const ref = useRef();
  const isOverflow = useIsOverflow(ref);

  return (
    <div className={`${styling.container} ${className}`} ref={ref}>
      <span className={`${styling.nowrap} ${isOverflow ? styling.text : ""}`}>
        {children}
      </span>
    </div>
  );
};

export default Truncate;
