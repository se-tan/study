onmessage = function (e) { return processCommandFromMainThread(e.data); };
function processCommandFromMainThread(command) {
    switch (command.type) {
        case "sendMessageToThread":
            var _a = command.data, threadID = _a[0], message = _a[1];
            console.log(threadID + "\n" + message);
    }
}
