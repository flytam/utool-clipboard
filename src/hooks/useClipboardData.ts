import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorageState, useMemoizedFn } from "ahooks";
import {
  ClipBoardDataType,
  ClipBoardRawData,
  filterClipBoard,
  initClipboard,
  readClipBoard,
} from "../utils/clipboard";
import { downloadClipboard } from "../utils/downloadClipboard";
import { usePluginOut } from "./usePluginLifecycle";
import { useLocalDb } from "./useLocalDb";

export type ClipBoardData = ClipBoardRawData;

interface params {
  filter?: ClipBoardDataType;
}

const MAX_SIZE = 100;

export const useClipboardData = ({ filter }: params = {}) => {
  const [clipBoardList, setClipBoardList] = useLocalDb<ClipBoardData[]>(
    "clipBoardData",
    {
      defaultValue: [],
    }
  );

  const [filterText, setFilterText] = useState<string>("");
  const filterTextRef = useRef(filterText);
  filterTextRef.current = filterText;

  useEffect(() => {
    const changeFn = async () => {
      const item = await readClipBoard();
      console.info("[Copy data]", item);
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
    };
    initClipboard().then(() => {
      window.utoolClipboard.clipboardListener.on("change", changeFn);
    });

    const visibilitychangeCb = () => {
      if (document.visibilityState === "visible") {
        utools.setSubInput(
          (item) => {
            setFilterText(item.text);
          },
          "搜索内容",
          true
        );
        utools.setSubInputValue(filterTextRef.current);
      }
    };
    document.addEventListener("visibilitychange", visibilitychangeCb);

    utools.setSubInput(
      (item) => {
        setFilterText(item.text);
      },
      "搜索内容",
      true
    );
    return () => {
      window.utoolClipboard.clipboardListener.removeListener(
        "change",
        changeFn
      );
      document.removeEventListener("visibilitychange", visibilitychangeCb);
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

  usePluginOut((processExit) => {
    if (processExit) {
      window.utoolClipboard.unlinkSync(
        window.utoolClipboard.clipboardListener.filePath
      );
    }
  });

  const clearAll = useMemoizedFn(() => setClipBoardList([]));
  const clearOne = useMemoizedFn((timestamp: number) =>
    setClipBoardList(
      (pre) => pre?.filter((x) => x.timestamp !== timestamp) ?? []
    )
  );

  return {
    clipBoardList: filteredList,
    clearAll,
    clearOne,
  };
};
