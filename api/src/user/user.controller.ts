import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
  Param,
  Put,
} from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { LoginDTO } from "./LoginDTO";
import { JwtService } from "@nestjs/jwt";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post("addUser")
  create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Get("getAllUsers")
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Get('getUserById/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Body() loginDto: LoginDTO,
    @Res({ passthrough: true }) response: Response
  ) {
    const token = await this.userService.login(loginDto);
    response.cookie("jwt", token, { httpOnly: false });
    return { message: "success" };
  }

  @Get("getLoggedUser")
  async getLoggedUser(@Req() request: any) {
    let cookie = request.cookies["jwt"];
    const data = await this.jwtService.verifyAsync(cookie);
    const userDb = await this.userService.getUserById(data.id);
    return userDb;
  }

  @Post("addGameToUser/:userId/:gameId")
  async addGameToUser(
    @Param("userId") userId: number,
    @Param("gameId") gameId: number
  ): Promise<UserEntity> {
    return this.userService.addGameToUser(userId, gameId);
  }

  @Put("updateUserPhoto/:userId")
  async updateUserPhoto(
    @Param("userId") userId: string,
    @Body("photo") photo: any
  ): Promise<UserEntity> {
    return this.userService.updateUserPhoto(userId, photo);
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");
    return {
      message: "success",
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("getGamesforUser/:userId")
  async getGamesforUser(@Param("userId") userId: number) {
    const user = await this.userService.getGamesforUser(userId);
    return user.gameList;
  }

  @Get("getGamesforUser/:userId")
  async getUser(@Param("userId") userId: number) {
    const user = await this.userService.getGamesforUser(userId);
    return user.gameList;
  }

  @Get("getUserByUsername/:username")
  async getUserByUsername(@Param("userId") username: string) {
    const user = await this.userService.getUserByUsername(username);
    return user.gameList;
  }
}
