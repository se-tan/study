process.on("message", function (data) { return console.info("Parent sent a message", data); });
process.send({ type: "ack", data: [3] });
