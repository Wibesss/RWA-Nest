import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { LoginDTO } from "./LoginDTO";
import { JwtService } from "@nestjs/jwt";
import { GameService } from "src/game/game.service";
export declare class UserService {
    private readonly userRepository;
    private readonly gameService;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, gameService: GameService, jwtService: JwtService);
    createUser(user: UserEntity): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    findUser(username: string): Promise<UserEntity>;
    getUserById(id: number): Promise<UserEntity | null>;
    login(loginDto: LoginDTO): Promise<string>;
    addGameToUser(userId: number, gameId: number): Promise<UserEntity>;
    updateUserPhoto(userId: string, photo: string): Promise<UserEntity>;
    getUserByUsername(username: string): Promise<UserEntity>;
    getGamesforUser(userId: number): Promise<UserEntity>;
    findUserById(userId: number): Promise<UserEntity>;
}
