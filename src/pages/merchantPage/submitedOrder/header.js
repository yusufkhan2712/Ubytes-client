import { withRouter } from "react-router-dom";
import BackArrow from "../../../assets/icons/back-arrow.png";

const Header = ({ history, match }) => {
  const goBack = () => {
    const { path } = match;
    const arr = path.split("/");
    history.push(`/${arr[1]}/delivery`);
  };
  return (
    <div className="checkout-header-banner">
      <img onClick={goBack} src={BackArrow} alt="back icon" className="bkicn" />
      <div className="checkout-header">Your Order</div>
    </div>
  );
};

export default withRouter(Header);
