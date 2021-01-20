import { IsString } from "class-validator";

export class AddUserDto {

  @IsString()
  FIRST_NAME: string;

  @IsString()
  LAST_NAME: string;

  @IsString()
  EMAIL: string;

  @IsString()
  PHONE: string;

  @IsString()
  PSW: string;
}
