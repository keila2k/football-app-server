export interface UserDetails {
  uid: string;
  name: string;
  img: string;
}

export class UserDetailsImpl implements UserDetails {
  uid: string;
  img: string;
  name: string;

}

