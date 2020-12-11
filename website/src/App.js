import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/user-view/Home";
import Login from "./components/admin-view/Login";
import AdminDash from "./components/admin-view/AdminDash";
import Checkout from "./components/user-view/Checkout";
import PayPal from "./components/user-view/PayPal";
import OrderSuccess from "./components/user-view/OrderSuccess";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/admin" render={() => <AdminDash />} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/pay" component={PayPal} />
        <Route path="/success" component={OrderSuccess} />
      </Switch>
    </Router>
  );
}

export default App;
