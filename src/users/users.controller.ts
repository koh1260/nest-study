import { BadRequestException, Body, Controller, DefaultValuePipe, Get, Header, Headers, HttpStatus, Inject, Param, ParseIntPipe, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLogininDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from './decorator/user.logined';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

interface User{
    userId: string,
    email: string,
}

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger,
    ) { }

    // Winston
    printWinston(dto: unknown){
        this.logger.getWinstonLogger().silly('silly', dto);
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        const { name, email, password } = dto;

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
        this.printWinston(dto);

        return this.usersService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get('/hello')
    getHello(@User() user: User){
        this.usersService.getHello();
        console.log(user);
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
