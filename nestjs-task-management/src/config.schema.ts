import * as joi from '@hapi/joi';

export const configValidationSchema = joi.object({
  NODE_ENV: joi.string().required(),
  PORT: joi.number().default(3000).required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required().default(5432),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),
  JWT_SECRET: joi.string().required(),
});
