const { chmodSync } = require("fs");
const { homedir } = require("os");
const { join } = require("path");
const { EventEmitter } = require("events");
const { execFile } = require("child_process");
class ClipboardEventListener extends EventEmitter {
  constructor() {
    super();
    this.child = null;
    this.listening = false;
  }

  filePath = join(homedir(), "_tmp_utool");

  async startListening() {
    const { platform } = process;
    if (platform === "win32") {
      this.child = execFile(this.filePath);
    } else if (platform === "linux" || platform === "darwin") {
      chmodSync(this.filePath, 0o755);
      this.child = execFile(this.filePath);
    } else {
      throw "Not yet supported";
    }
    this.child.stdout.on("data", (data) => {
      if (data.trim() === "CLIPBOARD_CHANGE") {
        this.emit("change");
      }
    });
    this.child.stdout.on("close", () => {
      this.emit("close");
      this.listening = false;
    });
    this.child.stdout.on("exit", () => {
      this.emit("exit");
      this.listening = false;
    });
    this.listening = true;
  }
  stopListening() {
    const res = this.child.kill();
    this.removeAllListeners();
    this.listening = false;
    return res;
  }
}

module.exports = new ClipboardEventListener();
