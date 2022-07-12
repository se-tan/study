// send
$(document).on("click", "#idBtnDoPost", function () {
  // worker objects
  let worker = new Worker("dowork.js");

  // receive deta asynchronously
  // let aryJSON = [];.

  // results, receive events
  worker.addEventListener(
    "message",
    function (e) {
      $("#idParamReceive").val(e.data);
    },
    false
  );

  // processing instructions
  worker.postMessage($("#idParamPost").val());
});
