import { FC } from "react";
import toast from "react-hot-toast";

interface Props {
  label: string;
  value?: string;
  className?: string;
}

const CopyBtn: FC<Props> = ({ label, value, className }) => {
  return (
    <button
      className={className ? className : "btn primary"}
      onClick={async () => {
        if (!value) return;
        await navigator.clipboard.writeText(value);
        toast.success("Copied");
      }}
    >
      {label}
    </button>
  );
};

export default CopyBtn;
