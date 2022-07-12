function waitAndAnswer(message: string): Promise<any> {
  console.log("Wait for 3 seconds.");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`You said ${message}`);
      resolve;
    }, 3000);
  });
}

async function exec() {
  console.log("step 1");
  await waitAndAnswer("hi");
  console.log("step 2");
  await waitAndAnswer("Hello");
  console.log("end");
}

exec();
