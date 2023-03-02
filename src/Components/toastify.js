import { toast } from "react-toastify";

export const notify = (type, text) => {
  toast[type](text);
};
