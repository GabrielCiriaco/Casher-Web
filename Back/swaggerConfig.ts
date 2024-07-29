import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

// Configurações do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Versão do OpenAPI
        info: {
            title: 'API de Gestão de Usuários',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento de usuários',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    // Caminho para os arquivos de documentação
    apis: ['./src/routes/usersRouter.ts'], // Ajuste o caminho conforme necessário
};

// Gera a especificação Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
