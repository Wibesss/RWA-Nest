import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { LoginDTO } from "./LoginDTO";
import { JwtService } from "@nestjs/jwt";
import { GameEntity } from "src/game/game.entity";
import { GameService } from "src/game/game.service";
const bcrypt = require("bcrypt");

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(GameService)
    private readonly gameService: GameService,

    private jwtService: JwtService
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    const { username, password } = user;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException("Username already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    user.role = "user";
    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findUser(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneById(id);
  }

  
  async login(loginDto: LoginDTO) {
    const user: UserEntity = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username=:name", { name: loginDto.username })
      .getOne();
    const jwt = await this.jwtService.signAsync({ id: user.id, role: user.role });
    return jwt;
  }



  async addGameToUser(userId: number, gameId: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.gameList", "game")
      .where("user.id = :userId", { userId })
      .getOneOrFail();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const game = await this.gameService.findGameById(gameId);
    if (!game) {
      throw new NotFoundException("Game not found");
    }
    if (!user.gameList) {
      user.gameList = [];
    }
    const alreadyExists = user.gameList.some(
      (existingGame) => existingGame.id === gameId
    );
    if (alreadyExists) {
      throw new ConflictException("User already has this game in his list");
    }
    user.gameList.push(game);
    await this.userRepository.save(user);
    return user;
  }

  async updateUserPhoto(userId: string, photo: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        username: userId,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    console.log(user.photoURL);
    console.log(photo);
    user.photoURL = photo;
    await this.userRepository.save(user);
    return user;
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async getGamesforUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["gameList"],
    });
    return user;
  }

  async findUserById(userId: number) {
    return this.userRepository.findOneById(userId);
  }
}
