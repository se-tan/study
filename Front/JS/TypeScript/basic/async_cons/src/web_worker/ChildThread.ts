process.on("message", (data) => console.info("Parent sent a message", data));
process.send({ type: "ack", data: [3] });