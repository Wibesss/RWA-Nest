import { DeveloperEntity } from "./developer.entity";
import { Repository } from "typeorm";
export declare class DeveloperService {
    private readonly developerRepository;
    constructor(developerRepository: Repository<DeveloperEntity>);
    getAllDevelopers(): Promise<DeveloperEntity[]>;
    getDeveloperById(developerid: number): Promise<DeveloperEntity>;
    addDeveloper(developer: DeveloperEntity): Promise<DeveloperEntity>;
    findDeveloperById(developerId: number): Promise<DeveloperEntity>;
}
