// import s from "./styles.module.scss";

import { useCreateNewWallet } from "@/ui/hooks/wallet";
import { useControllersState } from "@/ui/states/controllerState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RestorePrivKey = () => {

  const createNewWallet = useCreateNewWallet();
  const navigate = useNavigate();
  const { walletController } = useControllersState((v) => ({ walletController: v.walletController }))

  const [privKey, setPrivKey] = useState("");

  const recoverWallet = async () => {
    await createNewWallet(privKey, "simple");
    await walletController.saveWallets();
    navigate("/home/wallet")
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-field">
        <span className="input-span">Enter your private key</span>
        <input className="input" onChange={(e) => { setPrivKey(e.target.value) }} type="password" />
      </div>
      <button className="btn primary" onClick={recoverWallet}>Recover</button>
    </form>
  );
};

export default RestorePrivKey;
