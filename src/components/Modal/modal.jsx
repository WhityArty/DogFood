import cn from "classnames";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css'
import { ReactComponent as CloseIcon } from "./x.svg";

export const Modal = ({ children, activeModal, setActiveModal }) => {
// const [active, setActive] = useState(false);

useEffect(() => {
  // setActive(true);
  // setActiveModal(false);
  ref.current.addEventListener("keydown", onModalKeyDown);
  document.addEventListener("keydown", onModalKeyDown);
  return ()=> document.removeEventListener('keydown', onModalKeyDown)
}, []);

const navigate = useNavigate();

const onModalKeyDown = (e) => {
  if (e.key === 'Escape') {
    setActiveModal(false);
    navigate('/')
  } 
};

const ref=useRef(null);

return (
  <div
    className={cn("modal", { ["active"]: activeModal })}
    onClick={() => {}}
    ref={ref}>
    <div
      className={cn("modal_content", { ["active"]: activeModal })}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);
};
