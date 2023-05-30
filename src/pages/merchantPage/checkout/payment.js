import { cart } from "../../../basketActions";

const Payment = ({ totalAmount }) => {
  return (
    <div className="checkout-myBucket-wrapper">
      <div className="checkout-myBucket-inner">
        <div className="payment-header">Payment</div>
        <div className="checkout-paymemnt-bill-item">
          <div className="item-tit">Item Total</div>
          <div className="item-cost">INR {totalAmount}</div>
        </div>
        <div className="checkout-paymemnt-bill-item">
          <div className="item-tit">Original Item Total</div>
          <div className="item-cost">INR {totalAmount}</div>
        </div>
        {cart().type === "dine-in" ? null : (
          <div className="checkout-paymemnt-bill-item">
            <div className="item-tit">Delivery Fee</div>
            <div className="item-cost">INR 0</div>
          </div>
        )}
        <hr style={{ border: "2px solid rgb(239, 239, 242)" }} />
        <div className="checkout-paymemnt-bill-item">
          <div className="toPay">To Pay</div>
          <div className="payAmount">INR {totalAmount}</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
