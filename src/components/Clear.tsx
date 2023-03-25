import { colors, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
import { ClearAll } from "@mui/icons-material";

export const Clear: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Tooltip title="清空所有记录">
      <IconButton
        component="label"
        onClick={onClick}
        sx={{
          position: "fixed",
          zIndex: 100,
          right: "20px",
          bottom: "20px",
          background: colors.grey[300],
        }}
      >
        <ClearAll />
      </IconButton>
    </Tooltip>
  );
};
