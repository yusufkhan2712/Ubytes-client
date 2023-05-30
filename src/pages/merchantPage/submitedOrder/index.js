import { withRouter } from "react-router-dom";
import Header from "./header";
import pickupImg from "../../../assets/imgs/checkout-pick-up.png"
import "./style.scss"
const SubmitedPickupOrder = () => {
  return (
    <div className="checkout-wrapper">
      <Header />
      <div className="order-confirmed-container">
        <div className="image-container" style={{backgroundImage: `url(${pickupImg})`}}/>
        <div className="content">
          <h4>Your order is confirmed!</h4>
          <div className="message">
            <p>we'll deliver your order immediately,</p>
            <p>make sure your order put on the doorstep</p>
          </div>
          <div className="pickup-time">
            order will be delivered in 45 minutes
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SubmitedPickupOrder);
