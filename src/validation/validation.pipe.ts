import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidationPipe implements PipeTransform{
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)){
            return value;
        }
        const object = plainToClass(metatype, value);
        const error = await validate(object);
        if(error.length > 0){
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean{
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}