import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  colors,
} from "@mui/material";
import { FC, forwardRef } from "react";
import { ClipBoardData } from "../hooks/useClipboardData";
import { timeAgo } from "../utils/format";
import { ClipBoardItemContent } from "./ClipBoardItemContent";

interface IProps {
  clipBoardList: ClipBoardData[];
  activeIndexList: number[];
  onActiveChange: (list: number[]) => void;
}

export const ClipBoardList = forwardRef<HTMLUListElement, IProps>(
  ({ clipBoardList, activeIndexList, onActiveChange }, ref) => {
    return (
      <List
        sx={{
          overflowX: "auto",
        }}
        ref={ref}
      >
        {clipBoardList.map((x, index) => (
          <ListItem
            key={index}
            disablePadding
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
