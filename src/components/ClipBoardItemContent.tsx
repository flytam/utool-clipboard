import { Box, colors, ListItemText, Typography } from "@mui/material";
import { FC } from "react";
import { ClipBoardData } from "../hooks/useClipboardData";
import { ClipBoardDataType } from "../utils/clipboard";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export const ClipBoardItemContent: FC<{
  item: ClipBoardData;
}> = ({ item }) => {
  if (item.type === ClipBoardDataType.image) {
    return (
      <Box
        sx={{
          width: "100%",
        }}
      >
        <PhotoProvider>
          <PhotoView src={item.base64}>
            <img src={item.base64} style={{ height: "200px" }} />
          </PhotoView>
        </PhotoProvider>
        <Typography
          color={colors.grey[500]}
        >{`${item.width} x ${item.height}`}</Typography>
      </Box>
    );
  }

  if (item.type === ClipBoardDataType.file) {
    return (
      <Box
        sx={{
          width: "100%",
        }}
      >
        {item.files.map((file) => (
          <Box key={file.path} display="flex" marginTop="5px">
            <img src={file.icon} className="w-5" />{" "}
            <Typography sx={{ marginLeft: "10px" }}>{file.name}</Typography>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <ListItemText
      sx={{
        padding: 0,
        maxHeight: "200px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        width: "200px",
      }}
      inset
      disableTypography
      primary={item.data}
    />
  );
};
