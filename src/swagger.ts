import swaggerAutogen from 'swagger-autogen';

const config = {
    info: {
        version: 'v1.0.0',
        title: 'Clinica JAM',
        description: 'Documentação da API do sistema Clinica JAM.'
    },

    servers: [
        {
            url: `http://localhost:${process.env.PORT || 12345}/api/v1`,
            description: 'Servidor de Desenvolvimento'
        }
    ],

    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Insira o token JWT no formato: Bearer {token}'
            }
        }
    },

    security: [{
        bearerAuth: []
    }]
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./src/routers/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, config);