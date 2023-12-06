const profileSchema = {
  title: "Profile Schema",
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    lastName: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    email: {
      type: "string",
      format: "email",
    },
    phone: {
      type: "string",
      pattern: "^\\+?[0-9]{1,15}$",
    },
    role: {
      type: "string",
    },
    aboutMe: {
      type: "string",
      maxLength: 500,
    },
    country: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    city: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    countryCode: {
      type: "string",
      pattern: "^[A-Z]{2}$",
    },
    github: {
      type: "string",
      pattern: "^[A-Za-z0-9]+$",
    },
    linkedIn: {
      type: "string",
      format: "uri",
    },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "role",
    "aboutMe",
    "country",
    "city",
    "countryCode",
    "phone",
    "github",
    "linkedIn",
  ],
};

module.exports = profileSchema;
