import classNames from "classnames";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const CustomTypewriter = ({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
  loop = 1,
  cursor = false,
  className = "text-cyan-400",
}) => {
  return (
    <span className={classNames(className)}>
      <Typewriter
        words={words}
        typeSpeed={typeSpeed}
        deleteSpeed={deleteSpeed}
        delaySpeed={delaySpeed}
        loop={loop}
        cursor={cursor}
      />
    </span>
  );
};

export default CustomTypewriter;
