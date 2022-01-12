import Joi from 'joi';
import { iroute } from '../../config/interfaces'
import { countySuggestionController } from '../../controllers/countySuggestion.controller'

const route: iroute[] = [{
    path: '/suggest',
    method: 'GET',
    handler: countySuggestionController.getCounties,
    options: {
        validation: {
            query: {
                q: Joi.string().required()
            }
        },
        description: 'Get suggested counties',
        tags: ['api']
    }
}]

export default route