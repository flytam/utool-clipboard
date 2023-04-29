import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  colors,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { ClipBoardData } from "../hooks/useClipboardData";
import { usePluginEnterFn } from "../hooks/usePluginLifecycle";
import { timeAgo } from "../utils/format";
import { ClipBoardItemContent } from "./ClipBoardItemContent";

interface IProps {
  clipBoardList: ClipBoardData[];
  activeIndexList: number[];
  onActiveChange: (list: number[]) => void;
  onDoubleClickCopy: (index: number) => void;
}

export interface IClipboardRef {
  container: HTMLUListElement | null;
  getActiveItem: () => HTMLElement | null;
}

export const ClipBoardList = forwardRef<IClipboardRef, IProps>(
  (
    { clipBoardList, activeIndexList, onActiveChange, onDoubleClickCopy },
    ref
  ) => {
    const containerRef = useRef<HTMLUListElement | null>(null);

    useImperativeHandle(ref, () => ({
      container: containerRef.current,
      getActiveItem() {
        return document.getElementById("clip-board-active");
      },
    }));

    const formatClipBoardList = usePluginEnterFn(
      () => {
        return clipBoardList.map((x) => ({
          ...x,
          ago: timeAgo(x.timestamp!),
        }));
      },
      {
        deps: [clipBoardList],
        defaultValue: [],
      }
    );

    return (
      <List
        sx={{
          overflowX: "hidden",
        }}
        ref={(node) => (containerRef.current = node)}
      >
        {formatClipBoardList!.map((x, index) => (
          <ListItem
            key={index}
            disablePadding
            id={
              activeIndexList.includes(index) ? "clip-board-active" : undefined
            }
            sx={{
              padding: "8px",
              ...(activeIndexList.includes(index)
                ? {
                    border: `2px solid ${colors.indigo[500]}`,
                  }
                : {
                    border: "2px solid transparent",
                    borderBottomColor: colors.grey[300],
                  }),
            }}
            divider
            onClick={(e) => {
              onActiveChange([index]);
            }}
            onDoubleClick={() => onDoubleClickCopy(index)}
          >
            <ListItemText
              inset
              secondary={x.ago}
              sx={{
                flexGrow: 0,
                paddingLeft: "10px",
                width: "100px",
                flexShrink: 0,
              }}
            />
            <ClipBoardItemContent item={x} />
            <ListItemText inset secondary={index} sx={{ flexGrow: 0 }} />
          </ListItem>
        ))}
      </List>
    );
  }
);
