import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app/app.module';
import { setupSwagger } from '@app/swagger';

async function bootstrap() {
  const appOptions = {'cors': true};
  const app = await NestFactory.create(AppModule, appOptions);
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');

  app.setGlobalPrefix(configService.get('app.globalPrefix') ?? 'api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get('swagger.version') ?? '1',
  });

  setupSwagger(app);

  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}
bootstrap();
