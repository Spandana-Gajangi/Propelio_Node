import { Request, ResponseToolkit } from '@hapi/hapi';
import response from '../utils/response';
import { logService } from '../config/logging/logger.service';
import { errorHandler } from '../middlewares/error';
import { countySuggestionService } from '../services';


class CountySuggestionController {
    async getCounties(req: Request, h: ResponseToolkit): Promise<any> {
        const callerMethodName = 'getCounties';
        try {
            const q: string = <string>req.query.q;
            let params = q.split(',');
            params = params.map((e) => e.trim());
            const result = await countySuggestionService.getCounties(params);
            const payload = response(200, result)
            return h.response(payload);
        } catch (err) {
            logService.error('Error occurred in get counties', callerMethodName, __filename, { err, req });
            return errorHandler.unExpected(err);
        }
    }
}

export const countySuggestionController = new CountySuggestionController();