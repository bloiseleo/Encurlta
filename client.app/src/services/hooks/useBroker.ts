import { MessageBroker } from '../MessageBroker';

export default function useBroker<I, O>() {
  return new MessageBroker<I, O>();
}