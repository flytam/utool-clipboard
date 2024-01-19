// import { isEqual } from "lodash-es";
import { readText } from "@tauri-apps/api/clipboard";

let init = false;

export const initClipboard = async () => {};

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
  return undefined;
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
) => {};

export enum ClipBoardDataType {
  text = "text",
  file = "file",
  image = "image",
  all = "",
}

/**
 * 粘贴
 */
export const paste = () => {};

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
