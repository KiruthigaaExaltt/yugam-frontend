import { toast } from "sonner";

const primeStyles = {
  success: {
    background: "#d1e7dd",
    color: "#0f5132",
    border: "1px solid #badbcc",
  },
  info: {
    background: "#cff4fc",
    color: "#055160",
    border: "1px solid #b6effb",
  },
  warn: {
    background: "#fff3cd",
    color: "#664d03",
    border: "1px solid #ffecb5",
  },
  error: {
    background: "#f8d7da",
    color: "#842029",
    border: "1px solid #f5c2c7",
  },
};

export function primeToast(message: string, severity: keyof typeof primeStyles) {
  toast(message, {
    style: {
      padding: "12px 18px",
      borderRadius: "8px",
      fontSize: "14px",
      ...primeStyles[severity],
    },
  });
}
