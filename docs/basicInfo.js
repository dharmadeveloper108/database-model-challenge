module.exports = {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "Database model challenge API", // short title.
    description: "Simple API to sort tables from a database model", //  desc.
    version: "1.0.0", // version number
  },
  servers: [{
    url: "http://localhost:4000/", // url
    description: "Local server", // name
  }, ],
  components: {
    schemas: {
      DatabaseModel: {
        type: 'array',
        xml: {
          wrapped: true,
        },
        items: {
          $ref: "#/Table"
        }
      },
    }
  },
  Table: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: "name",
        example: "payment_request"
      },
      columns: {
        type: 'array',
        xml: {
          wrapped: true,
        },
        items: 
          {
            $ref: "#/Item"
          }
      },
    }
  },
  Item: {
    type: 'object',
    properties: {
      name: {
        type: "string",
        example: "created_by_user"
      },
      foreign_key: {
        type: "string",
        example: "users.id"
      }
    }
  },
  paths:{
    '/sortTablesFromFile':{
      get: {
        tags: ['Get sorted tables from file'],
        description: "Get sorted tables",
        operationId: 'getSortTablesFromFile',
        parameters: [],
        responses: {
          '200': {
            description: "Result",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DatabaseModel'
                }
              }
            }
          },
          '400': {
            description: "Error",
          }
        }
      }
    },
    '/sortTables':{
      post: {
        tags: ['Get sorted tables from request body'],
        description: "Get sorted tables from request body",
        operationId: 'sortTables',
        parameters: [],
        requestBody: {
          content:{
              'application/json': {
                  schema:{
                      $ref:'#/components/schemas/DatabaseModel'
                  }
              }
          }
      },
        responses: {
          '200': {
            description: "Result",
          },
          '400': {
            description: "Error: invalid database model",
          }
        }
      }
    },
  }
};