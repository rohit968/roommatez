import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { GiHand } from "react-icons/gi";
import accountImage from "../../assets/account-image.jpg";
import * as Yup from "yup";
import { UserContext } from "../../UserContext";
import "./signin.scss";
import { Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const { setUser, isLoggedIn } = useContext(UserContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log("hello");
      const response = await axios.post("/login", {
        email: values.email,
        password: values.password,
      });
      setUser(response.data);
      navigate("/");
    } catch (e) {
      alert("Loggin failed");
    }
  };

  console.log(isLoggedIn);

  return (
    <div className="signin">
      <div className="signin-container">
        <h1 className="signin-heading">
          Welcome Back!{" "}
          <GiHand className="signin-icon" style={{ color: "#ffcc80" }} />
        </h1>
        <p className="signin-text">Please enter login details below</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signin-form">
              <div className="form-group">
                <Field type="email" name="email" className="form-control" />
                <span>Email</span>
                <ErrorMessage
                  name="email"
                  className="error-message"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <span>Password</span>
                <ErrorMessage name="password" className="error-message" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <p>
          Don't have an account? Please
          <Link to="/signup" className="account-link">
            Sign up
          </Link>
        </p>
      </div>
      <div className="account-image">
        <img src={accountImage} alt="Account Image" className="accountImage" />
      </div>
    </div>
  );
};

export default Signin;
