import * as Yup from "yup";

Yup.match = function(key, message, func) {
  message = message || "Values do not match";
  func =
    func ||
    function(value) {
      return value === this.options.context[key];
    };

  return Yup.mixed().test("match", message, func);
};

Yup.dob = function(key, message, func) {
  message = message || "Date of birth is invalid";
};

export const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please enter the same password again")
});

export const SetupSchemaDob = Yup.object().shape({
  dob: Yup.date()
    .min(
      new Date(
        new Date().getFullYear() - 150,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "You are not that old"
    )
    .max(
      new Date(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "You must be at least 18 years old"
    )
    .required("Please enter your date of birth")
});

export const WorkSettingsSchema = Yup.object().shape({
  start_date: Yup.date()
    .typeError("Start date must be in date format")
    .required("Starting date is required"),
  role: Yup.string().required("You must define a position"),
  company_name: Yup.string().required("Please enter the name of company")
});

export const EducationSettingsSchema = Yup.object().shape({
  start_date: Yup.date()
    .typeError("Start date must be in date format")
    .required("Starting date is required"),
  qualification_name: Yup.string().required("You must define a qualification"),
  institution_name: Yup.string().required(
    "Please enter the name of the Institution"
  )
});

export const SetupSchemaSkills = Yup.object().shape({
  interests: Yup.mixed().required("You must choose at least one interest")
});
