const productSwaggerDocs = {
  "/products": {
    post: {
      tags: ["Products"],
      summary: "Create a new product",
      description:
        "Creates a new product belonging to the logged-in user. Only users with 'Create' permission or super admin can create products.",
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "product_type", "color"],
              properties: {
                name: { type: "string", example: "School Uniform" },
                product_type: {
                  type: "string",
                  enum: [
                    "shirt",
                    "t-shirt",
                    "pants",
                    "shorts",
                    "skirt",
                    "dress",
                    "jacket",
                    "coat",
                    "sweater",
                    "uniform",
                    "shoes",
                    "accessory",
                    "hat",
                    "scarf",
                  ],
                  example: "shirt",
                },
                color: {
                  type: "string",
                  enum: [
                    "white",
                    "black",
                    "gray",
                    "red",
                    "blue",
                    "green",
                    "yellow",
                    "orange",
                    "purple",
                    "pink",
                    "brown",
                    "beige",
                    "navy",
                    "maroon",
                    "olive",
                  ],
                  example: "blue",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Product created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "object",
                    properties: {
                      _id: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
                      name: { type: "string", example: "Blue School Shirt" },
                      product_type: { type: "string", example: "shirt" },
                      color: { type: "string", example: "blue" },
                      user_id: {
                        type: "object",
                        properties: {
                          _id: { type: "string", example: "6719c8ef1b3d5a22c9f9a211" },
                          username: { type: "string", example: "moinmazraeh" },
                          name: { type: "string", example: "معین مزرعه ملایی" },
                        },
                      },
                      createdAt: { type: "string", example: "2025-10-04T09:00:00.000Z" },
                      updatedAt: { type: "string", example: "2025-10-04T09:15:00.000Z" },
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: "Error creating product" },
      },
    },

    get: {
      tags: ["Products"],
      summary: "Get all products",
      description:
        "Retrieves all products. Normal users can only see their own products, unless they have the 'View' permission.",
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of products",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
                        name: { type: "string", example: "Blue School Shirt" },
                        product_type: { type: "string", example: "shirt" },
                        color: { type: "string", example: "blue" },
                        user_id: {
                          type: "object",
                          properties: {
                            _id: { type: "string", example: "6719c8ef1b3d5a22c9f9a211" },
                            username: { type: "string", example: "moinmazraeh" },
                            name: { type: "string", example: "معین مزرعه ملایی" },
                          },
                        },
                        createdAt: { type: "string", example: "2025-10-04T09:00:00.000Z" },
                        updatedAt: { type: "string", example: "2025-10-04T09:15:00.000Z" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: "Error fetching products" },
      },
    },
  },

  "/products/{id}": {
    get: {
      tags: ["Products"],
      summary: "Get product by ID",
      description:
        "Retrieves a single product by its ID. The user can only see their own product unless they are a super admin.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
        },
      ],
      responses: {
        200: {
          description: "Product found successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "object",
                    properties: {
                      _id: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
                      name: { type: "string", example: "Blue School Shirt" },
                      product_type: { type: "string", example: "shirt" },
                      color: { type: "string", example: "blue" },
                      user_id: {
                        type: "object",
                        properties: {
                          _id: { type: "string", example: "6719c8ef1b3d5a22c9f9a211" },
                          username: { type: "string", example: "moinmazraeh" },
                          name: { type: "string", example: "معین مزرعه ملایی" },
                        },
                      },
                      createdAt: { type: "string", example: "2025-10-04T09:00:00.000Z" },
                      updatedAt: { type: "string", example: "2025-10-04T09:15:00.000Z" },
                    },
                  },
                },
              },
            },
          },
        },
        403: { description: "Access denied" },
        404: { description: "Product not found" },
      },
    },

    put: {
      tags: ["Products"],
      summary: "Update a product",
      description:
        "Updates an existing product. Only the product owner or super admin can perform this action.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Updated Product Name" },
                product_type: {
                  type: "string",
                  enum: [
                    "shirt",
                    "t-shirt",
                    "pants",
                    "shorts",
                    "skirt",
                    "dress",
                    "jacket",
                    "coat",
                    "sweater",
                    "uniform",
                    "shoes",
                    "accessory",
                    "hat",
                    "scarf",
                  ],
                },
                color: {
                  type: "string",
                  enum: [
                    "white",
                    "black",
                    "gray",
                    "red",
                    "blue",
                    "green",
                    "yellow",
                    "orange",
                    "purple",
                    "pink",
                    "brown",
                    "beige",
                    "navy",
                    "maroon",
                    "olive",
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Product updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "object",
                    properties: {
                      _id: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
                      name: { type: "string", example: "Blue School Shirt" },
                      product_type: { type: "string", example: "shirt" },
                      color: { type: "string", example: "blue" },
                      user_id: {
                        type: "object",
                        properties: {
                          _id: { type: "string", example: "6719c8ef1b3d5a22c9f9a211" },
                          username: { type: "string", example: "moinmazraeh" },
                          name: { type: "string", example: "معین مزرعه ملایی" },
                        },
                      },
                      createdAt: { type: "string", example: "2025-10-04T09:00:00.000Z" },
                      updatedAt: { type: "string", example: "2025-10-04T09:15:00.000Z" },
                    },
                  },
                },
              },
            },
          },
        },
        403: { description: "Access denied" },
        404: { description: "Product not found" },
      },
    },

    delete: {
      tags: ["Products"],
      summary: "Delete a product",
      description:
        "Deletes a product by ID. Only the product owner or super admin can delete the product.",
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", example: "6719c8ef1b3d5a22c9f9c312" },
        },
      ],
      responses: {
        200: {
          description: "Product deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Product deleted successfully",
                  },
                },
              },
            },
          },
        },
        403: { description: "Access denied" },
        404: { description: "Product not found" },
      },
    },
  },
};

module.exports = productSwaggerDocs;