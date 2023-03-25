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
      }[];
    };
/**
 * 读取当前剪贴板数据
 */
export const readClipBoard = (): ClipBoardRawData | undefined => {
  const files = utools.getCopyedFiles();
  if (files) {
    return {
      type: ClipBoardDataType.file,
      files,
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
      // TODO: opt
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
