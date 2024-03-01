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
exports.UserEntity = void 0;
const game_entity_1 = require("../game/game.entity");
const rating_entity_1 = require("../rating/rating.entity");
const review_entity_1 = require("../review/review.entity");
const typeorm_1 = require("typeorm");
let UserEntity = exports.UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "photoURL", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_entity_1.RatingEntity, (rating) => rating.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => game_entity_1.GameEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "gameList", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
//# sourceMappingURL=user.entity.js.map