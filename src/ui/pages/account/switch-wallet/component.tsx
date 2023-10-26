import { useGetCurrentWallet, useWalletState } from "@/ui/states/walletState";
import { useState } from "react";
import s from "./styles.module.scss";
import { TagIcon, KeyIcon, TrashIcon } from "@heroicons/react/24/outline";

import { useDeleteWallet, useSwitchWallet } from "@/ui/hooks/wallet";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "@/ui/components/modal";
import Card from "@/ui/components/card";
import Rename from "@/ui/components/rename";

const SwitchWallet = () => {
  const [renameId, setRenameId] = useState<number | undefined>(undefined);
  const currentWallet = useGetCurrentWallet();
  const { wallets, updateWalletState } = useWalletState((v) => ({
    wallets: v.wallets,
    updateWalletState: v.updateWalletState,
  }));
  const switchWallet = useSwitchWallet();
  const navigate = useNavigate();
  const deleteWallet = useDeleteWallet();

  const [deleteWalletId, setDeleteWalletId] = useState<number>();

  const onDelete = async () => {
    setDeleteWalletId(undefined);

    await deleteWallet(wallets[deleteWalletId].id);
  };

  const onRename = async (name: string) => {
    if (wallets.map((i) => i.name).includes(name)) return toast.error("This name is already taken");

    setRenameId(undefined);

    await updateWalletState({
      wallets: wallets.with(renameId, { ...currentWallet, name }),
    });
  };

  return (
    <div className={s.switchWalletDiv}>
      <div className={s.wallets}>
        {wallets.map((wallet, i) => (
          <Card
            key={`wallet-${i}`}
            id={wallet.id}
            menuItems={[
              {
                action: () => {
                  setRenameId(wallet.id);
                },
                icon: <TagIcon title="Rename wallet" className="w-8 h-8 cursor-pointer text-bg" />,
              },
              {
                action: () => {
                  navigate(`/pages/show-mnemonic/${i}`);
                },
                icon: <KeyIcon title="Show mnemonic \ private key" className="w-8 h-8 cursor-pointer text-bg" />,
              },
              {
                action: () => {
                  if (wallets.length <= 1) toast.error("You cannot delete your last wallet");
                  else setDeleteWalletId(i);
                },
                icon: <TrashIcon title="Remove wallet" className="w-8 h-8 cursor-pointer text-bg" />,
              },
            ]}
            name={wallet.name}
            onClick={() => {
              switchWallet(i);
              navigate("/home");
            }}
            selected={wallet.id === currentWallet.id}
          />
        ))}
      </div>
      <Modal onClose={() => setDeleteWalletId(undefined)} open={deleteWalletId !== undefined} title={"Confirmation"}>
        <div className="text-base text-text py-5 px-4 flex flex-col items-center">
          <div className="text-sm">Are you sure you want to delete?</div>
          <span className="text-teal-200 block mt-5">
            {deleteWalletId !== undefined ? wallets[deleteWalletId].name : ""}
          </span>
        </div>
        <div className="flex justify-center gap-4">
          <button className="btn w-full hover:bg-red-500" onClick={onDelete}>
            Yes
          </button>
          <button className="btn w-full hover:bg-text hover:text-bg" onClick={() => setDeleteWalletId(undefined)}>
            No
          </button>
        </div>
      </Modal>
      <Rename active={renameId !== undefined} handler={onRename} onClose={() => setRenameId(undefined)} />
    </div>
  );
};

export default SwitchWallet;
