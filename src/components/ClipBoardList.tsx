import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  colors,
} from "@mui/material";
import { FC, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ClipBoardData } from "../hooks/useClipboardData";
import { timeAgo } from "../utils/format";
import { ClipBoardItemContent } from "./ClipBoardItemContent";

interface IProps {
  clipBoardList: ClipBoardData[];
  activeIndexList: number[];
  onActiveChange: (list: number[]) => void;
}

export interface IClipboardRef {
  container: HTMLUListElement | null;
  getActiveItem: () => HTMLElement | null;
}

export const ClipBoardList = forwardRef<IClipboardRef, IProps>(
  ({ clipBoardList, activeIndexList, onActiveChange }, ref) => {
    const containerRef = useRef<HTMLUListElement | null>(null);

    useImperativeHandle(ref, () => ({
      container: containerRef.current,
      getActiveItem() {
        return document.getElementById("clip-board-active");
      },
    }));

    return (
      <List
        sx={{
          overflowX: "auto",
        }}
        ref={(node) => (containerRef.current = node)}
      >
        {clipBoardList.map((x, index) => (
          <ListItem
            key={index}
            disablePadding
            id={
              activeIndexList.includes(index) ? "clip-board-active" : undefined
            }
            sx={{
              border: `3px solid ${
                activeIndexList.includes(index)
                  ? colors.indigo[500]
                  : "transparent"
              }`,
            }}
          >
            <ListItemButton
              divider
              selected={activeIndexList.includes(index)}
              onClick={() => onActiveChange([index])}
            >
              <ListItemText
                inset
                secondary={timeAgo(x.timestamp!)}
                sx={{
                  flexGrow: 0,
                  paddingLeft: "10px",
                  width: "100px",
                  flexShrink: 0,
                }}
              />
              <ClipBoardItemContent item={x} />
              <ListItemText inset secondary={index} sx={{ flexGrow: 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
);
