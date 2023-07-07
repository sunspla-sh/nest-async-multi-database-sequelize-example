import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(1)
  firstName: string;

  @Length(1)
  lastName: string;
}
