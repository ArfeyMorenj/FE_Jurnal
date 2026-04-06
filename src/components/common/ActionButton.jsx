import React from "react";
import clsx from "clsx";

const ActionButton = ({
  onClick,
  icon: Icon, 
  color = "#AA494E",
  bgColor = "#FFFFFF", 
  hoverBg = "#FFF5F5", 
  size = 17, 
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center", 
        "transition p-1 rounded-[7px] border cursor-pointer",
        className
      )}
      style={{
        borderColor: color,
        color,
        backgroundColor: bgColor,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      {Icon && <Icon size={size} />}
    </button>
  );
};

export default ActionButton;
