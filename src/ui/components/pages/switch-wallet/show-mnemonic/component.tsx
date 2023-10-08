import CheckPassword from "@/ui/components/check-password";
import { useState } from "react";
import { useParams } from "react-router-dom";
import s from "./styles.module.scss";
import CopyIcon from "@/ui/components/icons/CopyIcon";
import { copyToClipboard } from "@/ui/utils";
import { useControllersState } from "@/ui/states/controllerState";

const ShowMnemonic = () => {
  const [unlocked, setUnlocked] = useState(false);
  const { walletId } = useParams();
  const { keyringController } = useControllersState((v) => ({
    keyringController: v.keyringController
  }))
  const [phrase, setPhrase] = useState("");

  return (
    <div className={s.showMnemonic}>
      {unlocked ? (
        <div className={s.phraseDiv}>
          <div className={s.phraseWrapper}>
            {phrase
              .split(" ")
              .map((word, index) => (
                <div key={index} className={s.word}>
                  {index + 1}. <p className={s.wordWord}>{word}</p>
                </div>
              ))}
          </div>
          <div
            className={s.copyDiv}
            onClick={() => {
              copyToClipboard(phrase);
            }}
          >
            <CopyIcon /> Copy
          </div>
        </div>
      ) : (
        <CheckPassword
          handler={async (password) => {
            setPhrase(await keyringController.getWalletSecret(Number(walletId), password!) ?? "");
            setUnlocked(true);
          }}
        />
      )}
    </div>
  );
};

export default ShowMnemonic;
