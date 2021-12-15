import { Formik, useField, Form } from "formik";
import * as Yup from "yup";

const FormInput = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          className="font-poppins font-sm font-regular text-whiteone"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        {meta.touched && meta.error ? (
          <div className="font-fira text-secondary text-xs">{meta.error}</div>
        ) : null}
      </div>

      {props.textarea ? (
        <textarea
          placeholder={placeholder}
          className={`h-16 w-full bg-tertiary border mt-2 px-4 py-2 rounded-[6px] text-whiteone text-sm font-poppins font-light outline-none min-h-[150px] ${
            meta.touched && meta.error ? "border-secondary" : "border-whitetwo"
          }`}
          {...field}
          {...props}
        />
      ) : (
        <input
          placeholder={placeholder}
          className={`h-16 w-full bg-tertiary border mt-2 px-4 py-2 rounded-[6px] text-whiteone text-sm font-poppins font-light outline-none ${
            meta.touched && meta.error ? "border-secondary" : "border-whitetwo"
          }`}
          {...field}
          {...props}
        />
      )}
    </div>
  );
};

function FormComponent(props) {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {};
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Must be at least 3 characters")
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        message: Yup.string().required("Please enter a message"),
      })}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="space-y-6">
          <FormInput
            label="Full name"
            name="name"
            type="text"
            placeholder="Please enter your name"
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="Please enter your email"
            type="email"
          />
          <FormInput
            label="Message"
            textarea
            name="message"
            type="text"
            placeholder="Your message"
          />
          <div className="w-fit ml-auto">
            <button className="text-secondary text-[13px] font-fira border border-secondary p-[10px] rounded-[5px]">
              Send message
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormComponent;
