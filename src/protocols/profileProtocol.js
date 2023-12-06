import profileSchema from "@/schema/profileSchema";

const profileProtocol = {
  types: {
    user: {
      schema: profileSchema,
      dataFormats: ["application/json"],
    },
  },
  structure: {
    user: {
      $actions: [
        {
          who: "anyone",
          can: "create",
        },
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "author",
          of: "user",
          can: "update",
        },
        {
          who: "author",
          of: "user",
          can: "delete",
        },
      ],
      firstName: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      lastName: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      email: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      phone: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      role: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      aboutMe: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      country: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      city: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      countryCode: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      github: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
      linkedIn: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
    },
  },
};

module.exports = profileProtocol;
