import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
    return {
        secret: process.env.JWT_ACCESS_SECRET,
        refresh: process.env.JWT_REFRESH_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_ACCESS_TOKEN_TTL
        },
        refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL,
    };
});