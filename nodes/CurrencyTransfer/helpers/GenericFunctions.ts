import {
	IExecuteSingleFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

import { stringify, IStringifyBaseOptions } from 'qs';

const isEmptyParam = (param: any) => {
  if(param === null) { return true }

  if(typeof param === 'object') {
    Object.keys(param).length === 0
  } else {
    return param === '' || param == 0.0
  }
}

const qsSettings = {
  allowEmptyArrays: true, arrayFormat: 'brackets', skipNulls: true
} as IStringifyBaseOptions;

// As the declerative-style for n8n does not allow us to pass options to `qs`.
// Which used to build the query string, when needed. We instead build the
// query string in a `preSend` function ourself.
export async function customeQueryParams(
  this: IExecuteSingleFunctions,
  requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
  const qsParams = requestOptions.qs;

  if( isEmptyParam(requestOptions.qs) ) {
    return requestOptions
  } else {
    const queryString = stringify(qsParams, qsSettings)
    const url = requestOptions.url

    // Overwrite request options
    requestOptions.qs = {};
    requestOptions.url = `${url}?${queryString}`

    return requestOptions
  };
};

export async function removeEmptyBodyParameters(
  this: IExecuteSingleFunctions,
  requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
  const body = requestOptions.body as any;

  if(typeof body === 'object' && Object.getOwnPropertyNames(body).length != 0) {
    Object.keys(body).forEach(key => {
      if(isEmptyParam(body[key])) {
        delete body[key];
      }
    })

    requestOptions.body = body;
  };

  return requestOptions;
};
