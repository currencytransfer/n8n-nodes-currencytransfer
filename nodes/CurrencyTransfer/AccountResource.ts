import { INodeProperties } from 'n8n-workflow';

export const AccountsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'account',
        ]
      }
    },
    options: [
      {
        name: 'List',
        value: 'list',
        action: 'List accounts',
        description: 'Pull information for all account of the current client',
        routing: {
          request: {
            method: 'GET',
            url: 'accounts'
          }
        }
      },
      {
        name: 'Broker Accounts',
        value: 'list_account_broker_accounts',
        action: 'List broker accounts',
        description: 'Pull information for broker accounts',
        routing: {
          request: {
            method: 'GET',
            url: '=accounts/{{$parameter.uuid}}/broker_accounts'
          }
        },
      }
    ],
    default: 'list'
  }
]
