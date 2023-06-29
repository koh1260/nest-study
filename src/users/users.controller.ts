import { Body, Controller, DefaultValuePipe, Get, Header, Headers, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLogininDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        const { name, email, password } = dto;
        console.log(dto);
        await this.usersService.createUser(name, email, password);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll;
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;
        // console.log(dto);

        return this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLogininDto) {
        const { email, password } = dto;

        return this.usersService.login(email, password);
    }

    /**
     * 
     * @param userId - ParseIntPipe 틍 pipe로 유효성 검사
     *               - 클래스가 아닌 객체로 생성해서 상태 코드도 변경 가능
     * new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
     * @returns 
     */
    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUserInfo(
        @Headers() headers: any,
        @Param('id') userId: string
    ): Promise<UserInfo> {
        const jwtString = headers.authorization.split('Bearer ')[1];

        this.authService.verify(jwtString);

        return this.usersService.getUserInfo(userId);
    }
}
