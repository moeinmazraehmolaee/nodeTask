// docs/swagger/auth.swagger.js
const authSwaggerDocs = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "User login",
      description:
        "Logs in a user using username and password. Returns JWT token in cookies.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string", example: "admin" },
                password: { type: "string", example: "password123" },
              },
              required: ["username", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Login successful" },
                },
              },
            },
          },
        },
        400: { description: "Invalid username or password" },
        500: { description: "Internal server error" },
      },
    },
  },
  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "User logout",
      description:
        "Clears the authentication cookie and logs out the user.",
      security: [{ cookieAuth: [] }], 
      responses: {
        200: {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Logout successful" },
                },
              },
            },
          },
        },
        401: { description: "User is not authenticated" }, 
        500: { description: "Internal server error" },
      },
    },
  },
};

module.exports = authSwaggerDocs;
