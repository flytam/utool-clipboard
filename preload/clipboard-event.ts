import { chmodSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { EventEmitter } from 'events';
import { execFile, ChildProcess } from 'child_process';
import { dirPath } from './config';

class ClipboardEventListener extends EventEmitter {
  private child: ChildProcess | null;
  private listening: boolean;

  constructor() {
    super();
    this.child = null;
    this.listening = false;
  }

filePath = join( dirPath, "utool_clipboard");

  public async startListening() {
    const platform = process.platform;
    if (platform === "win32") {
      this.child = execFile(this.filePath);
    } else if (platform === "linux" || platform === "darwin") {
      chmodSync(this.filePath, 0o755);
      this.child = execFile(this.filePath);
    } else {
      throw new Error("Not yet supported");
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

    public stopListening() {
       const res = this.child.kill();
       this.removeAllListeners();
       return res;	
    }
}

export default new ClipboardEventListener();