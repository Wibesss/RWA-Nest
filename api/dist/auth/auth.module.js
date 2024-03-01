"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../user/user.entity");
const local_strategy_1 = require("./local.strategy");
const dist_1 = require("@nestjs/jwt/dist");
const game_entity_1 = require("../game/game.entity");
const game_module_1 = require("../game/game.module");
const user_module_1 = require("../user/user.module");
const constants_1 = require("./constants");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            typeorm_1.TypeOrmModule.forFeature([game_entity_1.GameEntity]),
            game_module_1.GameModule,
            user_module_1.UserModule,
            passport_1.PassportModule,
            dist_1.JwtModule,
            dist_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: "60s" },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: "AUTH_SERVICE",
                useClass: auth_service_1.AuthService,
            },
            {
                provide: "USER_SERVICE",
                useClass: user_service_1.UserService,
            },
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map