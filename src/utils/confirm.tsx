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

interface Options {
  title: string;
  description?: string;
}

export const confirmDialog = (options: Options) => {
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
      const { title, description } = options;

      return (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleOK} color="warning" autoFocus>
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
