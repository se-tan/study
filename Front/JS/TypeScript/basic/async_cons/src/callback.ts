import * as fs from "fs";

// fetch data from Apache server's access log
fs.readFile("/var/log/apache2/access_log", { encoding: "utf8" }, (error, data) => {
  if (error) {
    console.error("Error reading!", error);
    return;
  }
  console.info("success reading!", data);
});

// write data to access log at the same time
fs.appendFile("/var/log/apache2/access_log", "New access log entry", (error) => {
  if (error) {
    console.error("Error writing!", error);
  }
});