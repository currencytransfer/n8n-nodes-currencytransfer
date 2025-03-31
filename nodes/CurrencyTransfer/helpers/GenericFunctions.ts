import {
	IExecuteSingleFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function removeEmptyBodyParameters(
  this: IExecuteSingleFunctions,
  requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
  const body = requestOptions.body as any;

  if(typeof body === 'object' && Object.getOwnPropertyNames(body).length != 0) {
    Object.keys(body).forEach(key => {
      if(body[key] === '') {
        delete body[key];
      }
    })

    requestOptions.body = body;
  };

  return requestOptions;
};
