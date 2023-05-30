import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import RecommendedSection from "./recommendedSection";
import searchIcon from "../../../assets/icons/search.png";
import firestore from "../../../firebase";
import { cart, updateBrand } from "../../../basketActions";

const BranchPage = ({ history, match }) => {
  const [basket, setbasket] = useState(cart());
  const [products, setproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [branch, setbranch] = useState("");
  const [update, setupdate] = useState(0);
  const [banner, setbanner] = useState();
  const [merchant, setmerchant] = useState("");

  useEffect(async () => {
    await loadBranch();
    await loadMerchant();
    await loadProducts(match.params.branchId);
    let tableNumber = window.location.href.split("/");
    updateBrand({
      area: branch.area,
      address: branch.address,
      of: branch.branchId,
      ofMerchant: merchant.uid,
      type: match.path.split("/")[2],
      branchName: branch.branchName,
      brandName: merchant.brandName,
      tableNumber: parseInt(tableNumber[tableNumber.length - 1]),
    });
  }, [update]);
  const loadBranch = async () => {
    const branchId = match.params.branchId;
    console.log(branchId);
    let branch_ = await firestore.collection("Branches").doc(branchId).get();
    setbranch(branch_.data());
    setbanner(branch_.data().brandBanner);
    let tableNumber = window.location.href.split("/");
    updateBrand({
      area: branch_.data().area,
      address: branch_.data().address,
      of: branch_.data().branchId,
      ofMerchant: branch_.data().of,
      type: match.path.split("/")[2],
      branchName: branch_.data().branchName,
      brandName: merchant.brandName,
      tableNumber: tableNumber[tableNumber.length - 1],
      branchBanner: branch_.data().brandBanner,
    });
  };
  const loadMerchant = async () => {
    let merchantid = match.path.split("/")[1];
    let merchant_ = await firestore
      .collection("Merchant")
      .doc(merchantid)
      .get();
    setmerchant(merchant_.data());
  };
  const loadProducts = async (id) => {
    let products_ = await firestore
      .collection("Products")
      .where("branchId", "==", id)
      .get();
    let productList = [];
    products_.forEach((product) => {
      productList.push(product.data());
    });
    setproducts(productList);
    setupdate(1);
  };

  const goToCheckout = () => {
    let path = match.path;
    path = path.substring(1);
    const index = path.indexOf("/");
    path = path.substring(0, index);
    let type = match.path.split("/")[2];
    history.push(`/${path}/${type}/basket`);
  };

  return (
    <>
      <div
        className="home-banner"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundImage: `url(${branch.brandBanner})`,
        }}
      />
      <div className="home-card-wrapper">
        <div className="home-card-inner-wrapper">
          <h2>{branch.branchName}</h2>
          <p>{branch.address}</p>

          <span>Get {branch.discount}% off your first order</span>
        </div>
      </div>
      <div className="branch-page-container">
        <RecommendedSection products={products} history={history} />
        <section className="search">
          <div className="search-inner">
            <img src={searchIcon} alt="search icon" className="icn" />
            <input
              style={{ outline: "none" }}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="search-bar"
              id="search-bar"
              placeholder="Search Menu"
            />
          </div>
        </section>
        <section className="food-items">
          {products.map((product, index) => (
            <div
              key={index}
              className={`home-food-card`}
              name="Peppy Paneer"
              onClick={() =>
                history.push({
                  pathname: `${history.location.pathname}/item/${product.productId}`,
                  state: { product: product },
                })
              }
              style={
                basket[product.productId]
                  ? { borderLeft: "3px solid #C4C4C4" }
                  : {}
              }
            >
              <div className="card-content-homie">
                <div className="name">
                  {basket.items[index] && (
                    <sup>{basket.items[index]?.totalElements}x</sup>
                  )}
                  {product.productName}
                </div>
                <div className="prices">
                  <div className="dp">{product.productPrice} INR</div>
                  {/*<div className="mp">30</div>*/}
                </div>
                <div className="desc">
                  {product.productDescription?.length > 50
                    ? `${product.productDescription?.substring(0, 50)}...`
                    : product.productDescription}
                </div>
              </div>
              <img src={product.productImage} alt="food item" className="img" />
            </div>
          ))}
        </section>
        {basket.items.length > 0 && (
          <div className="basket">
            <div className="basket-button" onClick={goToCheckout}>
              <div className="basket-button-inner">
                <div className="items-quant">{basket.items.length} items</div>
                <div className="name">Basket</div>
                <div className="amt">INR {basket.total}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(BranchPage);
