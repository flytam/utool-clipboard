import { useEffect, useMemo, useState } from "react";
import { useLocalStorageState, useMemoizedFn } from "ahooks";
import {
  ClipBoardDataType,
  ClipBoardRawData,
  filterClipBoard,
  readClipBoard,
} from "../utils/clipboard";
import { downloadClipboard } from "../utils/downloadClipboard";

export type ClipBoardData = ClipBoardRawData;

interface params {
  filter?: ClipBoardDataType;
}

const MAX_SIZE = 50;

export const useClipboardData = ({ filter }: params = {}) => {
  // TODO: 本地持久化，使用写本地文件替代
  //   const [clipBoardList, setClipBoardList] = useState<ClipBoardData[]>([]);
  const [clipBoardList, setClipBoardList] = useLocalStorageState<
    ClipBoardData[]
  >("clipBoardData", {
    defaultValue: [],
  });

  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    downloadClipboard().then(() => {
      window.utoolClipboard.clipboardListener.startListening();
      window.utoolClipboard.clipboardListener.on("change", () => {
        const item = readClipBoard();
        if (item) {
          setClipBoardList((pre = []) =>
            [
              {
                ...item,
                timestamp: Date.now(),
              },
              ...pre,
            ].slice(0, MAX_SIZE)
          );
        }
      });
    });

    utools.setSubInput(
      (item) => {
        setFilterText(item.text);
      },
      "搜索内容",
      true
    );

    return () => {
      window.utoolClipboard.clipboardListener.stopListening();
    };
  }, []);

  const filteredList = useMemo(
    () =>
      clipBoardList.filter(
        (x) =>
          (!filter || x.type === filter) &&
          (!filterText.length || filterClipBoard(x, filterText))
      ),
    [clipBoardList, filter, filterText]
  );

  const clear = useMemoizedFn(() => setClipBoardList([]));

  return {
    clipBoardList: filteredList,
    clear,
  };
};
