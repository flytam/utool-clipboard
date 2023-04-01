import { EventEmitter } from "events";
import { Clipboard } from "electron";
import { writeFileSync, existsSync, readFileSync, unlinkSync } from "fs";
import * as path from "path";

declare global {
  interface ClipboardEventListener extends EventEmitter {
    startListening(): void;
    stopListening(): void;
    filePath: string;
  }

  interface utoolClipboard {
    clipboardListener: ClipboardEventListener;
    clipboard: Clipboard;
    writeFileBase64Sync: (filePath: string, str: string) => void;

    existsSync: typeof existsSync;
    writeFileSync: typeof writeFileSync;
    readFileSync: typeof readFileSync;
    unlinkSync: typeof unlinkSync;

    path: typeof path;
    // ~/.utool_clipboard/xxx
    dirPath: string;
  }

  interface Window {
    utoolClipboard: utoolClipboard;
  }

  const DEBUG: boolean;

  interface UToolsApi {
    /**
     * 设置子输入框
     * @param onChange 修改时触发
     * @param placeholder 占位符， 默认为空
     * @param isFocus 是否获得焦点，默认为 true
     */
    setSubInput(
      onChange: (item: { text: string }) => void,
      placeholder?: string,
      isFocus?: boolean
    ): boolean;
  }
}
