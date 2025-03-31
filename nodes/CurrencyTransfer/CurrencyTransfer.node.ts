import { INodeType, INodeTypeDescription, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { MetaFields } from './fields/MetaFields';
import { GenericFields } from './fields/GenericFields';
import { AccountsOperations } from './resources/Accounts';
import { QuoteOperations, QuoteFields } from './resources/Quotes';
import { TradeOperations, TradeFields } from './resources/Trades';
import { BeneficiaryOperations, BeneficiaryFields } from './resources/Beneficiaries';
import { PaymentOperations, PaymentFields } from './resources/Payments';
import { BalanceOperations, BalanceFields } from './resources/Balances';

import { getCurrencies } from './helpers/GetCurrenciesResource'

export class CurrencyTransfer implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Currencytransfer',
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
        'Content-Type': 'application/json',
        'User-Agent': 'CT-n8n/1.0'
      },
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
            name: 'Balance',
            value: 'balance'
          },
          {
            name: 'Quote',
            value: 'quote'
          },
          {
            name: 'Trade',
            value: 'trade'
          },
          {
            name: 'Beneficiary',
            value: 'beneficiary'
          },
          {
            name: 'Payment',
            value: 'payment'
          },
        ],
        default: 'quote'
      },

      // Operations
      ...AccountsOperations,
      ...BalanceOperations,
      ...QuoteOperations,
      ...BeneficiaryOperations,
      ...TradeOperations,
      ...PaymentOperations,
      // Fields
      ...GenericFields,
      ...MetaFields,
      ...BalanceFields,
      ...QuoteFields,
      ...TradeFields,
      ...BeneficiaryFields,
      ...PaymentFields
    ]
  };

  methods = {
    loadOptions: {
      getCurrencies
    },
  };
}
