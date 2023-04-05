import { useRef, useState } from "react";
import { Container } from "@mui/material";
import { FilterTab, filterTabList } from "./components/FilterTab";
import { useClipboardData } from "./hooks/useClipboardData";
import { ClipBoardList, IClipboardRef } from "./components/ClipBoardList";
import { ClipBoardDataType, copyToClipBoard, paste } from "./utils/clipboard";
import { useKeyPress, useMemoizedFn } from "ahooks";
import { useThemeProvider } from "./hooks/useThemeProvider";
import { Clear } from "./components/Clear";
import { isInViewport } from "observe-element-in-viewport";
import { confirmDialog } from "./utils/confirm";

function App() {
  const [clipBoardType, setClipBoard] = useState<{
    type: ClipBoardDataType;
    index: number;
  }>({
    type: ClipBoardDataType.all,
    index: 0,
  });

  const { clipBoardList, clearAll, clearOne } = useClipboardData({
    filter: clipBoardType.type,
  });

  const { Provider } = useThemeProvider();

  const [activeIndexList, setActiveIndexList] = useState<number[]>([0]);

  const doCopy = useMemoizedFn(async (index: number) => {
    if (index === 0) {
      paste();
      return;
    }
    copyToClipBoard(clipBoardList[index]);
    paste();
    setTimeout(() => {
      clearOne(clipBoardList[index].timestamp!);

      setActiveIndexList([0]);
      clipboardRef.current?.container?.scrollTo(0, 0);
    }, 500);
  });

  useKeyPress("uparrow", async (e) => {
    e.preventDefault();

    setActiveIndexList((pre) => [Math.max(pre[0] - 1, 0)]);
    const ele = clipboardRef.current?.getActiveItem();
    if (
      ele &&
      !(await isInViewport(ele, {
        modTop: "-150px",
      }))
    ) {
      clipboardRef.current?.getActiveItem()?.scrollIntoView(true);
    }
  });

  useKeyPress("downarrow", async (e) => {
    e.preventDefault();

    setActiveIndexList((pre) => [
      Math.min(pre[0] + 1, clipBoardList.length - 1),
    ]);
    const ele = clipboardRef.current?.getActiveItem();
    if (
      ele &&
      !(await isInViewport(ele, {
        modBottom: "-100px",
      }))
    ) {
      clipboardRef.current?.getActiveItem()?.scrollIntoView(false);
    }
  });

  useKeyPress("enter", () => {
    doCopy(activeIndexList[0]);
  });

  useKeyPress("leftarrow", () => {
    let nextIndex = clipBoardType.index - 1;
    if (nextIndex < 0) {
      nextIndex = filterTabList.length - 1;
    }
    setClipBoard({
      index: nextIndex,
      type: filterTabList[nextIndex].value,
    });

    setActiveIndexList([0]);
  });

  useKeyPress("rightarrow", () => {
    let nextIndex = clipBoardType.index + 1;
    if (nextIndex > filterTabList.length - 1) {
      nextIndex = 0;
    }
    setClipBoard({
      index: nextIndex,
      type: filterTabList[nextIndex].value,
    });

    setActiveIndexList([0]);
  });

  const clipboardRef = useRef<IClipboardRef | null>(null);

  return (
    <Provider>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Clear
          onClick={async () => {
            await confirmDialog();
            clearAll();
          }}
        />

        <FilterTab
          value={clipBoardType.type}
          onChange={(type, index) => {
            setClipBoard({
              type,
              index,
            });
          }}
        />
        <ClipBoardList
          ref={clipboardRef}
          clipBoardList={clipBoardList}
          activeIndexList={activeIndexList}
          onActiveChange={setActiveIndexList}
          onDoubleClickCopy={(i) => doCopy(i)}
        />
      </Container>
    </Provider>
  );
}

export default App;
