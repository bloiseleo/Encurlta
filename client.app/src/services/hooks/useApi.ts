import { EncurltaAPI } from '../EncurltaAPI';
import EncurltaAPIFetchImpl from '../EncurltaAPIFetchImpl';

export default function useApi(baseUrl: string): EncurltaAPI {
  return new EncurltaAPIFetchImpl(baseUrl);
}