import IdGenerator from './id-generator';
import { ErrorCode } from "../../enums/errors";

export interface IActionMetadata {
  clientId?: string;
  eventId?: string;
  forceFetch?: boolean;
  errorCode?: ErrorCode;
}

class StoreActionMetadataFactory {

  constructor() {}

  create(clientId: string): IActionMetadata {

    const eventId = IdGenerator.generateUniqueId().toString(10);
    const metadata = { eventId };

    if (clientId)
        metadata['clientId'] = clientId;

    return metadata;

  }

}

export const storeActionMetadataSingleton = new StoreActionMetadataFactory();

/**
 * set the <errorCode> property on an action metadata object <meta>, according to the provided <error>
 * does not modify <meta>, instead returns a copy of <meta> which includes the appropiate error code
 *
 * @param Error error
 * @param IActionMetadata meta
 * @return IActionMetadata The modified (copy of) meta
 */
export function setActionMetadataErrorCode(error: Error, meta: IActionMetadata): IActionMetadata {
	const modMeta = Object.assign({}, meta);

	if ((error as any).status === 401) {
		modMeta.errorCode = ErrorCode.UNAUTHORIZED;
		return modMeta;
	}

	if ((error as any).status === 403) {
		modMeta.errorCode = ErrorCode.FORBIDDEN;
		return modMeta;
	}

	if ((error as any).status === 500) {
		modMeta.errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
		return modMeta;
	}

	return modMeta;
}
