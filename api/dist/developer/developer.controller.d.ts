import { DeveloperService } from "./developer.service";
import { DeveloperEntity } from "./developer.entity";
export declare class DeveloperController {
    private readonly developerService;
    constructor(developerService: DeveloperService);
    addDeveloper(anime: DeveloperEntity): Promise<DeveloperEntity>;
    getAllDevelopers(): Promise<DeveloperEntity[]>;
    getDeveloperById(id: number): Promise<DeveloperEntity>;
}
