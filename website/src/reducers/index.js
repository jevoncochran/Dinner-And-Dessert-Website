import { combineReducers } from "redux";

import { admin } from "./admin-reducer";
import { customer } from "./customer-reducer";


export default combineReducers({ customer, admin });