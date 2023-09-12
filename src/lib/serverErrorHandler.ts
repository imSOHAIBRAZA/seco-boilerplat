import { AlertColor } from "@mui/material";
import { mapErrorMessage } from "./config";
import { labelKeyMap } from "./labelKeyMap";
type Snackbar = (Arg1: { message: string; type?: AlertColor | undefined }) => void;

interface IErrorResponse {
  data: string | string[];
  status: number;
}
interface IError {
  response: IErrorResponse;
}

const getErrorMessages = (data: any) => {
  const messages: string[] = [];
  Object.keys(data).forEach((k: string) =>
    data[k].forEach((message: string) => {
      if (k in labelKeyMap) {
        messages.push(`${labelKeyMap[k as keyof typeof labelKeyMap]}: ${message}`);
      } else {
        messages.push(message);
      }
    }),
  );
  return messages;
};

export function serverErrorHandlers(error: unknown, snackbar: Snackbar): void {
  if (error) {
    const { response } = error as IError;
    if (response?.status) {
      if (response?.status >= 400 && response?.status <= 500) {
        if (response.data) {
          const messages = getErrorMessages(response.data);
          if (messages) {
            messages.forEach((message) => {
              snackbar({ type: "error", message });
            });
          }
        }
      } else if (response?.status >= 500) {
        snackbar({ type: "error", message: mapErrorMessage.server });
      }
    } else {
      snackbar({ type: "error", message: mapErrorMessage.generic });
    }
  } else if (error instanceof Error) {
    snackbar({ type: "error", message: error.message });
  } else {
    snackbar({ type: "error", message: mapErrorMessage.generic });
  }
}
