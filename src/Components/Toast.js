import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function toastSuccessText(text) {
  return toast.success(text, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    draggablePercent: 60,
    hideProgressBar: true,
    closeOnClick: true,
  });
}

export function toastFailText(text) {
  return toast.error(text, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    draggablePercent: 60,
    hideProgressBar: true,
    closeOnClick: true,
  });
}
