import { darwin } from "../node-clipboard";
import { wait } from "./timer";

export const downloadClipboard = async () => {
  if (
    window.utoolClipboard.existsSync(
      window.utoolClipboard.clipboardListener.filePath
    )
  ) {
    console.info("剪切板程序已存在");
    return;
  }

  console.info(
    window.utoolClipboard.clipboardListener.filePath,
    "剪切板程序不存在，安装中"
  );

  window.utoolClipboard.writeFileBase64Sync(
    window.utoolClipboard.clipboardListener.filePath,
    darwin
  );

  await wait(500);
};
