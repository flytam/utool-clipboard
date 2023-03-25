import {
  Box,
  Tabs,
  Tab,
  colors,
  makeStyles,
  createStyles,
  SxProps,
} from "@mui/material";
import { FC } from "react";
import { ClipBoardDataType } from "../utils/clipboard";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ImageIcon from "@mui/icons-material/Image";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import BallotIcon from "@mui/icons-material/Ballot";
interface IFilterTabProps {
  value: ClipBoardDataType;
  onChange: (v: ClipBoardDataType) => void;
  sx?: SxProps;
}

export const FilterTab: FC<IFilterTabProps> = ({
  value,
  onChange,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: colors.grey[200],
        marginTop: "10px",
        ...sx,
      }}
    >
      <Tabs
        value={value}
        onChange={(_, v) => onChange(v)}
        classes={{
          flexContainer: "oooo",
        }}
        sx={{
          position: "relative",
          padding: "0px 10px",
        }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: colors.grey[50],
            // opacity: 0.6,
            height: "40px",
            borderRadius: "40%",
            bottom: "15px",
          },
        }}
      >
        <Tab
          label="全部"
          icon={<BallotIcon />}
          iconPosition="start"
          value={ClipBoardDataType.all}
          sx={{ zIndex: 1 }}
        />
        <Tab
          label="文本"
          icon={<TextSnippetIcon />}
          iconPosition="start"
          value={ClipBoardDataType.text}
          sx={{ zIndex: 1 }}
        />
        <Tab
          label="文件"
          iconPosition="start"
          icon={<FilePresentIcon />}
          value={ClipBoardDataType.file}
          sx={{ zIndex: 1 }}
        />
        <Tab
          label="图片"
          icon={<ImageIcon />}
          iconPosition="start"
          value={ClipBoardDataType.image}
          sx={{ zIndex: 1 }}
        />
      </Tabs>
    </Box>
  );
};
