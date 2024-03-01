import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<import("../user/user.entity").UserEntity>;
}
