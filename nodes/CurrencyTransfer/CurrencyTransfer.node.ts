import { INodeType, INodeTypeDescription  } from 'n8n-workflow';
import { AccountsFields, AccountsOperations } from './resources/Accounts';
import { QuoteOperations, QuoteFields } from './resources/Quotes';

export class CurrencyTransfer implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Currency Transfer',
    name: 'currencyTransfer',
    icon: 'file:ct-icon.svg',
    description: 'Easy and simple currency conversion',
    group: [],
    version: 1,
    subtitle: '={{ $parameter["operation"] + ": " $parameter["resource"] }}',
    defaults: {
      name: 'Currency Transfer'
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'CurrencyTransferBasic',
        required: true
      }
    ],
    requestDefaults: {
      baseURL: '={{ $credentials.baseUrl }}/api/v1/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Account',
            value: 'account'
          },
          {
            name: 'Quote',
            value: 'quote'
          }
        ],
        default: 'account'
      },

      ...AccountsOperations,
      ...AccountsFields,
      ...QuoteOperations,
      ...QuoteFields
    ]
  };
}
