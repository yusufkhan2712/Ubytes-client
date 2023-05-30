import { useEffect, useState, useStyles, useHistory } from "react";

import BranchItem from "./branchItem";

import searchIcon from "../../../assets/icons/search.png";
import "./styles.scss";
import firestore from "../../../firebase";
function Pickup(props) {
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState();
  // const history = useHistory();
  const [BrandName, setBrandName] = useState("");
  const [merchantid, setmerchantId] = useState("");
  useEffect(async () => {
    await getAreas();
    await getMerchant();
  }, [search]);

  const getAreas = async () => {
    let merchantId = props.match.url.split("/")[1];
    console.log(merchantId);
    let areas = await firestore
      .collection("Branches")
      .where("merchantId", "==", merchantId)
      .get();
    let areaList = [];
    setmerchantId(merchantId);
    areas.forEach((area) => {
      areaList.push(area.data());
    });

    setAreas(areaList);
  };
  const getMerchant = async () => {
    let _ = await firestore
      .collection("Merchant")
      .doc(props.match.url.split("/")[1])
      .get();

    setBrandName(_.data().brandName);
  };
  const onSearch = (v) => {
    setSearch(v);
  };
  return (
    <>
      <section className="search">
        <div className="search-inner">
          <img src={searchIcon} alt="search icon" className="icn" />
          <input
            style={{ outline: "none" }}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Search for an outlet"
          />
        </div>
      </section>
      <div className="branches-container">
        {areas.map((a, i) => (
          <div
            key={i}
            onClick={() =>
              (window.location =
                window.location.origin +
                "/" +
                merchantid +
                "/pickup/" +
                a.branchId)
            }
          >
            <BranchItem merchant={BrandName} branch={a} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Pickup;
