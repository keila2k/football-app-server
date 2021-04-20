import { GeneralDtoI } from '../interfaces/GeneralDtoI';
import generalModel from '../models/general.model';

class GeneralService {
  public general = generalModel;

  public async getGeneral(): Promise<GeneralDtoI> {
    let find: GeneralDtoI[] = await this.general.find();
    if (find.length > 0) {
      return find[0];
    }
    return undefined;
  }
}

export default GeneralService;
