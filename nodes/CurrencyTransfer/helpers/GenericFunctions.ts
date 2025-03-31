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
      if(isEmptyParam(body[key])) {
        delete body[key];
      }
    })

    requestOptions.body = body;
  };

  return requestOptions;
};

const isEmptyParam = (param: any) => {
  if(param === null) { return true }

  if(typeof param === 'object') {
    Object.keys(param).length === 0
  } else {
    return param === '' || param == 0.0
  }
}
