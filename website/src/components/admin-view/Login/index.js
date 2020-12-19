import React, { useState, useEffect } from "react";
import "./Login.scss";
import { connect } from "react-redux";

import { adminLogin } from "../../../actions";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("credentials: ", credentials);
  }, [credentials]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    props.adminLogin(credentials);
  };

  useEffect(() => {
    if (props.adminAccess && !props.isLoading) {
      props.history.push("/admin");
    }

    console.log("this is running");
    console.log("admin_access: ", props.adminAccess);
  }, [props.adminAccess]);

  return (
    <div className="login-page">
      <h1 className="login-headline">Admin Access</h1>
      <h5 className="login-sub">Hello! Sign in with your username or email</h5>
      <form style={{ width: "100%" }}>
        <div className="login-cred-div">
          <div className="login-cred-input-div">
            <label htmlFor="name">Username</label>
            <input
              className="login-cred-input"
              type="text"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="login-cred-input-div">
            <label htmlFor="password">Password</label>
            <input
              className="login-cred-input"
              type="text"
              name="password"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="login-other-div">
          <div className="login-remember-me-div">
            <input
              className="login-remember-me-checkbox"
              type="checkbox"
              name="remember-me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <p className="login-forgot-p">Forgot password?</p>
        </div>
        <div className="login-submit-btn-div">
          <button
            className="login-submit-btn"
            type="submit"
            onClick={handleLoginSubmit}
          >
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adminAccess: state.admin.admin_access,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { adminLogin })(Login);
