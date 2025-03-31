import { INodeProperties } from 'n8n-workflow';

import {
  removeEmptyBodyParameters
} from '../helpers/GenericFunctions';

const createOrUpdateParams = {
  amount: '={{$parameter.amount}}',
  reference: '={{$parameter.reference}}',
  beneficiary_uuid: '={{$parameter.beneficiaryUUID}}',
  purpose: '={{$parameter.purpose}}'
}

export const PaymentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'payment',
        ]
      }
    },
    routing: {
      send: {
        preSend: [removeEmptyBodyParameters]
      },
    },
    options: [
      {
        name: 'List',
        value: 'list',
        action: 'List trade payments',
        description: 'List all payments for a given trade',
        routing: {
          request: {
            method: 'GET',
            url: '=trades/{{$parameter.tradeUUID}}/payments',
          }
        }
      },
      {
        name: 'Create',
        value: 'create',
        action: 'Create trade payment',
        description: 'Create payment',
        routing: {
          request: {
            method: 'POST',
            url: '=trades/{{$parameter.tradeUUID}}/payments',
            body: createOrUpdateParams
          }
        }
      },
      {
        name: 'Show',
        value: 'show',
        action: 'Show trade payment',
        description: 'Show payment',
        routing: {
          request: {
            method: 'GET',
            url: '=trades/{{$parameter.tradeUUID}}/payments/{{$parameter.uuid}}'
          }
        }
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Create trade payment',
        description: 'Update trade payment. Payments can be updated in the first 5 minutes after creation. After this they are locked.',
        routing: {
          request: {
            method: 'PUT',
            url: '=trades/{{$parameter.tradeUUID}}/payments/{{$parameter.uuid}}',
            body: createOrUpdateParams
          }
        }
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete trade payment',
        description: 'Delete trade payment. Payments can be deleted in the first 5 minutes after creation. After this they are locked.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=trades/{{$parameter.tradeUUID}}/payments/{{$parameter.uuid}}'
          }
        }
      },
    ],
    default: 'list'
  }
]

export const PaymentFields: INodeProperties[] = [
  {
    displayName: 'Trade UUID',
    description: 'Identifier of the trade',
    name: 'tradeUUID',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'payment'
        ],
        operation: [
          'list', 'create', 'update', 'delete', 'show'
        ]
      }
    }
  },
  {
    displayName: 'Amount',
    description: 'Amount of the payment. If 0 the payment will be deleted.',
    name: 'amount',
    type: 'number',
    default: 0.0,
    displayOptions: {
      show: {
        resource: [
          'payment'
        ],
        operation: [
          'create', 'update'
        ]
      }
    }
  },
  {
    displayName: 'Refernce',
    description: 'A reference to be added in the payment order by the broker. Maximum 25 characters are allowed. Allowed characters: [a-zA-Z0-9\s\-/?:().,\'+]\'].',
    name: 'reference',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'payment'
        ],
        operation: [
          'create', 'update'
        ]
      }
    }
  },
  {
    displayName: 'Beneficiary UUID',
    description: 'Beneficiary uuid to be payed',
    name: 'beneficiaryUUID',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'payment'
        ],
        operation: [
          'create', 'update'
        ]
      }
    }
  },
  {
    displayName: 'Purpose of Payment',
    description: "Purpose of the payment. This field is required for some partners and if the beneficiary is in some countries. To check if it\'s required use the endpoint: `GET /trades/{trade_uuid}/payments/purpose_required?beneficiary_uuid'",
    name: 'purpose',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'payment'
        ],
        operation: [
          'create', 'update'
        ]
      }
    }
  },
]
