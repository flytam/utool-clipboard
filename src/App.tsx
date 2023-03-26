import { useRef, useState } from "react";
import { Container } from "@mui/material";
import { FilterTab, filterTabList } from "./components/FilterTab";
import { useClipboardData } from "./hooks/useClipboardData";
import { ClipBoardList, IClipboardRef } from "./components/ClipBoardList";
import { ClipBoardDataType, copyToClipBoard, paste } from "./utils/clipboard";
import { useKeyPress } from "ahooks";
import { useThemeProvider } from "./hooks/useThemeProvider";
import { Clear } from "./components/Clear";
import { isInViewport } from "observe-element-in-viewport";

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
    copyToClipBoard(clipBoardList[activeIndexList[0]]);
    clearOne(clipBoardList[activeIndexList[0]].timestamp!);
    paste();
    setTimeout(() => setActiveIndexList([0]), 500);
    clipboardRef.current?.container?.scrollTo(0, 0);
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
        <Clear onClick={clearAll} />

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
        />
      </Container>
    </Provider>
  );
}

export default App;
