import { Injectable } from "@nestjs/common";
import { DeveloperEntity } from "./developer.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(DeveloperEntity)
    private readonly developerRepository: Repository<DeveloperEntity> // private readonly animeService: AnimeService,
  ) {}

  async getAllDevelopers(): Promise<DeveloperEntity[]> {
    return await this.developerRepository.find();
  }

  async getDeveloperById(developerid: number): Promise<DeveloperEntity> {
    return this.developerRepository.findOneById(developerid);
  }

  async addDeveloper(developer: DeveloperEntity): Promise<DeveloperEntity> {
    return this.developerRepository.save(developer);
  }

  async findDeveloperById(developerId: number): Promise<DeveloperEntity> {
    return this.developerRepository.findOneById(developerId);
  }
}
