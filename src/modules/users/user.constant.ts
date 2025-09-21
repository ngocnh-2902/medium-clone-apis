export const USER_CONSTANTS = {
    DEFAULT_ROLE: 'user',
    MAX_LOGIN_ATTEMPTS: 5,
    PASSWORD_SALT_ROUNDS: 10,
    ERRORS: {
        USER_NOT_FOUND: 'User not found',
        EMAIL_ALREADY_EXISTS: 'Email already exists',
        INVALID_PASSWORD: 'Invalid password',
    },
    VALIDATION: {
        MAX_EMAIL_LENGTH: 255,
        EMAIL_REGEX: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        MIN_PASSWORD_LENGTH: 8,
        MAX_PASSWORD_LENGTH: 64

    }
};