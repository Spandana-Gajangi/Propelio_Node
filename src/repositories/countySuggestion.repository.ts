import { proxy } from '../config/db/connection';

class CountySuggestionRepository {
    async get(condition) {
        return await proxy.find(proxy.entities.CountySuggestion, condition);
    }
}

export const countySuggestionRepository = new CountySuggestionRepository();