const func = require('../DurableFunctionsOrchestratorJS');

jest.mock('durable-functions', () => {
    let _lastValue;
    const context = {
        df: {
            callActivity: jest.fn(function (functionName, input) {
                _lastValue = input;
            })
        }
    };
    return {
        orchestrator: function(fn) {
            return function(ctx) {
                const f = fn(context);
                let gen;
                do {
                    // playback last value
                    gen = f.next(_lastValue);
                } while(!gen.done);
            };
        }
    };
});

test('run func', function () {
    func();
});