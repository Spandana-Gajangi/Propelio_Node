import { ILike } from 'typeorm';
import { countySuggestionRepository } from '../repositories';
import { logService } from '../config/logging/logger.service';

type Counties = {
    fips: string,
    state: string,
    name: string
}
class CountySuggestionService {
    async getCounties(params): Promise<Counties[]> {
        const callerMethodName = 'getCounties';
        let result = [];
        const [param1, param2] = params;
        logService.debug('Get details from db', callerMethodName, __filename, { params });
        if (params.length === 1) {
            result = await countySuggestionRepository.get([{ name: ILike(`%${param1}%`) }, { state: ILike(`%${param1}%`) }]);
        }
        else {
            result = await countySuggestionRepository.get([{ name: ILike(`%${param1}%`), state: ILike(`%${param2}%`) }, { name: ILike(`%${param2}%`), state: ILike(`%${param1}%`) }]);
        }
        logService.debug('Got details from db', callerMethodName, __filename, { params, result });
        if (result) {
            result.forEach((obj) => delete obj.id);
        }
        logService.debug('Returning result', callerMethodName, __filename, { params, result });
        return result;
    }
}

export const countySuggestionService = new CountySuggestionService();