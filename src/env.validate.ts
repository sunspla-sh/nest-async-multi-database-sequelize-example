import { IsInt, Length, validateSync } from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';

export class EnvVariables {
  @Length(1)
  USER_DATABASE_DIALECT: string;

  @Length(1)
  USER_DATABASE_HOST: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  USER_DATABASE_PORT: number;

  @Length(1)
  USER_DATABASE_DBNAME: string;

  @Length(1)
  USER_DATABASE_USERNAME: string;

  @Length(1)
  USER_DATABASE_PASSWORD: string;

  @Length(1)
  CAT_DATABASE_DIALECT: string;

  @Length(1)
  CAT_DATABASE_DBNAME: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  APPLICATION_PORT: number;
}

export const validateEnvVariables = (config: Record<string, unknown>) => {
  const envVariablesInstance = plainToInstance(EnvVariables, config);

  const errors = validateSync(envVariablesInstance);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return envVariablesInstance;
};
