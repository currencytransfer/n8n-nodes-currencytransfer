import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties
} from 'n8n-workflow';

export class CurrencyTransferBasic implements ICredentialType {
  name = 'CurrencyTransferBasic';
  displayName = 'Currency Transfer Basic Authentication';
  documentationUrl = 'https://beta.currencytransfer.com/api/v1/documentation.html';

  properties: INodeProperties[] = [
    {
      displayName: 'Account Id',
      name: 'username',
      type: 'string',
      default: ''
    },
    {
      displayName: 'Api Key',
      name: 'password',
      type: 'string',
      typeOptions: {
        password: true
      },
      default: ''
    },
    {
      displayName: 'Environment',
      name: 'baseUrl',
      type: 'options',
      default: 'https://beta.currencytransfer.com',
      options: [
        {
          name: 'Beta',
          value: 'https://beta.currencytransfer.com'
        },
        {
          name: 'Production',
          value: 'https://app.currencytransfer.com'
        },
        {
          name: 'Local test',
          value: 'http://localhost:3000'
        },
      ]
    }
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{$credentials.username}}',
        password: '={{$credentials.password}}',
      }
    }
  };
}
