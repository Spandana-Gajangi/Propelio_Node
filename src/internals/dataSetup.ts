import { proxy } from '../config/db/connection';
import { logService } from '../config/logging/logger.service';
import data from './data.json';

class DataSetup {
    async insertData() {
        try {
            const existingData = await proxy.find(proxy.entities.CountySuggestion, {});
            if (!existingData.length) {
                const dataToBeInserted = data.map((e) => Object.assign(new proxy.entitiesInstance.CountySuggestion(), e));
                await proxy.bulkInsert(proxy.entities.CountySuggestion, dataToBeInserted);
            }
        } catch (err) {
            logService.error('Error in inserting data', 'insertData', __filename, { err });

        }
    }
}

export const dataSetup = new DataSetup();