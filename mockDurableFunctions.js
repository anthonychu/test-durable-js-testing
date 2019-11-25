const mockOrchestrator = {
    orchestrator: function (fn) {
        return {
            createMockInstance() {
                const currentCall = {
                    arguments: [],
                    functionName: null
                };
                const calls = [];
                const firstCall = {
                    callFunction() { }
                };
                const createCallHandler = function (callFunctionName) {
                    return function () {
                        currentCall.arguments = arguments;
                        currentCall.functionName = callFunctionName;
                    };
                };
                const addCallHandler = function (_this, propName, functionName) {
                    _this[propName] = function (callFunction) {
                        calls.push({
                            functionName,
                            callFunction
                        });
                        return _this;
                    };
                };
                const context = {
                    df: {
                        callActivity: createCallHandler('callActivity'),
                        callActivityWithRetry: createCallHandler('callActivityWithRetry'),
                        callEntity: createCallHandler('callEntity'),
                        callSubOrchestrator: createCallHandler('callSubOrchestrator'),
                        callSubOrchestratorWithRetry: createCallHandler('callSubOrchestratorWithRetry'),
                        callHttp: createCallHandler('callHttp'),
                        continueAsNew: createCallHandler('continueAsNew'),
                        createTimer: createCallHandler('createTimer'),
                        waitForExternalEvent: createCallHandler('waitForExternalEvent'),
                        Task: {
                            all: createCallHandler('Task.all'),
                            any: createCallHandler('Task.any')
                        }
                    }
                };

                const mockOrchestratorInstance = {
                    addCall(functionName, callFunction) {
                        calls.push({
                            functionName,
                            callFunction
                        });
                        return this;
                    },
                    run() {
                        const generator = fn(context);
                        let lastResult;
                        for (const call of [firstCall, ...calls]) {
                            if (lastResult && lastResult.done) {
                                throw 'Orchestrator has already completed';
                            }
                            if (call.functionName && call.functionName !== currentCall.functionName) {
                                throw `${call.functionName} does not match expected call of ${currentCall.functionName}`;
                            }
                            lastResult = generator.next(call.callFunction.apply(call.callFunction, currentCall.arguments));
                        }
                        return {
                            calls: calls.map(c => c.callFunction),
                            result: lastResult.value
                        };
                    },
                    getCalls() {
                        return calls;
                    }
                };
                addCallHandler(mockOrchestratorInstance, 'addCallActivity', 'callActivity');
                addCallHandler(mockOrchestratorInstance, 'addCallActivityWithRetry', 'callActivityWithRetry');
                addCallHandler(mockOrchestratorInstance, 'addCallEntity', 'callEntity');
                addCallHandler(mockOrchestratorInstance, 'addCallSubOrchestrator', 'callSubOrchestrator');
                addCallHandler(mockOrchestratorInstance, 'addCallSubOrchestratorWithRetry', 'callSubOrchestratorWithRetry');
                addCallHandler(mockOrchestratorInstance, 'addCallHttp', 'callHttp');
                addCallHandler(mockOrchestratorInstance, 'addContinueAsNew', 'continueAsNew');
                addCallHandler(mockOrchestratorInstance, 'addCreateTimer', 'createTimer');
                addCallHandler(mockOrchestratorInstance, 'addWaitForExternalEvent', 'waitForExternalEvent');
                addCallHandler(mockOrchestratorInstance, 'addTaskAll', 'Task.all');
                addCallHandler(mockOrchestratorInstance, 'addTaskAny', 'Task.any');
                return mockOrchestratorInstance;
            }
        };
    }
};

module.exports = mockOrchestrator;