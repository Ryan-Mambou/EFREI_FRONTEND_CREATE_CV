import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import httpService from "../services/httpService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      httpService
        .post("/auth/login", data)
        .then((response) => {
          const { token } = response.data;

          localStorage.setItem("token", token);
          navigate("/timeline");
        })
        .catch((err) => console.log("error", err.response.data));
    },
  });

  return (
    <div>
      <h2>Enter your details to create your account</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
