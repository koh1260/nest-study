import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
