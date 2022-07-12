type Command =
  | { type: "sendMessageToThread"; data: [ThreadID, Message] }
  | { type: "createThread"; data: [Participants] }
  | { type: "AddUserToThread"; data: [ThreadID, UserID] }
  | { type: "removeUserFromThread"; data: [ThreadID, UserID] };

onmessage = (e) => processCommandFromMainThread(e.data);

function processCommandFromMainThread(command: Command) {
  switch (command.type) {
    case "sendMessageToThread":
      let [threadID, message] = command.data;
      console.log(threadID + "\n" + message);
  }
}
