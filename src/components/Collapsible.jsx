import React, { useEffect, useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import styles from "./Collapsible.module.scss";

const Collapsible = ({ open, title, children }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState(open ? undefined : 0);
  const [display, setDisplay] = useState('none');
  const collapse = useRef();

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!height || !isOpen || !collapse.current) return undefined;

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });

    resizeObserver.observe(collapse.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) {
        setDisplay('block');
        process.nextTick(() => {
            setHeight(collapse.current?.getBoundingClientRect().height);
        })
    } else {
        setHeight(0);
        setTimeout(() => {
            setDisplay('none');
        }, 200);
    }
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.collapse}>
        <button
          type="button"
          className={styles.button}
          onClick={handleFilterOpening}
        >
          {title}
          <FiChevronDown className={isOpen ? styles.open : ""} />
        </button>
      </div>
      <div className={styles.content} style={{ height, display}}>
        <div ref={collapse}>
          <div className={styles.contentContainer}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Collapsible;
