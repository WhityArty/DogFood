import cn from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import './index.css'


export const Modal = ({ children, activeModal, setActiveModal }) => {
// const [active, setActive] = useState(false);

useEffect(()=>{
  // setActive(true);
  // setActiveModal(false);
},[]);

  return (
    <div className={cn('modal', {['active']: activeModal})} onClick={()=>{}}>
      <div className={cn('modal_content', {['active']: activeModal})} onClick={e=> e.stopPropagation()}>{children}</div>
    </div>
  );
};
