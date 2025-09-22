import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

export const setupSwagger = async (app: INestApplication) => {
    const i18n = app.get(I18nService);
    const configService = app.get(ConfigService);
    const swaggerConfig = configService.get('swagger');

    const enConfig = new DocumentBuilder()
        .setTitle(i18n.t('swagger.TITLE'))
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addBearerAuth()
        .build();

    const viConfig = new DocumentBuilder()
        .setTitle(i18n.t('swagger.TITLE'))
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