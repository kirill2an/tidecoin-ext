import ReceiveIcon from 'components/icons/ReceiveIcon'
import './Wallet.scss'
import { useWalletState } from 'shared/states/walletState'
import SendIcon from 'components/icons/SendIcon'
import CopyIcon from 'components/icons/CopyIcon'

export default function Wallet() {

  const { currentWallet } = useWalletState((v) => ({ currentWallet: v.currentWallet }))

  return (
    <div className='wallet-div'>
      <div className='change-wallet-acc-div'>
        <button className='change btn primary'>{currentWallet?.name}</button>
        <button className='change btn secondary'>{currentWallet?.currentAccount.brandName}</button>
      </div>

      <div className="acc-panel flex-center-center">
        <p className='balance '>{currentWallet?.currentAccount.balance} TDC</p>
        <p className='acc-pub-address flex-center-center'><CopyIcon /> {currentWallet?.currentAccount.address}</p>

        <div className="receive-send-btns flex-center-center">
          <button className="btn flex-center-center"><ReceiveIcon /> Receive</button>
          <button className="btn flex-center-center"><SendIcon /> Send</button>
        </div>
      </div>

      <div className="transactions-div">
        <p>transactions: </p>
      </div>
    </div>
  )
}