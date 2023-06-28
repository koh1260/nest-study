import { Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLogininDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { ValidationPipe } from 'src/validation/validation.pipe';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void>{
        const {name, email, password} = dto;
        console.log(dto);
        await this.usersService.createUser(name, email, password);
    }

    @Get()
    async findAll(){
        return this.usersService.findAll;
    }

    @Get('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string>{
        const {signupVerifyToken} = dto;
        console.log(dto);

        return;
    }

    @Post('/login')
    async login(@Body() dto: UserLogininDto){
        const {email, password} = dto;

        return this.usersService.login(email, password);
    }

    /**
     * 
     * @param userId - ParseIntPipe 틍 pipe로 유효성 검사
     *               - 클래스가 아닌 객체로 생성해서 상태 코드도 변경 가능
     * new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
     * @returns 
     */
    @Get('/:id')
    async getUserInfo(
        @Param('id') userId: string): Promise<UserInfo>{
        return await this.usersService.getUserInfo(userId);
    }
}
