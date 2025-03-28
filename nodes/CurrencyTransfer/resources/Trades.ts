import { INodeProperties } from 'n8n-workflow';

export const TradeOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'trade'
        ]
      }
    },
    options: [
      {
        name: 'List',
        value: 'list',
        action: 'List trades',
        description: 'List all trades',
        routing: {
          request: {
            method: 'GET',
            url: 'trades',
            qs: {
              page: '={{$parameter.pageNumber}}',
              per_page: '={{$parameter.perPage}}'
            },
          },
        },
      },
    ],
    default: 'list'
  }
]
