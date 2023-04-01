import {
  Box,
  Button,
  colors,
  Drawer,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { ClipBoardData } from "../hooks/useClipboardData";
import { ClipBoardDataType } from "../utils/clipboard";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useBoolean, useMutationObserver } from "ahooks";

export const ClipBoardItemContent: FC<{
  item: ClipBoardData;
}> = ({ item }) => {
  const [showMore, { toggle: toggleShowMore }] = useBoolean(false);

  const [
    showMoreButton,
    { setTrue: setShowMoreButtonShow, setFalse: setHideMoreButtonShow },
  ] = useBoolean(false);

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current && ref.current.offsetHeight < ref.current.scrollHeight) {
      setShowMoreButtonShow();
    } else {
      setHideMoreButtonShow();
    }
  }, [item.type === ClipBoardDataType.text ? item.data : null, ref.current]);

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
    <Box
      sx={{
        width: "100%",
      }}
    >
      <ListItemText
        ref={ref}
        sx={{
          width: "100%",
          padding: 0,
          maxHeight: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
        inset
        disableTypography
        primary={item.data}
      />
      {showMoreButton ? (
        <>
          <Button
            onClick={(e) => {
              toggleShowMore();
              e.stopPropagation();
              e.preventDefault();
            }}
            variant="text"
          >
            更多
          </Button>
          <Drawer anchor={"right"} open={showMore} onClose={toggleShowMore}>
            <Box
              sx={{
                width: "500px",
                padding: "16px",
              }}
            >
              {item.data}
            </Box>
          </Drawer>
        </>
      ) : null}
    </Box>
  );
};
