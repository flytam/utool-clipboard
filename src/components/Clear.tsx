import { colors, IconButton, SxProps, Theme, Tooltip } from "@mui/material";
import { FC } from "react";
import { ClearAll, Clear as ClearIcon } from "@mui/icons-material";

export const Clear: FC<{
  onClick: () => void;
  sx?: SxProps<Theme>;
  type: "all" | "one";
}> = ({ onClick, sx = {}, type }) => {
  return (
    <Tooltip
      title={type === "all" ? "清空所有记录" : "删除当前选中记录"}
      placement="left-start"
    >
      <IconButton
        component="label"
        onClick={onClick}
        sx={{
          background: colors.grey[300],
          ...sx,
        }}
      >
        {type === "all" ? <ClearAll /> : <ClearIcon />}
      </IconButton>
    </Tooltip>
  );
};
