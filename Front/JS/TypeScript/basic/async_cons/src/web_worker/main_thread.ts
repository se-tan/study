import { fork } from "child_process";

let child = fork("./ChildThread.js");

child.on("message", (data) => console.info("Child process sent a message", data));
child.send({ type: "syn", data: [3] });

type Message = string;
type ThreadID = number;
type UserID = number;
type Participants = UserID[];

type Commands = {
  sendMessageToThread: [ThreadID, Message];
  createThread: [Participants];
  addUserToThread: [ThreadID, UserID];
  removeUserFromThread: [ThreadID, UserID];
};

type Events = {
  receiveMessage: [ThreadID, UserID, Message];
  createdThread: [ThreadID, Participants];
  addedUserToThread: [ThreadID, UserID];
  removedUserFromThread: [ThreadID, UserID];
};
