import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation Schema
const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  publishedYear: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required")
    .min(1000, "Enter a valid year")
    .max(new Date().getFullYear(), "Future year not allowed"),
  status: Yup.string().required("Status is required"),
});

function EditBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  // Fetch existing book data
  useEffect(() => {
    axios
      .get(`http://localhost:9006/books/${id}`)
      .then((res) => {
        setInitialValues(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        alert("Error loading book.");
        navigate("/");
      });
  }, [id, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values,"vals")
    try {
      await axios.put(`http://localhost:9006/books/${id}`, values);
      alert("Book updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating book:", err);
      alert("Failed to update book.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialValues) return <div>Loading book data...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Book</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={BookSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="row g-3">
            {/* Title */}
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <Field name="title" type="text" className="form-control" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Author */}
            <div className="col-md-6">
              <label className="form-label">Author</label>
              <Field name="author" type="text" className="form-control" />
              <ErrorMessage
                name="author"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Genre */}
            <div className="col-md-6">
              <label className="form-label">Genre</label>
              <Field name="genre" type="text" className="form-control" />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Published Year */}
            <div className="col-md-6">
              <label className="form-label">Published Year</label>
              <Field
                name="publishedYear"
                type="number"
                className="form-control"
              />
              <ErrorMessage
                name="publishedYear"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <Field as="select" name="status" className="form-select">
                <option value="">Select status</option>
                <option value="Available">Available</option>
                <option value="Issued">Issued</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-danger small"
              />
            </div>

            {/* Buttons */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Update"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditBookForm;
