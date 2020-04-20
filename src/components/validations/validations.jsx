import * as Yup from 'yup';

Yup.match = function (key, message, func) {
  message = message || 'Values do not match';
  func = func || function (value) {
    return value === this.options.context[key];
  }

  return Yup.mixed().test('match', message, func);
};

Yup.dob = function (key, message, func) {
  message = message || 'Date of birth is invalid';

}


export const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
	password: Yup.string()
		.matches(/^(?=.*[a-z])$/g, {message: 'Password must contain at least one lowercase character',excludeEmptyString: true })
		.matches(/^(?=.*[A-Z])$/g, {message: 'Password must contain at least one uppercase character',excludeEmptyString: true })
		.matches(/^(?=.*\d)$/g, {message: 'Password must contain at least one number',excludeEmptyString: true })
		.matches(/^(?=.*[#$^+=!*()@%&])$/g, {message: 'Password must contain at least one special character',excludeEmptyString: true })
		.matches(/^.{8,32}$/g, {message: 'Password must be between 8-32 characters in length',excludeEmptyString: true })
		.required('Password is required'),
	confirmPassword: Yup.match('password', 'Passwords do not match')
		.required('Password confirmation is required'),
});

export const SetupSchemaDob = Yup.object().shape({
  // dobYear: Yup.number()
  // .required('Year of birth is required'),
  // dobMonth: Yup.string()
  // .required('Month of birth is required'),
  // dobDay: Yup.number()
  // .required('Day of birth is required'),
  dob: Yup.date()
  .min(new Date(new Date().getFullYear() - 150, new Date().getMonth(), new Date().getDate()), "You are not that old")
  .max(new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()), "You must be at least 18 years old")
  .required('Please enter your date of birth')
})
// .test('isOver-18', 'Please enter a valid date', function(value) {
//   if(!value) return true
//   let isValid = false;
//   const { dobYear, dobMonth, dobDay } = value;
//   const dob = Date.parse(dobMonth + dobDay.toString() + ", " + dobYear.toString());
//   if (dob instanceof Date && !isNaN(dob)) {
//     const myFailureMessage = 'You must be over 18';
//     const currentDate = new Date();
//     const minAgeYear = currentDate.getFullYear() - 18;
//     const minAgeDate = new Date(minAgeYear);
//     isValid = dob <= minAgeDate;
//     return isValid || this.createError({
//           // Formik will use the error "path" as the key in the errors; set this to whatever you want
//           path: 'dob',
//           message: myFailureMessage
//       })
//   } else {
//     const myFailureMessage = 'Please enter a valid date'
//     return this.createError({
//           // Formik will use the error "path" as the key in the errors; set this to whatever you want
//           path: 'dob.all',
//           message: myFailureMessage
//       })
//   }
//
// });

export const SetupSchemaSkills = Yup.object().shape({
  interests: Yup.mixed()
  .required('You must choose at least one interest'),
});
