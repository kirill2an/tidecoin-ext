import { LinkIcon } from "@heroicons/react/24/outline";
import s from "./styles.module.scss";
import { useAppState } from "@/ui/states/appState";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { logout } = useAppState((v) => ({
    logout: v.logout,
  }));

  const navigate = useNavigate();

  return (
    <div className={s.settings}>
      <div
        className={s.card}
        onClick={() => {
          navigate("/pages/change-addr-type");
        }}
      >
        <div className={s.cardText}>Address Type</div>
      </div>
      <div
        className={s.card}
        onClick={() => {
          navigate("/pages/change-password");
        }}
      >
        <div className={s.cardText}>Change Password</div>
      </div>
      <div className={s.card} onClick={logout}>
        <div className={s.cardText}>Logout</div>
      </div>
    </div>
  );
};

export default Settings;
