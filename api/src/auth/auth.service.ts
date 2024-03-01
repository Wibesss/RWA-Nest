import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUser(username);
    if (userDB && (await bcrypt.compare(password, userDB.password))) {
      return userDB;
    }
    return null;
  }

}
