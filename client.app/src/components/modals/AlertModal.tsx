import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { MessageBroker } from '../../services/MessageBroker';

type Props = {
  message?: string;
  title?: string;
  show?: boolean;
  channel: MessageBroker<boolean, void>;
}

export default function AlertModal({ channel, message, title, show = false }: Props) {
  const toggleModal = () => {
    channel.send("close_modal", !show);
  };
  return show ? <div className={"z-10 h-screen w-screen bg-gray-500 bg-opacity-90 absolute top-0 left-0"}>
    <div className={"w-[90%] h-1/4 bg-white rounded text-center p-4 relative"} style={{
      margin: '0 auto',
      transform: 'translateY(150%)'
    }}>
      <CloseIcon onClick={() => toggleModal()} className={"absolute top-5 right-5"}/>
      <div className={"flex flex-col items-center justify-center h-full"}>
        <WarningIcon fontSize={"large"} color={"warning"} />
        <div className={"flex flex-col mt-6"}>
          <span className="text-2xl">{title}</span>
          <p className={"mt-4"}>{message}</p>
        </div>
      </div>
    </div>
  </div> : <></>;
}