module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    if (myQueueItem) {
        context.bindings.outputBlob = myQueueItem;
    }
};