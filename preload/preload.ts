import { clipboard } from "electron";
import {
  existsSync,
  createWriteStream,
  writeFileSync,
  readFileSync,
  unlinkSync,
  mkdirSync,
  
} from "fs";
import * as path from "path";
import { dirPath } from "./config";
import clipboardListener from "./clipboard-event";

if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

window.utoolClipboard = {
  clipboardListener,
  clipboard,
  writeFileBase64Sync: (path, data) => {
    const stream = createWriteStream(path);
    stream.write(Buffer.from(data, "base64"));
    stream.close();
  },
  existsSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
  path,
  dirPath,
};
