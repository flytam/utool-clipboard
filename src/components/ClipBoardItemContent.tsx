import { Box, colors, ListItemText, Typography } from "@mui/material";
import { FC } from "react";
import { ClipBoardData } from "../hooks/useClipboardData";
import { ClipBoardDataType } from "../utils/clipboard";

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
        <img src={item.base64} style={{ height: "300px" }} />
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
      }}
      inset
      primary={item.data}
    />
  );
};
