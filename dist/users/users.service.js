"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const uuid = require("uuid");
let UsersService = class UsersService {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async createUser(name, email, password) {
        await this.checkUserExist(email);
        const signupVerifyToken = uuid.v1();
        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }
    checkUserExist(email) {
        return false;
    }
    saveUser(name, email, password, signupVerifyToken) {
        return;
    }
    async sendMemberJoinEmail(email, signupVerifyToken) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }
    async verifyEmail(signupVerifyToken) {
        throw new Error('Method not implemented');
    }
    async login(email, password) {
        throw new Error('Method not implemented');
    }
    async getUserInfo(userId) {
        throw new Error('Method not implemented');
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map