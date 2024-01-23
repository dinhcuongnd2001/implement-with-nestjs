import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCatDto {
  @IsEmail(undefined, { message: 'Must be Email' })
  email: string;

  @IsNotEmpty({ message: 'Must be string' })
  password: string;

  @IsNumber(undefined, { message: 'Number required' })
  @IsOptional()
  check: boolean;
}
