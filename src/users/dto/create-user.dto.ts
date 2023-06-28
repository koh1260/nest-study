import { BadRequestException, Param } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { object } from "joi";

export class CreateUserDto{
    // param을 출력해보면 해당 속성이 속해있는 object의 값도 나온다
    // 즉, 다른 값에 따라 다르게 구현 가능
    // ex) 이름 비번 같은 문자열 포함 안 되게
    @Transform(({ value, obj }) => {
        if(obj.password.includes(obj.name.trim())){
            throw new BadRequestException('password는 name과 같은 문자열을 포함할 수 없습니다.');
        }
        return value.trim();
    })
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @MaxLength(60)
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}