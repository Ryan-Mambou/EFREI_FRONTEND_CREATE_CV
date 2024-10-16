import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import httpService from "../services/httpService";
import Nav from "../components/nav";

function BuildResume() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      description: "",
      institution: "",
      degree: "",
      graduationYear: "",
      visible: true,
      company: "",
      startDate: "",
      endDate: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      institution: Yup.string(),
      degree: Yup.string(),
      graduationYear: Yup.string(),
      visible: Yup.boolean().required("You must set your cv visibility"),
      company: Yup.string(),
      role: Yup.string(),
      startDate: Yup.date().required("Required"),
      endDate: Yup.date(),
    }),
    onSubmit: (values) => {
      const data = {
        firstname: values.firstName,
        lastname: values.lastName,
        description: values.description,
        visible: values.visible,
        education: [
          {
            institution: values.institution,
            degree: values.degree,
            year: values.graduationYear,
          },
        ],
        experience: [
          {
            company: values.company,
            role: values.role,
            startDate: values.startDate,
            endDate: values.endDate,
          },
        ],
      };

      console.log(data);

      httpService
        .post("/cv", data) // Ensure you post to the correct endpoint for creating CVs
        .then((response) => {
          console.log("response: ", response.data);
        })
        .catch((err) => console.log("error", err.response.data));
    },
  });

  return (
    <div>
      <Nav />
      <h2>Enter your information</h2>
      <form onSubmit={formik.handleSubmit}>
        <p>Personal Information</p>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error-message">{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error-message">{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error-message">{formik.errors.description}</div>
          ) : null}
        </div>

        <div>
          <p>Do you want your CV to be visible?</p>
          <input
            type="radio"
            name="visible"
            id="visibleYes"
            value="true"
            checked={formik.values.visible === true}
            onChange={() => formik.setFieldValue("visible", true)}
          />
          <label htmlFor="visibleYes">Visible</label>
          <input
            type="radio"
            name="visible"
            id="visibleNo"
            value="false"
            checked={formik.values.visible === false}
            onChange={() => formik.setFieldValue("visible", false)}
          />
          <label htmlFor="visibleNo">Invisible</label>
          {formik.touched.visible && formik.errors.visible ? (
            <div className="error-message">{formik.errors.visible}</div>
          ) : null}
        </div>

        <p>Professional Experience</p>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            onChange={formik.handleChange}
            value={formik.values.company}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className="error-message">{formik.errors.startDate}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />
        </div>

        <p>Educational Background</p>
        <div>
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            onChange={formik.handleChange}
            value={formik.values.degree}
          />
        </div>
        <div>
          <label htmlFor="institution">Institution</label>
          <input
            type="text"
            id="institution"
            name="institution"
            onChange={formik.handleChange}
            value={formik.values.institution}
          />
        </div>
        <div>
          <label htmlFor="graduationYear">Graduation Year</label>
          <input
            type="text"
            id="graduationYear"
            name="graduationYear"
            onChange={formik.handleChange}
            value={formik.values.graduationYear}
          />
        </div>

        <button type="submit">Create CV</button>
      </form>
    </div>
  );
}

export default BuildResume;
