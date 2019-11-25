const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
    outputs.push(yield context.df.callActivity("Hello", "Seattle"));
    outputs.push(yield context.df.callActivity("Hello", "London"));
    const eventResult = yield context.df.waitForExternalEvent("myevent");
    if (eventResult.useTimer) {
        yield context.df.createTimer(new Date('2019-11-23'));
    }
    return outputs;
});