import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GiHand } from "react-icons/gi";
import accountImage from "../../assets/account-image.jpg";
import * as Yup from "yup";
import "./signup.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      alert("Registration completed. Can login now");
    } catch (e) {
      alert("Registration failed. Try again after some time");
    }
  };

  return (
    <div className="account-page-container">
      <div className="account-image">
        <img src={accountImage} alt="Account Image" className="accountImage" />
      </div>
      <div className="form-container">
        <h1 className="form-heading">
          Welcome to Roommatez!{" "}
          <GiHand className="form-icon" style={{ color: "#ffcc80" }} />
        </h1>
        <p className="form-text">Please enter details below for registration</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="form-group">
                <Field type="name" name="name" className="form-control" />
                <span>Name</span>
                <ErrorMessage name="name" className="error-message" />
              </div>
              <div className="form-group">
                <Field type="email" name="email" className="form-control" />
                <span>Email</span>
                <ErrorMessage name="email" className="error-message" />
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

              <div className="form-group">
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                />
                <span>Confirm Password</span>
                <ErrorMessage
                  name="confirmPassword"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <p>
          Already a member?
          <Link to="/signin" className="account-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
