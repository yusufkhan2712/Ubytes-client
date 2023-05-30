import {withRouter} from "react-router-dom"
import BackArrow from "../../../assets/icons/back-arrow.png";

const Header = ({history}) => {
  return (
    <div className="checkout-header-banner">
      <img
        onClick={() => history.goBack()}
        src={BackArrow}
        alt="back icon"
        className="bkicn"
      />
      <div className="checkout-header">Your Order</div>
    </div>
  );
};

export default withRouter(Header);
