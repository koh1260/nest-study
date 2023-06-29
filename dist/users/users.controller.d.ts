import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLogininDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(dto: CreateUserDto): Promise<void>;
    findAll(): Promise<() => Promise<UserInfo[]>>;
    verifyEmail(dto: VerifyEmailDto): Promise<string>;
    login(dto: UserLogininDto): Promise<string>;
    getUserInfo(headers: any, userId: string): Promise<UserInfo>;
}
