// import { isEqual } from "lodash-es";
import { downloadClipboard } from "./downloadClipboard";

let init = false;

export const initClipboard = async () => {
  if (init) {
    return;
  }
  await downloadClipboard();
  window.utoolClipboard.clipboardListener.startListening();
  init = true;

  window.utoolClipboard.clipboardListener.on("change", async () => {
    const item = await readClipBoard();
    lastClipBoardData = item;
  });

  utools.onPluginOut((processExit) => {
    if (processExit) {
      window.utoolClipboard.clipboardListener.stopListening();
    }
  });
};

export type ClipBoardRawData =
  | {
      type: ClipBoardDataType.text;
      data: string;
      timestamp?: number;
    }
  | {
      type: ClipBoardDataType.image;
      base64: string;
      height: number;
      width: number;
      timestamp?: number;
    }
  | {
      type: ClipBoardDataType.file;
      timestamp?: number;
      files: {
        isFile: boolean;
        isDirectory: boolean;
        name: string;
        path: string;
        icon: string;
      }[];
    };

let lastClipBoardData: ClipBoardRawData | undefined;

/**
 * 读取当前剪贴板数据
 */
export const readClipBoard = async (): Promise<
  ClipBoardRawData | undefined
> => {
  const _readClipBoard = async (): Promise<ClipBoardRawData | undefined> => {
    let files = utools.getCopyedFiles();
    if (files) {
      return {
        type: ClipBoardDataType.file,
        files: await Promise.all(
          files.map(async (x) => {
            const icon = window.utools.getFileIcon(x.path);
            return {
              ...x,
              icon,
            };
          })
        ),
      };
    }

    const text = window.utoolClipboard.clipboard.readText();
    if (text.trim()) return { type: ClipBoardDataType.text, data: text };

    const image = window.utoolClipboard.clipboard.readImage();
    const base64 = image.toDataURL();
    const size = image.getSize();
    if (!image.isEmpty()) {
      return {
        type: ClipBoardDataType.image,
        base64,
        height: size.height,
        width: size.width,
      };
    }
  };

  const retClipBoardData = await _readClipBoard();

  return retClipBoardData;
};

// export const checkClipBoardChange = async (): Promise<boolean> => {
//   const data = await readClipBoard();
//   console.log(
//     "cmp",
//     !isEqual(data, lastClipBoardData),
//     data,
//     lastClipBoardData
//   );
//   return !isEqual(await readClipBoard(), lastClipBoardData);
// };

/**
 *
 * @param item 复制数据到剪切板
 * @param hideMainWindow
 */
export const copyToClipBoard = (
  item: ClipBoardRawData,
  hideMainWindow = true
) => {
  switch (item.type) {
    case ClipBoardDataType.text:
      utools.copyText(item.data);
      break;
    case ClipBoardDataType.image:
      utools.copyImage(item.base64);
      break;
    case ClipBoardDataType.file:
      const paths = item.files.map((file) => file.path);
      utools.copyFile(paths);
      break;
  }
  if (hideMainWindow) {
    utools.hideMainWindow();
  }
};

export enum ClipBoardDataType {
  text = "text",
  file = "file",
  image = "image",
  all = "",
}

/**
 * 粘贴
 */
export const paste = () => {
  utools.hideMainWindow();
  if (utools.isMacOS()) {
    utools.simulateKeyboardTap("v", "command");
  } else {
    utools.simulateKeyboardTap("v", "ctrl");
  }
};

export const filterClipBoard = (item: ClipBoardRawData, filterText: string) => {
  if (!filterText.length) {
    return true;
  }
  if (item.type === ClipBoardDataType.text) {
    return item.data.includes(filterText);
  }

  if (item.type === ClipBoardDataType.file) {
    return item.files.some((x) => x.name.includes(filterText));
  }

  if (item.type === ClipBoardDataType.image) {
    return true;
  }

  return true;
};
