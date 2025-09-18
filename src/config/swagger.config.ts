import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => {
    return {
        site: process.env.APP_NAME,
        title: process.env.SWAGGER_TITLE,
        description: process.env.SWAGGER_DESCRIPTION,
        version: process.env.SWAGGER_VERSION,
    };
});