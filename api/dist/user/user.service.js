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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const jwt_1 = require("@nestjs/jwt");
const game_service_1 = require("../game/game.service");
const bcrypt = require("bcrypt");
let UserService = exports.UserService = class UserService {
    constructor(userRepository, gameService, jwtService) {
        this.userRepository = userRepository;
        this.gameService = gameService;
        this.jwtService = jwtService;
    }
    async createUser(user) {
        const { username, password } = user;
        const existingUser = await this.userRepository.findOne({
            where: { username },
        });
        if (existingUser) {
            throw new common_1.ConflictException("Username already exists");
        }
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
        user.role = "user";
        return this.userRepository.save(user);
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    findUser(username) {
        return this.userRepository.findOne({
            where: { username },
        });
    }
    async getUserById(id) {
        return this.userRepository.findOneById(id);
    }
    async login(loginDto) {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .where("user.username=:name", { name: loginDto.username })
            .getOne();
        const jwt = await this.jwtService.signAsync({ id: user.id, role: user.role });
        return jwt;
    }
    async addGameToUser(userId, gameId) {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.gameList", "game")
            .where("user.id = :userId", { userId })
            .getOneOrFail();
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const game = await this.gameService.findGameById(gameId);
        if (!game) {
            throw new common_1.NotFoundException("Game not found");
        }
        if (!user.gameList) {
            user.gameList = [];
        }
        const alreadyExists = user.gameList.some((existingGame) => existingGame.id === gameId);
        if (alreadyExists) {
            throw new common_1.ConflictException("User already has this game in his list");
        }
        user.gameList.push(game);
        await this.userRepository.save(user);
        return user;
    }
    async updateUserPhoto(userId, photo) {
        const user = await this.userRepository.findOne({
            where: {
                username: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        console.log(user.photoURL);
        console.log(photo);
        user.photoURL = photo;
        await this.userRepository.save(user);
        return user;
    }
    async getUserByUsername(username) {
        return await this.userRepository.findOneBy({ username: username });
    }
    async getGamesforUser(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: ["gameList"],
        });
        return user;
    }
    async findUserById(userId) {
        return this.userRepository.findOneById(userId);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, common_1.Inject)(game_service_1.GameService)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        game_service_1.GameService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map