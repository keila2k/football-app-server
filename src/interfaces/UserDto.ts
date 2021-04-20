import { UserDtoI } from './UserDtoI';

export class UserDto implements UserDtoI {
  uid: string;
  name: string;
  img: string;

  constructor(uid: string, name: string, img: string) {
    this.uid = uid;
    this.name = name;
    this.img = img;
  }
}
