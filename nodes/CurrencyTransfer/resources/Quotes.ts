import { INodeProperties } from 'n8n-workflow';

export const QuoteOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'quote',
        ]
      }
    },
    options: [
      {
        name: 'Create',
        value: 'create_quote',
        action: 'Create quote',
        description: 'Create a quotation',
        routing: {
          request: {
            method: 'POST',
            url: 'quotes',
            body: {
              sell_currency: '={{$parameter.quoteSellCurrency}}',
              buy_currency: '={{$parameter.quoteBuyCurrency}}',
              amount: '={{$parameter.quoteAmount}}',
              side: '={{$parameter.quoteSide}}',
              delivery_date: '={{$parameter.quoteDeliveryDate}}',
              reason: '={{$parameter.quoteReason}}'
            }
          }
        }
      },
      {
        name: 'Refresh',
        value: 'refresh_quote',
        action: 'Refresh quote',
        description: 'Returns a new array with broker quotations for the requested quote. Important: The returned broker quotations are valid for 15 seconds.',
        routing: {
          request: {
            method: 'PUT',
            url: '=quotes/{{$parameter.quoteUUID}}'
          }
        }
      },
      {
        name: 'Check Warning',
        value: 'quote_warning',
        action: 'Check quote',
        description: 'Check the quote the client is about for potential warnings',
        routing: {
          request: {
            method: 'GET',
            url: 'quote_warnings',
            qs: {
              sell_currency: '={{$parameter.quoteSellCurrency}}',
              buy_currency: '={{$parameter.quoteBuyCurrency}}',
              amount: '={{$parameter.quoteAmount}}',
              side: '={{$parameter.quoteSide}}',
            }
          }
        }
      },
    ],
    default: 'create_quote'
  }
]

export const QuoteFields: INodeProperties[] = [
  {
    displayName: 'Sell Currency',
    description: 'Sell currency for quote',
    required: true,
    name: 'quoteSellCurrency',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'quote'
        ],
        operation: [
          'create_quote', 'quote_warning'
        ]
      }
    }
  },
  {
    displayName: 'Buy Currency',
    description: 'Buy currency for quote',
    required: true,
    name: 'quoteBuyCurrency',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'quote'
        ],
        operation: [
          'create_quote', 'quote_warning'
        ]
      }
    }
  },
  {
    displayName: 'Amount',
    description: 'Amount for the converion',
    required: true,
    name: 'quoteAmount',
    type: 'number',
    typeOptions: {
      numberPrecision: 2,
    },
    default: '',
    displayOptions: {
      show: {
        resource: [
          'quote', 'quote_warning'
        ],
        operation: [
          'create_quote', 'quote_warning'
        ]
      }
    }
  },
  {
    displayName: 'Side',
    description: 'Is the amount sell or buy',
    required: true,
    name: 'quoteSide',
    type: 'options',
    options: [
      {
        name: 'Sell',
        value: 'sell'
      },
      {
        name: 'Buy',
        value: 'buy'
      }
    ],
    default: 'buy',
    displayOptions: {
      show: {
        resource: [
          'quote'
        ],
        operation: [
          'create_quote', 'quote_warning'
        ]
      }
    }
  },
  {
    displayName: 'Delivery Date',
    description: 'Expected delivery date',
    required: true,
    name: 'quoteDeliveryDate',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'quote'
        ],
        operation: [
          'create_quote'
        ]
      }
    }
  },
  {
    displayName: 'Reason',
    description: 'Reason for the transactions',
    required: true,
    name: 'quoteReason',
    type: 'string',
    default: 'Payment',
    displayOptions: {
      show: {
        resource: [
          'quote'
        ],
        operation: [
          'create_quote'
        ]
      }
    }
  },
  {
    displayName: 'Quote UUID',
    description: 'Unique identifier for quotation',
    required: true,
    name: 'quoteUUID',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'quote'
        ],
        operation: [
          'refresh_quote'
        ]
      }
    }
  }
]
