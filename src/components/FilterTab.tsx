import { Box, Tabs, Tab, colors, SxProps } from "@mui/material";
import { FC } from "react";
import { ClipBoardDataType } from "../utils/clipboard";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ImageIcon from "@mui/icons-material/Image";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import BallotIcon from "@mui/icons-material/Ballot";
interface IFilterTabProps {
  value: ClipBoardDataType;
  onChange: (v: ClipBoardDataType, index: number) => void;
  sx?: SxProps;
}

export const filterTabList = [
  {
    label: "全部",
    icon: <BallotIcon />,
    value: ClipBoardDataType.all,
  },
  {
    label: "文本",
    icon: <TextSnippetIcon />,
    value: ClipBoardDataType.text,
  },
  {
    label: "文件",
    icon: <FilePresentIcon />,
    value: ClipBoardDataType.file,
  },
  {
    label: "图片",
    icon: <ImageIcon />,
    value: ClipBoardDataType.image,
  },
];

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
        onChange={(e, v) => {
          e.preventDefault();
          onChange(
            v,
            filterTabList.findIndex((x) => x.value === v)
          );
        }}
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
            height: "40px",
            borderRadius: "40%",
            bottom: "15px",
          },
        }}
      >
        {filterTabList.map((x) => (
          <Tab iconPosition="start" key={x.value} sx={{ zIndex: 1 }} {...x} />
        ))}
      </Tabs>
    </Box>
  );
};
