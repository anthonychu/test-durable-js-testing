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
                const context = {
                    df: {
                        callActivity() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'callActivity';
                        },
                        callActivityWithRetry() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'callActivityWithRetry';
                        },
                        callEntity() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'callEntity';
                        },
                        callSubOrchestrator() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'callSubOrchestrator';
                        },
                        callSubOrchestratorWithRetry() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'callSubOrchestratorWithRetry';
                        },
                        callHttp() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'callHttp';
                        },
                        continueAsNew() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'continueAsNew';
                        },
                        createTimer() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'createTimer';
                        },
                        waitForExternalEvent() {
                            currentCall.arguments = arguments;
                            currentCall.functionName = 'waitForExternalEvent';
                        }
                    }
                };
                return {
                    addCall(functionName, callFunction) {
                        calls.push({
                            functionName,
                            callFunction
                        });
                        return this;
                    },
                    run() {
                        const generator = fn(context);
                        let result;
                        for (const call of [firstCall, ...calls]) {
                            if (call.functionName && call.functionName !== currentCall.functionName) {
                                throw `${call.functionName} does not match expected call of ${currentCall.functionName}`;
                            }
                            result = generator.next(call.callFunction.apply(call.callFunction, currentCall.arguments));
                        }
                        return {
                            calls: calls.map(c => c.callFunction),
                            result: result.value
                        };
                    },
                    getCalls() {
                        return calls;
                    }
                };
            }
        };
    }
};

module.exports = mockOrchestrator;