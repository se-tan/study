// worker
self.addEventListener(
  "message",
  function (e) {
    // send pocessing results
    this.self.postMessage(e.data);
  },
  false
);
