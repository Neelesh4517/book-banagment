import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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

function BokForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
   await axios.post("http://localhost:9006/books", values);
     alert("Book added successfully!");
      resetForm();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add book!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add Book</h2>

      <Formik
        initialValues={{
          title: "",
          author: "",
          genre: "",
          publishedYear: "",
          status: "",
        }}
        validationSchema={BookSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <Field
                name="title"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger small"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Author</label>
              <Field
                name="author"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-danger small"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Genre</label>
              <Field
                name="genre"
                type="text"
                className="form-control"
              />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-danger small"
              />
            </div>
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
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
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

export default BokForm;
