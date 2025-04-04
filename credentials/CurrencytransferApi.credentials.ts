import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest
} from 'n8n-workflow';

export class CurrencytransferApi implements ICredentialType {
  name = 'currencytransferApi';
  displayName = 'Currencytransfer API';
  documentationUrl = 'https://stage.currencytransfer.com/api/v1/documentation.html';

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
      default: 'https://stage.currencytransfer.com',
      options: [
        {
          name: 'Staging',
          value: 'https://stage.currencytransfer.com'
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

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/api/v1/user'
    }
  }
}
