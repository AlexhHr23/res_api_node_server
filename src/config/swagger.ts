import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeSript',
            version: '1.0.0',
            description: "API Docs for Products"
        }
    },

    apis: [
        './src/router.ts'
    ]
}


const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOpionts : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://miro.medium.com/v2/resize:fit:1200/1*23BkSGzcN3cBxvTuf0zFfg.png');
            height: 80px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}

export default swaggerSpec
export {
    swaggerUiOpionts
}