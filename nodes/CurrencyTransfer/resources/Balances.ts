import { INodeProperties } from 'n8n-workflow';

export const BalanceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    routing: {
      send: {
        preSend: []
      }
    },
    displayOptions: {
      show: {
        resource: [
          'balance',
        ]
      }
    },
    options: [
      {
        name: 'List',
        value: 'list',
        action: 'List balances',
        description: 'Return balances information',
        routing: {
          request: {
            method: 'GET',
            url: 'balances',
          }
        }
      },
      {
        name: 'Balance Deposit Details',
        value: 'balance_deposit_details',
        action: 'Get balance deposit details',
        description: 'Return balances information',
        routing: {
          request: {
            method: 'GET',
            url: 'balances/deposit_details',
            qs: {
              broker_code: '={{$parameter.brokerCode}}',
              currency: '={{$parameter.currency}}'
            }
          }
        }
      },
    ],
    default: 'list'
  }
];

export const BalanceFields: INodeProperties[] = [
  {
    displayName: 'Broker Code',
    description: 'The broker who owns the bank account. Can be found under balances->broker->broker_code.',
    required: true,
    name: 'brokerCode',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'balance'
        ],
        operation: [
          'balance_deposit_details'
        ]
      }
    }
  },
  {
    displayName: 'Currency',
    description: 'The currency of the bank account',
    required: true,
    name: 'currency',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'balance'
        ],
        operation: [
          'balance_deposit_details'
        ]
      }
    }
  }
];

