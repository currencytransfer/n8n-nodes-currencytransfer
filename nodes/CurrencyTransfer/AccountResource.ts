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
        value: 'list_accounts',
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
            url: '=accounts/{{$parameter.accountUUID}}/broker_accounts'
          }
        },
      }
    ],
    default: 'list_accounts'
  }
]

export const AccountsFields: INodeProperties[] = [
  {
    displayName: 'Accoount UUID',
    description: 'Input Account UUID',
    required: true,
    name: 'accountUUID',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'account'
        ],
        operation: [
          'list_account_broker_accounts'
        ]
      }
    }
  }
]
