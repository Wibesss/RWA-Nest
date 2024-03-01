import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { DeveloperEntity } from "./developer.entity";

@Controller("developer")
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}
  
  @Post("addDeveloper")
  async addDeveloper(@Body() anime: DeveloperEntity): Promise<DeveloperEntity> {
    return this.developerService.addDeveloper(anime);
  }

  @Get("getAllDevelopers")
  async getAllDevelopers(): Promise<DeveloperEntity[]> {
    return this.developerService.getAllDevelopers();
  }

  @Get("getDeveloperById/:id")
  getDeveloperById(@Param("id") id: number) {
    return this.developerService.getDeveloperById(id);
  }
}
