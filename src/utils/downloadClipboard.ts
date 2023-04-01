import { darwin } from '../node-clipboard'
import { wait } from "./timer";

export const downloadClipboard = async () => {
  if (
    window.utoolClipboard.existsSync(
      window.utoolClipboard.clipboardListener.filePath
    )
  ) {
   console.log('剪切板程序已存在')
    return;
  }

  console.log('剪切板程序不存在，安装中')

  window.utoolClipboard.writeFileBase64Sync(
    window.utoolClipboard.clipboardListener.filePath,
    darwin
  );

  await wait(500)
};
