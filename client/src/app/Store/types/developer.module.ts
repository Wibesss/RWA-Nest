export interface Developer {
  id?: number;
  name?: string;
  photoURL?: string;
}
export class DeveloperModel implements Developer {
  id?: number;
  name?: string;
  photoURL?: string;
  constructor(id?: number, name?: string, photoURL?: string) {
    this.id = id;
    this.name = name;
    this.photoURL = photoURL;
  }
}
