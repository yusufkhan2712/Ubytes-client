import { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Delivery from "./delivery";
import Pickup from "./pickup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BranchPage from "./branchPage";
import ProductPage from "./productPage";
import CheckoutPage from "./checkout";
import PickupSetting from "./pickupSettings";
import SubmitedPickupOrder from "./submitedOrder";

import { makeStyles } from "@material-ui/core/styles";

import "./style.css";
import firestore from "../../firebase";
import { cart } from "../../basketActions";
import DeliverySettings from "./deliveryPage";
import { isWindows } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const MerchantPage = ({ match, history }) => {
  const classes = useStyles();
  const [selectedBranch, setselectedBranch] = useState("");
  const [loading, setloading] = useState(true);
  const [merchant, setmerchant] = useState({ uid: "" });
  const [selectedRoute, setSelectedRoute] = useState();
  const [branches, setbranches] = useState([]);
  const loadMerchant = async () => {
    let merchantid = match.url.split("/")[1];
    let merchant_ = await firestore
      .collection("Merchant")
      .doc(merchantid)
      .get();
    setmerchant(merchant_.data());
    console.log(merchant_.data());
    loadBranches(merchant_.id);
  };
  const loadBranches = async (id) => {
    let br = await firestore
      .collection("Branches")
      .where("merchantId", "==", id)
      .get();
    let branchList = [];
    br.forEach((branch) => {
      if (branch.of === match.url.split("/")[2]) {
        setselectedBranch(branch.data());
      }
      branchList.push(branch.data());
    });

    /* br.forEach((branch) => {
      branchList.push(branch);
    }); */
    console.log(branchList);
    setbranches(branchList);
    setloading(false);
  };
  useEffect(() => {
    loadMerchant();
  }, [match]);

  return (
    <div className="home-wrapper">
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress style={{ width: 30, height: 30 }} color="inherit" />
      </Backdrop>
      {branches?.length > 0 && (
        <>
          {window.location.href.split("/").length <= 5 ? (
            <>
              {" "}
              <div
                className="home-banner"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundImage: `url(${merchant.banner})`,
                }}
              />
              <div className="home-card-wrapper">
                <div className="home-card-inner-wrapper">
                  <h2>{merchant.brandName}</h2>
                  {selectedBranch.branchId && <p>{selectedBranch.address}</p>}
                  {merchant.discount && (
                    <span>Get {merchant.discount}% off your first order</span>
                  )}
                </div>
              </div>
              <div className="small-info">
                <div className="button-row">
                  <button
                    onClick={() => history.push(`${match.url}/pickup`)}
                    style={
                      selectedRoute !== "delivery"
                        ? { color: "black", backgroundColor: "lightgrey" }
                        : {}
                    }
                  >
                    Delivery
                  </button>
                  <button
                    style={
                      selectedRoute !== "pickup"
                        ? { color: "black", backgroundColor: "lightgrey" }
                        : {}
                    }
                    onClick={() => history.push(`${match.url}/pickup`)}
                  >
                    Pickup
                  </button>
                </div>
              </div>
            </>
          ) : null}
          <Switch>
            <Route
              exact
              path={`${match.url}/pickup/:branchId/item/:productId`}
              component={ProductPage}
            />
            <Route
              exact
              path={`${match.url}/dine-in/:branchId/item/:productId`}
              component={ProductPage}
            />
            <Route
              exact
              path={`${match.url}/delivery/:branchId/item/:productId`}
              component={ProductPage}
            />
            <Route
              exact
              path={`${match.url}/delivery/:branchId/item/:productId/edit`}
              component={ProductPage}
            />
            <Route
              exact
              path={`${match.url}/pickup/:branchId/item/:productId/edit`}
              component={ProductPage}
            />
            <Route
              exact
              path={`${match.url}/delivery/basket`}
              component={CheckoutPage}
            />
            <Route
              exact
              path={`${match.url}/pickup/basket`}
              component={CheckoutPage}
            />
            <Route
              exact
              path={`${match.url}/dine-in/basket`}
              component={CheckoutPage}
            />
            <Route
              exact
              path={`${match.url}/pickup/checkout`}
              component={PickupSetting}
            />

            <Route
              exact
              path={`${match.url}/delivery/checkout`}
              component={DeliverySettings}
            />
            <Route
              exact
              path={`${match.url}/delivery/order/:id`}
              component={SubmitedPickupOrder}
            />
            <Route
              exact
              path={`${match.url}/dine-in/order/:id`}
              component={SubmitedPickupOrder}
            />
            <Route
              exact
              path={`${match.url}/pickup/order/:id`}
              component={SubmitedPickupOrder}
            />
            <div className="main-wrapper">
              <Route path={`${match.url}/delivery`} component={Delivery} />
              <Route exact path={`${match.url}/pickup`} component={Pickup} />
              <Route
                exact
                path={`${match.url}/pickup/:branchId`}
                component={BranchPage}
              />
              <Route
                exact
                path={`${match.url}/delivery/:branchId`}
                component={BranchPage}
              />
              <Route
                exact
                path={`${match.url}/dine-in/:branchId/:tablenumber`}
                component={BranchPage}
              />
            </div>
          </Switch>
        </>
      )}
    </div>
  );
};

export default MerchantPage;
