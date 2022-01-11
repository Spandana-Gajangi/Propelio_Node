import sinon from 'sinon';
import { countySuggestionRepository } from '../repositories';
import { countySuggestionService } from '../services';

describe('CountySuggest service', () => {
    beforeAll(() => {
    });
    it('pass state in query', async () => {
        const param = 'TX';
        const stub = sinon.stub(countySuggestionRepository, 'get')
        stub.withArgs([{ name: param }, { state: param }])
            .resolves([{ id: 1, fips: '48263', state: 'TX', name: 'Kent' }]);

        const result = await countySuggestionService.getCounties([param]);

        expect(stub.calledOnce).toBe(true);
        expect(result).toStrictEqual([{ fips: '48263', state: 'TX', name: 'Kent' }])

    })

    it('pass name in query', async () => {
        const param = 'Kent';
        const stub = sinon.stub(countySuggestionRepository, 'get')
        stub.withArgs([{ name: param }, { state: param }])
            .resolves([{ id: 1, fips: '48263', state: 'TX', name: 'Kent' }]);

        const result = await countySuggestionService.getCounties([param]);

        expect(stub.calledOnce).toBe(true);
        expect(result).toStrictEqual([{ fips: '48263', state: 'TX', name: 'Kent' }])

    })

    it('pass state and name in query respectively', async () => {
        const param1 = 'TX';
        const param2 = 'Kent';
        const stub = sinon.stub(countySuggestionRepository, 'get')
        stub.withArgs([{ name: param1, state: param2 }, { name: param2, state: param1 }])
            .resolves([{ id: 1, fips: '48263', state: 'TX', name: 'Kent' }]);

        const result = await countySuggestionService.getCounties([param1, param2]);

        expect(stub.calledOnce).toBe(true);
        expect(result).toStrictEqual([{ fips: '48263', state: 'TX', name: 'Kent' }])

    })

    it('pass name and state in query respectively', async () => {
        const param1 = 'Kent';
        const param2 = 'Tx';
        const stub = sinon.stub(countySuggestionRepository, 'get')
        stub.withArgs([{ name: param1, state: param2 }, { name: param2, state: param1 }])
            .resolves([{ id: 1, fips: '48263', state: 'TX', name: 'Kent' }]);

        const result = await countySuggestionService.getCounties([param1, param2]);

        expect(stub.calledOnce).toBe(true);
        expect(result).toStrictEqual([{ fips: '48263', state: 'TX', name: 'Kent' }])

    })
})