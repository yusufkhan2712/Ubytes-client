import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import MerchantPage from "./pages/merchantPage";
import LoginPage from "./pages/loginPage";
import MerchantList from "./pages/homepage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/:merchantId" component={MerchantPage} />
        <Route path="/" component={MerchantList}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
