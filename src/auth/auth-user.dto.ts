import { IsEmail, IsString } from "class-validator";

export class AuthUserDto {
  
  @IsEmail()
  EMAIL: string;

  @IsString()
  PSW: string;
}
