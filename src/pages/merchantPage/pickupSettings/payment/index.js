import { useState, useRef } from "react";
import { useOutsideAlerter } from "../../../../hooks";

import "./style.scss";
const Payment = ({paymentMethod, setPaymentMethod}) => {
  const methodsRef = useRef(null);
  const [showMethods, setShowMethods] = useState(false);
  useOutsideAlerter(methodsRef, setShowMethods);

  const chosePaymentMethod = (val)=>{
    setPaymentMethod(val)
    setShowMethods(false)
  }
  return (
    <div className="Payment-container">
      <h4 className="title">Payment</h4>
      <div className="main-content">
        <div className={`content ${paymentMethod ? "":"notselected"}`}  onClick={() => setShowMethods(true)}>
          <div className="icon-container">
            <svg
              data-v-aacc72f2
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-5 h-5 fill-danger"
              style={{ width: 16, height: 16 }}
            >
              <switch>
                <g>
                  <path d="M85.9 15.8H14.1C7.7 15.8 2.5 21 2.5 27.3v45.3c0 6.4 5.2 11.6 11.6 11.6h71.8c6.4 0 11.6-5.2 11.6-11.6V27.3c0-6.3-5.2-11.5-11.6-11.5zm-71.8 6h71.8c3.1 0 5.5 2.5 5.5 5.5v5.2H8.5v-5.2c0-3 2.5-5.5 5.6-5.5zm71.8 56.4H14.1c-3.1 0-5.5-2.5-5.5-5.5V49.2h82.9v23.5c0 3-2.5 5.5-5.6 5.5z" />
                  <path d="M78.3 60c-1.9 0-3.5.9-4.5 2.3-1-1.4-2.7-2.3-4.5-2.3-3.2 0-5.7 2.6-5.7 5.7 0 3.2 2.6 5.7 5.7 5.7 1.9 0 3.5-.9 4.5-2.3 1 1.4 2.7 2.3 4.5 2.3 3.2 0 5.7-2.6 5.7-5.7S81.4 60 78.3 60z" />
                </g>
              </switch>
            </svg>
          </div>
          <div className="branch-infos">
            <small className="name">{paymentMethod ? paymentMethod:"Select Payment Method"}</small>
          </div>
        </div>
        <span className="change-container">Change</span>
      </div>
      {showMethods && (
        <div className="pickup-method-drawer">
          <div className="content" ref={methodsRef}>
            <h4 className="title">Offline Methods</h4>
            <div className="ways">
              <div onClick={()=>chosePaymentMethod("Card on pickup")}>Card on pickup</div>
              <div onClick={()=>chosePaymentMethod("Cash on pickup")}>Cash on pickup</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
