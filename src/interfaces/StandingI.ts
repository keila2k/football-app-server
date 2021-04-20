import { GroupI } from './GroupI';
import { GroupItemI } from './GroupItemI';

export interface StandingI {
  group: GroupI;
  items: GroupItemI[];
}
