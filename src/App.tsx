import { useRef, useState } from "react";
import {
  Box,
  Container,
  createTheme,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { FilterTab } from "./components/FilterTab";
import { useClipboardData } from "./hooks/useClipboardData";
import { ClipBoardList } from "./components/ClipBoardList";
import { ClipBoardDataType, copyToClipBoard, paste } from "./utils/clipboard";
import { useKeyPress } from "ahooks";
import { useThemeProvider } from "./hooks/useThemeProvider";
import { Clear } from "./components/Clear";

function App() {
  const [clipBoardType, setClipBoard] = useState<ClipBoardDataType>(
    ClipBoardDataType.all
  );
  const { clipBoardList, clear } = useClipboardData({
    filter: clipBoardType,
  });

  const { Provider } = useThemeProvider();

  const [activeIndexList, setActiveIndexList] = useState<number[]>([0]);

  useKeyPress("uparrow", () =>
    setActiveIndexList((pre) => [Math.max(pre[0] - 1, 0)])
  );

  useKeyPress("downarrow", () =>
    setActiveIndexList((pre) => [
      Math.min(pre[0] + 1, clipBoardList.length - 1),
    ])
  );

  useKeyPress("enter", () => {
    copyToClipBoard(clipBoardList[activeIndexList[0]]);
    paste();
    setTimeout(() => setActiveIndexList([0]), 500);
    listRef.current?.scrollTo(0, 0);
  });

  const listRef = useRef<HTMLUListElement | null>(null);

  console.log("clipBoardList", clipBoardList);

  return (
    <Provider>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Clear onClick={clear} />

        <FilterTab
          value={clipBoardType}
          onChange={(v) => {
            setClipBoard(v);
          }}
        />
        <ClipBoardList
          ref={listRef}
          clipBoardList={clipBoardList}
          activeIndexList={activeIndexList}
          onActiveChange={setActiveIndexList}
        />
      </Container>
    </Provider>
  );
}

export default App;
