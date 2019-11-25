const func = require('../QueueTrigger');

describe('QueueTrigger', function() {
    test('should output to blob', async function() {
        const context = createMockContext();
        const queueItem = 'Hello Azure Functions';

        await func(context, queueItem);

        expect(context.bindings.outputBlob).toBe('Hello Azure Functions');
    });

    test('called with empty message should not output to blob', async function() {
        const context = createMockContext();
        const queueItem = '';

        await func(context, queueItem);

        expect(context.bindings.outputBlob).toBeUndefined();
    });
});


function createMockContext() {
    return {
        log: jest.fn(),
        bindings: {}
    };
}
