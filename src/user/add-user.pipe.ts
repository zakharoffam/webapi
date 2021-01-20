import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";


@Injectable()
export class AddUserPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    // Проверка валидности email
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!re.test(object.EMAIL)) {
      throw new HttpException(
        `Адрес электронной почты не действительный`,
        HttpStatus.BAD_REQUEST
      );
    };

    const errors = await validate(object);
    if (errors.length > 0) {
      const errorsBody = errors.map(err => {
        return err.property
      })
      throw new HttpException(
        `Не переданы либо переданы не валидные данные: ${errorsBody}`,
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
