"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModule = void 0;
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const rating_controller_1 = require("./rating.controller");
const game_module_1 = require("../game/game.module");
const user_module_1 = require("../user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const rating_entity_1 = require("./rating.entity");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../auth/constants");
let RatingModule = exports.RatingModule = class RatingModule {
};
exports.RatingModule = RatingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            game_module_1.GameModule,
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([rating_entity_1.RatingEntity]),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: "60s" },
            }),
        ],
        controllers: [rating_controller_1.RatingController],
        providers: [rating_service_1.RatingService],
        exports: [rating_service_1.RatingService],
    })
], RatingModule);
//# sourceMappingURL=rating.module.js.map