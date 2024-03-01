import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { Response } from "express";
import { LoginDTO } from "./LoginDTO";
import { JwtService } from "@nestjs/jwt";
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    create(user: UserEntity): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(id: number): Promise<UserEntity>;
    login(loginDto: LoginDTO, response: Response): Promise<{
        message: string;
    }>;
    getLoggedUser(request: any): Promise<UserEntity>;
    addGameToUser(userId: number, gameId: number): Promise<UserEntity>;
    updateUserPhoto(userId: string, photo: any): Promise<UserEntity>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    getGamesforUser(userId: number): Promise<import("../game/game.entity").GameEntity[]>;
    getUser(userId: number): Promise<import("../game/game.entity").GameEntity[]>;
    getUserByUsername(username: string): Promise<import("../game/game.entity").GameEntity[]>;
}
