import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

interface CurrencyCache {
  data: INodePropertyOptions[] | null;
  expireAt: number;
  expirationTime: number;
}

const currencyCache: CurrencyCache = {
  data: null,
  expireAt: 0,
  expirationTime: 60 * 60 * 1000, // 1 hour
};

async function fetchFromApi(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials('CurrencyTransferBasic');
  const baseUrl = credentials.baseUrl;
  const response = await this.helpers.httpRequestWithAuthentication.call(
    this,
    'CurrencyTransferBasic',
    {
      method: 'GET',
      url: `${baseUrl}/api/v1/currencies/supported`,
    }
  );

  const data = response['data'].map((c: { name: string, code: string }) => {
    return {
      name: `${c.code} - ${c.name}`,
      value: c.code
    }
  });

  return data
}

export async function getCurrencies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const currentTime = Date.now();

  if(!currencyCache.data || currentTime > currencyCache.expireAt) {
    currencyCache.data = await fetchFromApi.call(this);
    currencyCache.expireAt = currentTime + currencyCache.expirationTime
  }

  return currencyCache.data
}
