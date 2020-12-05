import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/user-view/NavBar";
import Home from "./components/user-view/Home";
import Login from "./components/admin-view/Login";

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
    </Router>
  );
}

export default App;
