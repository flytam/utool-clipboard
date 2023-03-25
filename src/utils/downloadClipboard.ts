import axios from "axios";
import { arrayBufferToBase64 } from "./arraybuffer";

const targetMap = {
  win32:
    "https://raw.githubusercontent.com/sudhakar3697/node-clipboard-event/d2c02920b719d429fda8abe5ad3ab985ac94c28e/platform/clipboard-event-handler-win32.exe",
  linux:
    "https://raw.githubusercontent.com/sudhakar3697/node-clipboard-event/d2c02920b719d429fda8abe5ad3ab985ac94c28e/platform/clipboard-event-handler-linux",
  darwin:
    "https://raw.githubusercontent.com/sudhakar3697/node-clipboard-event/d2c02920b719d429fda8abe5ad3ab985ac94c28e/platform/clipboard-event-handler-mac",
};

export const downloadClipboard = async () => {
  if (
    window.utoolClipboard.existsSync(
      window.utoolClipboard.clipboardListener.filePath
    )
  ) {
    return;
  }

  const { data } = await axios.get(targetMap.darwin, {
    responseType: "arraybuffer",
  });

  const str = arrayBufferToBase64(data);
  window.utoolClipboard.writeFileBase64Sync(
    window.utoolClipboard.clipboardListener.filePath,
    str
  );
};
