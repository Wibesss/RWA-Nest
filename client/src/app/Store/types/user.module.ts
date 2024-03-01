export interface User {
  id?: number;
  role?: string;
  firstName?: string;
  lasteName?: string;
  username?: string;
  password?: string;
  photoURL?: string;
}
export class UserModel implements User {
  id?: number;
  role?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  photoURL?: string;

  constructor(
    id?: number,
    role?: string,
    firstName?: string,
    lastName?: string,
    username?: string,
    password?: string,
    photoURL?: string
  ) {
    this.id = id;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.photoURL = photoURL;
  }
}
