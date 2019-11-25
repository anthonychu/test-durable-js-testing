const mockDurableFunctions = require('../mockDurableFunctions');
const func = require('../DurableFunctionsOrchestratorJS');
jest.mock('durable-functions', () => mockDurableFunctions);

describe('DurableFunctionsOrchestratorJS', function() {
    test('should return three cities', function () {
        const orchestrator = func.createMockInstance();
        orchestrator
            .addCallActivity(jest.fn().mockReturnValue('Hello Tokyo'))
            .addCallActivity(jest.fn().mockReturnValue('Hello Seattle'))
            .addCallActivity(jest.fn().mockReturnValue('Hello London'))
            .addWaitForExternalEvent(jest.fn().mockReturnValue({ useTimer: true }))
            .addCreateTimer(jest.fn());
    
        const {calls, result} = orchestrator.run();
    
        const [tokyo, seattle, london, waitForExternalEvent] = calls;
        expect(tokyo).toHaveBeenCalledWith('Hello', 'Tokyo');
        expect(seattle).toHaveBeenCalledWith('Hello', 'Seattle');
        expect(london).toHaveBeenCalledWith('Hello', 'London');
        expect(waitForExternalEvent).toHaveBeenCalledWith('myevent');
        expect(result).toEqual([ 'Hello Tokyo', 'Hello Seattle', 'Hello London' ]);
    });
});