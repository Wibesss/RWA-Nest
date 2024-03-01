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
exports.GameEntity = void 0;
const developer_entity_1 = require("../developer/developer.entity");
const rating_entity_1 = require("../rating/rating.entity");
const review_entity_1 = require("../review/review.entity");
const typeorm_1 = require("typeorm");
let GameEntity = exports.GameEntity = class GameEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GameEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GameEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GameEntity.prototype, "photoURL", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 4, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], GameEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => developer_entity_1.DeveloperEntity, (developer) => developer.games),
    __metadata("design:type", developer_entity_1.DeveloperEntity)
], GameEntity.prototype, "developer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_entity_1.RatingEntity, (rating) => rating.game),
    __metadata("design:type", Array)
], GameEntity.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (review) => review.game),
    __metadata("design:type", Array)
], GameEntity.prototype, "reviews", void 0);
exports.GameEntity = GameEntity = __decorate([
    (0, typeorm_1.Entity)("game")
], GameEntity);
//# sourceMappingURL=game.entity.js.map