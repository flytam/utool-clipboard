import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import { useBoolean } from "ahooks";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";

export const confirmDialog = () => {
  return new Promise<void>((resolve, reject) => {
    const Ele = () => {
      const [open, { setTrue, setFalse }] = useBoolean(false);
      useEffect(() => {
        setTrue();
      }, []);

      const handleClose = () => {
        setFalse();
        setTimeout(() => {
          root.unmount();
        }, 200);
        reject();
      };

      const handleOK = () => {
        setFalse();
        resolve();
      };

      return (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">确认清除剪切板记录</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              清除后无法恢复，请确认是否继续
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleOK} autoFocus>
              确定
            </Button>
          </DialogActions>
        </Dialog>
      );
    };

    const root = ReactDOM.createRoot(
      document.getElementById("dialog") as HTMLElement
    );

    root.render(<Ele />);
  });
};
