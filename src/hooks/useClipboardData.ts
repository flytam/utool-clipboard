import { useEffect, useMemo, useState } from "react";
import { useLocalStorageState, useMemoizedFn } from "ahooks";
import {
  ClipBoardDataType,
  ClipBoardRawData,
  filterClipBoard,
  initClipboard,
  readClipBoard,
} from "../utils/clipboard";
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
    initClipboard().then(() => {});

    return () => {};
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
