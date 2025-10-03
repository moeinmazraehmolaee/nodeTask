const userSwaggerDocs = {
  "/user/{id}/profile": {
    put: {
      tags: ["User"],
      summary: "Update user profile (name, phone, username, password)",
      description: "Updates the specified user's profile information. Self-updates do not require permissions.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "User ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "User's full name",
                  default:'ali'
                },
                phone: {
                  type: "string",
                  pattern: "^09\\d{9}$",
                  description: "User's phone number (Iranian format)",
                  default:"09140002516"
                },
                username: {
                  type: "string",
                  minLength: 3,
                  description: "User's username",
                  default:"test@tes"
                },
                password: {
                  type: "string",
                  minLength: 6,
                  description: "User's new password",
                  default:'12345678'
                },
              },
              additionalProperties: false,
            },
          },
        },
      },
      responses: {
        200: {
          description: "User profile updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User profile updated successfully",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Validation error or user not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Insufficient permissions",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Insufficient permissions to edit user account information",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/user/{id}/promoteSuperAdmin": {
    put: {
      tags: ["User"],
      summary: "Promote user to super admin",
      description: "Promotes the specified user to super admin status. Only super admins can perform this action.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "User ID to promote",
        },
      ],
      responses: {
        200: {
          description: "User promoted to super admin successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User promoted to super admin successfully",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "User not found or already super admin",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Only super admins can promote",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Only super admins can promote users to super admin",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/user/{id}/role/{roleId}": {
    put: {
      tags: ["User"],
      summary: "Update user role",
      description: "Assigns a new role to the specified user. Requires Role Assign permission.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "User ID",
        },
        {
          in: "path",
          name: "roleId",
          required: true,
          schema: {
            type: "string",
          },
          description: "Role ID to assign",
        },
      ],
      responses: {
        200: {
          description: "User role updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User role updated successfully",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "User or role not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        403: {
          description: "Insufficient permissions",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Insufficient permissions to assign role",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User not found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "internal server error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = userSwaggerDocs;