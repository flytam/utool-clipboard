const { clipboard } = require("electron");
const { existsSync, createWriteStream } = require("fs");
const clipboardListener = require("./clipboard-event/index");

window.utoolClipboard = {
  clipboardListener,
  clipboard,
  writeFileBase64Sync: (path, data) => {
    const stream = createWriteStream(path);
    stream.write(Buffer.from(data, "base64"));
    stream.close();
  },
  existsSync,
};
