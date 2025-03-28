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
      {
        name: 'Create',
        value: 'create',
        action: 'Create trade',
        description: 'Book trades based on a quotation',
        routing: {
          request: {
            method: 'POST',
            url: 'trades',
            body: {
              broker_quotation_uuid: '={{ $parameter.brokerQuotationUuid }}',
              agree_to_terms: true
            }
          },
        },
      },
      {
        name: 'Show',
        value: 'show',
        action: 'Show trade',
        description: 'Show information for trade booking',
        routing: {
          request: {
            method: 'GET',
            url: '=trades/{{$parameter.uuid}}',
          },
        },
      },
    ],
    default: 'list'
  }
]

export const TradeFields: INodeProperties[] = [
  {
    displayName: 'Broker Quotation UUID',
    description: 'UUID of broker quotation generated during quotation',
    name: 'brokerQuotationUuid',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'trade'
        ],
        operation: [
          'create'
        ]
      }
    }
  },
];
