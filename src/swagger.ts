import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';

export const setupSwagger = async (app: INestApplication) => {
    const configService = app.get(ConfigService);
    const swaggerConfig = configService.get('swagger');

    const config = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addBearerAuth()
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true
        },
        customSiteTitle: swaggerConfig.siteTitle,
    };

    SwaggerModule.setup(configService.get('app.docsPath') ?? 'docs', app, document, customOptions);
};