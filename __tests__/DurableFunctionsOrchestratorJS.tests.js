const mockDurableFunctions = require('../mockDurableFunctions');
const func = require('../DurableFunctionsOrchestratorJS');
jest.mock('durable-functions', () => mockDurableFunctions);

test('DurableFunctionsOrchestratorJS returns three cities', function () {
    const orchestrator = func.createMockInstance();
    orchestrator
        .addCall('callActivity', jest.fn().mockReturnValue('Hello Tokyo'))
        .addCall('callActivity', jest.fn().mockReturnValue('Hello Seattle'))
        .addCall('callActivity', jest.fn().mockReturnValue('Hello London'))
        .addCall('createTimer', jest.fn());

    const {calls, result} = orchestrator.run();

    const [tokyo, seattle, london] = calls;
    expect(tokyo).toHaveBeenCalledWith('Hello', 'Tokyo');
    expect(seattle).toHaveBeenCalledWith('Hello', 'Seattle');
    expect(london).toHaveBeenCalledWith('Hello', 'London');
    expect(result).toEqual([ 'Hello Tokyo', 'Hello Seattle', 'Hello London' ]);
});