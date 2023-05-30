import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import searchIcon from "../../../assets/icons/search.png";
import _ from "lodash";
import areasJson from "../../../assets/areas.json";

import "./style.scss";
import firestore from "../../../firebase";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    boxShadow: "none",
    margin: "0 !important",
  },
  AccordionDetails: {
    padding: "0 !important",
  },
}));

export default function Delivery(props) {
  const classes = useStyles();
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState();
  const [merchantid, setmerchantId] = useState("");
  useEffect(async () => {
    await getAreas();
  }, [search]);

  const getAreas = async () => {
    let merchantId = props.match.path.split("/")[1];
    let areas = await firestore
      .collection("Branches")
      .where("merchantId", "==", merchantId)
      .get();
    let areaList = [];
    setmerchantId(merchantId);
    areas.forEach((area) => {
      areaList.push(area.data());
    });
    console.log(areaList);
    setAreas(areaList);
  };
  const history = useHistory();

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
            placeholder="Search for an area"
          />
        </div>
      </section>
      <div className="delivery-container">
        {areas.map((area) => (
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={area.of}
              className="accordion-summary"
            >
              <div className={`${classes.heading} accordion-title`}>
                <div>{area.area}</div>
                <div className="size">{area.area}</div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <ul
                className="delivery-areas-container"
                onClick={() =>
                  history.push(`/${merchantid}/delivery/${area.branchId}`)
                }
              >
                {area?.deliveryAreas?.map((item) => (
                  <li key={item.id} className="delivery-area">
                    <div>{item.area}</div>
                    <ArrowForwardIosIcon className="icon-style" />
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
}
