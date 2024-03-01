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
exports.DeveloperController = void 0;
const common_1 = require("@nestjs/common");
const developer_service_1 = require("./developer.service");
const developer_entity_1 = require("./developer.entity");
let DeveloperController = exports.DeveloperController = class DeveloperController {
    constructor(developerService) {
        this.developerService = developerService;
    }
    async addDeveloper(anime) {
        return this.developerService.addDeveloper(anime);
    }
    async getAllDevelopers() {
        return this.developerService.getAllDevelopers();
    }
    getDeveloperById(id) {
        return this.developerService.getDeveloperById(id);
    }
};
__decorate([
    (0, common_1.Post)("addDeveloper"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [developer_entity_1.DeveloperEntity]),
    __metadata("design:returntype", Promise)
], DeveloperController.prototype, "addDeveloper", null);
__decorate([
    (0, common_1.Get)("getAllDevelopers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeveloperController.prototype, "getAllDevelopers", null);
__decorate([
    (0, common_1.Get)("getDeveloperById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DeveloperController.prototype, "getDeveloperById", null);
exports.DeveloperController = DeveloperController = __decorate([
    (0, common_1.Controller)("developer"),
    __metadata("design:paramtypes", [developer_service_1.DeveloperService])
], DeveloperController);
//# sourceMappingURL=developer.controller.js.map