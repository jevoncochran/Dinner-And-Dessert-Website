import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
function App() {
  return (
    <Router>
    <NavBar />
    <Home />
    </Router>
  );
}

export default App;
