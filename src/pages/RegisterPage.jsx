import React from "react";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {

    const { handleUserRegister } = useAuth(); 
    const [credentials, setCredentials] = useState({
       name:"",
       email: "",
       password: "",
       confirmPassword:"",
     });


     const handleInputChange = (e) => {
       let name = e.target.name;
       let value = e.target.value;

       setCredentials({ ...credentials, [name]: value });

       console.log(credentials);
     };

    return (
      <div className="auth--container">
        <div className="form--wrapper">
          <form onSubmit={(e) => handleUserRegister(e, credentials)}>
            <div className="field--wrapper">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name..."
                value={credentials.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <label>Email:</label>
              <input
                type="email"
                required
                name="email"
                placeholder="Enter your Email..."
                value={credentials.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <label>Password:</label>
              <input
                type="password"
                required
                name="password"
                placeholder="Enter Password..."
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="field--wrapper">
              <label>Confirm Password:</label>
              <input
                type="password"
                required
                name="confirmPassword"
                placeholder="Confirm Password..."
                value={credentials.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="field--wrapper">
              <input
                className="btn btn--lg btn--main"
                type="submit"
                value="Register"
              />
            </div>
          </form>

          <p>
            Do have an account ? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    );
}

export default RegisterPage;