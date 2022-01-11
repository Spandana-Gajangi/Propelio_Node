import Boom from 'boom';
import { logService } from '../config/logging/logger.service';

// Add more error methods based on requirement
class ErrorHandler {
    unExpected(error) {
        logService.error('unExpected', __filename, 'Unexpected error', error);
        return Boom.internal('Internal server error');
    }
}

export const errorHandler = new ErrorHandler();