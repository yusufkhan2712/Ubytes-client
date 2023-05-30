import { cart } from "../../../../basketActions";
import "./style.scss";
const PickupFrom = ({ setshowarea, showarea, pincode, delivery }) => {
  return (
    <div className="PickupFrom-container" onClick={() => setshowarea(true)}>
      <h4 className="title">{delivery ? "Delivery To" : "Pickup from"}</h4>
      <div className="main-content">
        <div className="content">
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="fill-primary"
              style={{ width: 20, height: 20 }}
            >
              <path d="M49.6 95c-3.3 0-5.4-2.4-6.5-3.6l-.3-.4c-.3-.3-6.9-7.4-13.3-17.2C21 60.9 16.6 49.5 16.6 39.9c0-19.1 14.5-34 33-34s33 14.9 33 34c0 9.6-4.3 21-12.9 33.9-6.4 9.8-13 16.9-13.3 17.2l-.3.3C55 92.6 52.9 95 49.6 95zm0-79.1c-12.9 0-23 10.5-23 24 0 7.5 3.9 17.3 11.2 28.4 5 7.6 10.2 13.5 11.8 15.3 1.6-1.8 6.7-7.6 11.8-15.3 7.3-11.1 11.2-20.9 11.2-28.4 0-13.5-10.1-24-23-24z" />
              <ellipse cx="49.6" cy="38.4" rx="8.5" ry="8.6" />
            </svg>
          </div>
          <div className="branch-infos">
            <small className="name">
              {showarea ? showarea + " - " : "Select Address"} {pincode}
            </small>
            <br />
            <small className="desc">{cart().address}</small>
          </div>
        </div>
        <span className="change-container"></span>
      </div>
      {/**/}
    </div>
  );
};

export default PickupFrom;
