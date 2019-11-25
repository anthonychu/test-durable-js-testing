const func = require('../HttpTrigger');

describe('HttpTrigger', function() {

    test('called with a query string should say hello', async function() {
        const context = createMockContext();
        const req = createMockRequest();
        req.query.name = 'Azure Functions';
    
        await func(context, req);
    
        expect(context.res.body).toBe('Hello Azure Functions');
    });
    
    test('called with a body should say hello', async function() {
        const context = createMockContext();
        const req = createMockRequest();
        req.body = {
            name: 'Azure Functions'
        };
    
        await func(context, req);
    
        expect(context.res.body).toBe('Hello Azure Functions');
    });
    
    test('called with no query or body should return HTTP 400', async function() {
        const context = createMockContext();
        const req = createMockRequest();
    
        await func(context, req);
    
        expect(context.res.status).toBe(400);
        expect(context.res.body).toBe('Please pass a name on the query string or in the request body');
    });
});


function createMockContext() {
    return {
        res: {
            status: 200
        },
        log: jest.fn()
    };
}

function createMockRequest() {
    return {
        query: {}
    };
}