import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "enJerneering UI Builder API",
        description: "API for enJerneering UI Builder application.",
        version: "1.0",
      },
      tags: [
        // [Process]

        // [Data Management]
        {
          name: "[Data Management] Users",
          description: "Operations related to users in the system.",
        },
        {
          name: "[Data Management] Affiliate Users",
          description: "Operations related to affiliate users in the system.",
        },
        {
          name: "[Data Management] Affiliate Client Users",
          description: "Manage affiliate client users.",
        },
        {
          name: "[Data Management] Designs",
          description: "Operations related to designs.",
        },
        {
          name: "[Data Management] Layers",
          description: "Operations for managing layers within designs.",
        },
        {
          name: "[Data Management] Layouts",
          description: "APIs for layout configurations.",
        },
        {
          name: "[Data Management] Pages",
          description: "Manage pages within a project.",
        },
        {
          name: "[Data Management] Projects",
          description: "Operations related to projects.",
        },
        {
          name: "[Data Management] Services",
          description: "Services offered within projects.",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          AffiliateUser: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier for the affiliate user",
              },
              userId: {
                type: "string",
                description: "The ID of the user linked to this affiliate",
              },
              role: {
                type: "string",
                enum: ["ADMIN", "USER"],
                description: "Role of the affiliate user",
              },
              referralLink: {
                type: "string",
                nullable: true,
                description: "Referral link provided to the affiliate user",
              },
              affiliateAdminId: {
                type: "string",
                nullable: true,
                description: "ID of the admin who oversees this affiliate user",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description:
                  "Timestamp of when the affiliate user was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp of when the affiliate user was created",
              },
            },
            required: ["userId", "role"],
          },
          AffiliateData: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier for the affiliate data",
              },
              companyName: {
                type: "string",
                description: "Name of the company",
              },
              description: {
                type: "string",
                description: "Description of the affiliate",
              },
              message: {
                type: "string",
                nullable: true,
                description: "Message associated with the affiliate",
              },
              logo: {
                type: "string",
                nullable: true,
                description: "URL to the affiliate's logo",
              },
              website: {
                type: "string",
                nullable: true,
                description: "Website URL of the affiliate",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description:
                  "Timestamp of when the affiliate data was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp of when the affiliate data was created",
              },
            },
            required: ["companyName", "description"],
          },
          AffiliateClientUser: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the affiliate client user",
              },
              userId: {
                type: "string",
                nullable: true,
                description: "User ID of the affiliate client",
              },
              status: {
                type: "string",
                enum: ["INVITED", "ACTIVE", "INACTIVE"],
                description: "Current status of the affiliate client user",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description:
                  "Timestamp when the affiliate client user was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description:
                  "Timestamp when the affiliate client user was created",
              },
            },
            required: ["status"],
          },
          AffiliatePerformance: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the performance entry",
              },
              clicks: {
                type: "integer",
                description: "Number of clicks recorded",
              },
              sales: {
                type: "integer",
                description: "Number of sales made",
              },
              revenue: {
                type: "number",
                description: "Total revenue generated from sales",
              },
              date: {
                type: "string",
                format: "date-time",
                description: "Date when the data was recorded",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the data was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the data was first created",
              },
            },
            required: ["clicks", "sales", "revenue", "date"],
          },
          Design: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the design",
              },
              status: {
                type: "string",
                enum: ["DRAFT", "PUBLISHED", "REVISION"],
                description: "Current status of the design",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the design was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the design was created",
              },
            },
            required: ["status"],
          },
          Layer: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the layer",
              },
              componentType: {
                type: "string",
                description: "Type of component used in the layer",
              },
              styleVariant: {
                type: "integer",
                description: "Style variant index for the component",
              },
              content: {
                type: "string",
                description: "JSON data representing the content of the layer",
              },
              configuration: {
                type: "string",
                description:
                  "JSON data representing configuration settings for the layer",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the layer was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the layer was created",
              },
            },
            required: ["componentType", "styleVariant"],
          },
          Layout: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the layout",
              },
              configuration: {
                type: "string",
                description: "JSON configuration data for the layout",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the layout was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the layout was created",
              },
            },
            required: ["configuration"],
          },
          Page: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the page",
              },
              title: {
                type: "string",
                description: "Title of the page",
              },
              seoEnabled: {
                type: "boolean",
                description: "Flag indicating if SEO is enabled for the page",
              },
              seoTitle: {
                type: "string",
                nullable: true,
                description: "SEO title of the page",
              },
              seoDescription: {
                type: "string",
                nullable: true,
                description: "SEO description of the page",
              },
              seoKeywords: {
                type: "array",
                items: { type: "string" },
                description: "SEO keywords for the page",
              },
              seoImage: {
                type: "string",
                nullable: true,
                description: "URL to the SEO image for the page",
              },
              configuration: {
                type: "string",
                nullable: true,
                description: "JSON configuration data for the page",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the page was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the page was created",
              },
            },
            required: ["title", "seoEnabled"],
          },
          Project: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier for a project",
              },
              userId: {
                type: "string",
                description: "The ID of the user who owns the project",
              },
              title: {
                type: "string",
                description: "The title of the project",
              },
              description: {
                type: "string",
                description: "Detailed description of the project",
                nullable: true,
              },
              domain: {
                type: "string",
                description: "Domain associated with the project",
                nullable: true,
              },
              keywords: {
                type: "array",
                items: { type: "string" },
                description: "Keywords associated with the project",
              },
              configurationDetails: {
                type: "string",
                description: "Configuration details of the project",
                nullable: true,
              },
              thumbnail: {
                type: "string",
                description: "URL of the project's thumbnail image",
                nullable: true,
              },
              url: {
                type: "string",
                description: "URL of the project",
                nullable: true,
              },
              status: {
                type: "string",
                description: "Current status of the project",
                enum: ["DRAFT", "PUBLISHED", "DELETED"],
              },
              serviceAreas: {
                type: "array",
                items: { type: "string" },
                description: "Service areas covered by the project",
              },
              seoTitle: {
                type: "string",
                description: "SEO title of the project",
                nullable: true,
              },
              seoDescription: {
                type: "string",
                description: "SEO description of the project",
                nullable: true,
              },
              seoKeywords: {
                type: "array",
                items: { type: "string" },
                description: "SEO keywords associated with the project",
              },
              seoImage: {
                type: "string",
                description: "SEO image URL for the project",
                nullable: true,
              },
              language: {
                type: "string",
                description: "Language of the project content",
                nullable: true,
              },
              region: {
                type: "string",
                description: "Region targeted by the project",
                nullable: true,
              },
              primaryColor: {
                type: "string",
                description: "Primary color used in the project",
                nullable: true,
              },
              fontFamily: {
                type: "string",
                description: "Font family used in the project",
                nullable: true,
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description:
                  "The date and time when the project was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "The date and time when the project was created",
              },
            },
            required: ["title", "status"],
          },
          Service: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier for the service",
              },
              name: {
                type: "string",
                description: "Name of the service",
              },
              description: {
                type: "string",
                nullable: true,
                description: "Description of the service",
              },
              areas: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "Areas covered by the service",
              },
              images: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "Array of URLs to images related to the service",
              },
              lastUpdated: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the service was last updated",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Timestamp when the service was created",
              },
            },
            required: ["name"],
          },
        },
      },
      paths: {
        "/api/v1/users": {
          get: {
            tags: ["[Data Management] Users"],
            summary: "Retrieve all users",
            description: "Returns a list of all users in the system.",
            responses: {
              "200": {
                description: "A list of users",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {},
                    },
                  },
                },
              },
              "500": {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: {
                          type: "string",
                          example: "Failed to retrieve users",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/users/current": {
          get: {
            tags: ["[Data Management] Users"],
            summary: "Retrieve current logged-in user",
            description: "Returns the details of the current logged-in user.",
            responses: {
              "200": {
                description: "Details of the current user",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {},
                    },
                  },
                },
              },
              "500": {
                description: "Internal server error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: {
                          type: "string",
                          example: "Failed to retrieve user",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/affiliate-users": {
          get: {
            tags: ["[Data Management] Affiliate Users"],
            summary: "Retrieve all affiliate users",
            description: "Returns a list of all affiliate users in the system.",
            responses: {
              "200": {
                description: "A list of affiliate users",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/AffiliateUser",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ["[Data Management] Affiliate Users"],
            summary: "Create a new affiliate user",
            description: "Adds a new affiliate user to the system.",
            responses: {
              "201": {
                description: "Affiliate user created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/AffiliateUser",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/affiliate-users/{id}": {
          get: {
            tags: ["[Data Management] Affiliate Users"],
            summary: "Retrieve an affiliate user by ID",
            description: "Returns a single affiliate user by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the affiliate user",
              },
            ],
            responses: {
              "200": {
                description: "Details of an affiliate user",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/AffiliateUser",
                    },
                  },
                },
              },
            },
          },
          put: {
            tags: ["[Data Management] Affiliate Users"],
            summary: "Update an affiliate user",
            description: "Updates an existing affiliate user by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the affiliate user",
              },
            ],
            responses: {
              "200": {
                description: "Affiliate user updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/AffiliateUser",
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["[Data Management] Affiliate Users"],
            summary: "Delete an affiliate user",
            description: "Removes an affiliate user from the system by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the affiliate user",
              },
            ],
            responses: {
              "200": {
                description: "Affiliate user deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Affiliate user deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/affiliate-client-users": {
          get: {
            tags: ["[Data Management] Affiliate Client Users"],
            summary: "Retrieve all affiliate client users",
            description:
              "Returns a list of all affiliate client users in the system.",
            responses: {
              "200": {
                description: "A list of affiliate client users",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/AffiliateClientUser",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ["[Data Management] Affiliate Client Users"],
            summary: "Create a new affiliate client user",
            description: "Adds a new affiliate client user to the system.",
            responses: {
              "201": {
                description: "Affiliate client user created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/AffiliateClientUser",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/affiliate-client-users/{id}": {
          get: {
            tags: ["[Data Management] Affiliate Client Users"],
            summary: "Retrieve an affiliate client user by ID",
            description: "Returns a single affiliate client user by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the affiliate client user",
              },
            ],
            responses: {
              "200": {
                description: "Details of an affiliate client user",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/AffiliateClientUser",
                    },
                  },
                },
              },
            },
          },
          put: {
            tags: ["[Data Management] Affiliate Client Users"],
            summary: "Update an affiliate client user",
            description: "Updates an existing affiliate client user by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the affiliate client user",
              },
            ],
            responses: {
              "200": {
                description: "Affiliate client user updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/AffiliateClientUser",
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["[Data Management] Affiliate Client Users"],
            summary: "Delete an affiliate client user",
            description:
              "Removes an affiliate client user from the system by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the affiliate client user",
              },
            ],
            responses: {
              "200": {
                description: "Affiliate client user deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Affiliate client user deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/designs": {
          get: {
            tags: ["[Data Management] Designs"],
            summary: "Retrieve all designs",
            description: "Returns a list of all designs in the system.",
            responses: {
              "200": {
                description: "A list of designs",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Design",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ["[Data Management] Designs"],
            summary: "Create a new design",
            description: "Adds a new design to the system.",
            responses: {
              "201": {
                description: "Design created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Design",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/designs/{id}": {
          get: {
            tags: ["[Data Management] Designs"],
            summary: "Retrieve a design by ID",
            description: "Returns a single design by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the design",
              },
            ],
            responses: {
              "200": {
                description: "Details of a design",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Design",
                    },
                  },
                },
              },
            },
          },
          put: {
            tags: ["[Data Management] Designs"],
            summary: "Update a design",
            description: "Updates an existing design by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the design",
              },
            ],
            responses: {
              "200": {
                description: "Design updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Design",
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["[Data Management] Designs"],
            summary: "Delete a design",
            description: "Removes a design from the system by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the design",
              },
            ],
            responses: {
              "200": {
                description: "Design deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Design deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/layers": {
          get: {
            tags: ["[Data Management] Layers"],
            summary: "Retrieve all layers",
            description: "Returns a list of all layers in the system.",
            responses: {
              "200": {
                description: "A list of layers",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Layer",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ["[Data Management] Layers"],
            summary: "Create a new layer",
            description: "Adds a new layer to the system.",
            responses: {
              "201": {
                description: "Layer created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Layer",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/layers/{id}": {
          get: {
            tags: ["[Data Management] Layers"],
            summary: "Retrieve a layer by ID",
            description: "Returns a single layer by its unique identifier.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the layer",
              },
            ],
            responses: {
              "200": {
                description: "Details of a layer",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Layer",
                    },
                  },
                },
              },
              "404": {
                description: "Layer not found",
              },
            },
          },
          put: {
            tags: ["[Data Management] Layers"],
            summary: "Update a layer",
            description: "Updates an existing layer by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the layer",
              },
            ],
            responses: {
              "200": {
                description: "Layer updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Layer",
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["[Data Management] Layers"],
            summary: "Delete a layer",
            description: "Removes a layer from the system by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the layer",
              },
            ],
            responses: {
              "200": {
                description: "Layer deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Layer deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/layouts": {
          get: {
            tags: ["[Data Management] Layouts"],
            summary: "Retrieve all layouts",
            description: "Fetches a list of all layouts in the system.",
            responses: {
              "200": {
                description: "A list of layouts",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Layout",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ["[Data Management] Layouts"],
            summary: "Create a new layout",
            description: "Adds a new layout to the system.",
            responses: {
              "201": {
                description: "Layout created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Layout",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/layouts/{id}": {
          get: {
            tags: ["[Data Management] Layouts"],
            summary: "Retrieve a layout by ID",
            description: "Returns a single layout by its unique identifier.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the layout",
              },
            ],
            responses: {
              "200": {
                description: "Details of a layout",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Layout",
                    },
                  },
                },
              },
              "404": {
                description: "Layout not found",
              },
            },
          },
          put: {
            tags: ["[Data Management] Layouts"],
            summary: "Update a layout",
            description: "Updates an existing layout by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the layout",
              },
            ],
            responses: {
              "200": {
                description: "Layout updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Layout",
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["[Data Management] Layouts"],
            summary: "Delete a layout",
            description: "Removes a layout from the system by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the layout",
              },
            ],
            responses: {
              "200": {
                description: "Layout deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Layout deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/pages": {
          get: {
            tags: ["[Data Management] Pages"],
            summary: "Retrieve all pages",
            description: "Fetches a list of all pages in the system.",
            responses: {
              "200": {
                description: "A list of pages",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Page",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ["[Data Management] Pages"],
            summary: "Create a new page",
            description: "Adds a new page to the system.",
            responses: {
              "201": {
                description: "Page created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Page",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/pages/{id}": {
          get: {
            tags: ["[Data Management] Pages"],
            summary: "Retrieve a page by ID",
            description: "Returns a single page by its unique identifier.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the page",
              },
            ],
            responses: {
              "200": {
                description: "Details of a page",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Page",
                    },
                  },
                },
              },
              "404": {
                description: "Page not found",
              },
            },
          },
          put: {
            tags: ["[Data Management] Pages"],
            summary: "Update a page",
            description: "Updates an existing page by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the page",
              },
            ],
            responses: {
              "200": {
                description: "Page updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Page",
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["[Data Management] Pages"],
            summary: "Delete a page",
            description: "Removes a page from the system by ID.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the page",
              },
            ],
            responses: {
              "200": {
                description: "Page deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Page deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/v1/projects": {
          get: {
            tags: ["[Data Management] Projects"],
            summary: "Retrieve all projects",
            description: "This endpoint retrieves all projects in the system.",
            responses: {
              "200": {
                description: "A list of projects",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Project",
                      },
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
          post: {
            tags: ["[Data Management] Projects"],
            summary: "Create a new project",
            description:
              "This endpoint adds a new project to the system. The request body should include the project's title, description, and other details.",
            responses: {
              "201": {
                description: "Project created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Project",
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
        },
        "/api/v1/projects/{id}": {
          get: {
            tags: ["[Data Management] Projects"],
            summary: "Retrieve a project by ID",
            description:
              "This endpoint retrieves a single project by its unique identifier. The response includes detailed information such as the project's title, description, and associated images.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the project",
              },
            ],
            responses: {
              "200": {
                description: "Details of a single project",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Project",
                    },
                  },
                },
              },
              "404": {
                description: "Project not found",
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
          put: {
            tags: ["[Data Management] Projects"],
            summary: "Update a project",
            description:
              "This endpoint updates an existing project by its unique identifier. The request body should include the project's title, description, and other details.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the project",
              },
            ],
            responses: {
              "200": {
                description: "Project updated",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Project",
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
          delete: {
            tags: ["[Data Management] Projects"],
            summary: "Delete a project",
            description:
              "This endpoint removes a project from the system by its unique identifier.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the project",
              },
            ],
            responses: {
              "200": {
                description: "Project deleted",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Project deleted successfully",
                        },
                      },
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
        },
        "/api/v1/projects/user/{userId}": {
          get: {
            tags: ["[Data Management] Projects"],
            summary: "Retrieve all projects by user ID",
            description:
              "This endpoint retrieves all projects created by a specific user.",
            parameters: [
              {
                name: "userId",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the user",
              },
            ],
            responses: {
              "200": {
                description: "A list of projects",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Project",
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Projects not found",
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
        },
        "/api/v1/services": {
          get: {
            tags: ["[Data Management] Services"],
            summary: "Retrieve all services",
            description:
              "This endpoint retrieves all services available in the system, including their details such as name, description, and associated images.",
            responses: {
              "200": {
                description: "A list of services",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Service",
                      },
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
          post: {
            tags: ["[Data Management] Services"],
            summary: "Create a new service",
            description:
              "This endpoint adds a new service to the system. The request body should include the service's name and description.",
            responses: {
              "201": {
                description: "Service created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Service",
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
        },
        "/api/v1/services/{id}": {
          get: {
            tags: ["[Data Management] Services"],
            summary: "Retrieve a service by ID",
            description:
              "This endpoint retrieves a single service by its unique identifier. The response includes detailed information such as the service's description, operational areas, and images.",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                },
                description: "Unique identifier of the service",
              },
            ],
            responses: {
              "200": {
                description: "Details of a single service",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Service",
                    },
                  },
                },
              },
              "404": {
                description: "Service not found",
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
          post: {
            tags: ["[Data Management] Services"],
            summary: "Create a new service",
            description:
              "This endpoint adds a new service to the system. The request body should include the service's name and description.",
            responses: {
              "201": {
                description: "Service created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Service",
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
              },
              "500": {
                description: "Server error",
              },
            },
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
