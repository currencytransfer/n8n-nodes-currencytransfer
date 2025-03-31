import {
  INodeProperties ,
} from 'n8n-workflow';

import {
  removeEmptyBodyParameters
} from '../helpers/GenericFunctions';

const buildBeneficiaryField = (properties: any) => {
  const field: INodeProperties = {
    name: properties.name,
    displayName: properties.displayName,
    description: properties.description,
    default: properties.defaultValue,
    type: 'string',
    displayOptions: {
      show: {
        resource: [
          'beneficiary'
        ],
        operation: [
          'create', 'update'
        ]
      }
    }
  }

  return field
}

const beneficiaryProperties = [
  {
    name: 'nickname',
    displayName: 'Nickname',
    description: 'Easy to remember alias for the beneficiary record. Cannot have two beneficiaries with the same nickname and currency',
    defaultValue: 'JohnSmith'
  },
  {
    name: 'firstName',
    displayName: 'First name',
    description: 'Required if beneficiary type is individual',
    defaultValue: 'John'
  },
  {
    name: 'lastName',
    displayName: 'Last name',
    description: 'Required if beneficiary type is individual',
    defaultValue: 'Smith'
  },
  {
    name: 'companyName',
    displayName: 'Company name',
    description: 'Required if beneficiary type is company',
    defaultValue: ''
  },
  {
    name: 'currency',
    displayName: 'Currency',
    description: '3 letter ISO 4217 currency code',
    defaultValue: ''
  },
  {
    name: 'bankAccountCountry',
    displayName: 'Bank account country',
    description: '2 letter ISO 3166-1 country code',
    defaultValue: ''
  },
  {
    name: 'email',
    displayName: 'Email',
    description: 'Add a beneficiary email where we will send a notification when money are dispatched to this bank account',
    defaultValue: ''
  },
  {
    name: 'accountNumber',
    displayName: 'Account Number',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'sortCode',
    displayName: 'Sort code',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'iban',
    displayName: 'IBAN',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'bicSwift',
    displayName: 'BIC/SWIFT',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'aba',
    displayName: 'ABA',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'bsb',
    displayName: 'BSB',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'routingNumber',
    displayName: 'Routing Number',
    description: 'Bank account details. Different combination of: account_number, sort_code, iban, bic_swift, aba, bsb is needed depending on the currency and bank_account_country',
    defaultValue: ''
  },
  {
    name: 'cnaps',
    displayName: 'CNAPS',
    description: 'Required if the bank_account_country=CNand currency=CNY',
    defaultValue: ''
  },
  {
    name: 'bankBranchNumber',
    displayName: 'Bank Branch Number',
    description: 'Required for some currency and bank_account_country combinations',
    defaultValue: ''
  },
  {
    name: 'cpfCnpj',
    displayName: 'CPF/CNPJ',
    description: 'Required for some currency and bank_account_country combinations',
    defaultValue: ''
  },
  {
    name: 'telephone',
    displayName: 'Telephone Number',
    description: 'Required if the bank_account_country=BRand currency=BRL',
    defaultValue: ''
  },
  {
    name: 'bankCode',
    displayName: 'Bank Code',
    description: 'Required for some currency and bank_account_country combinations',
    defaultValue: ''
  },
  {
    name: 'accountType',
    displayName: 'Account Type',
    description: 'Required for some currency and bank_account_country combinations',
    defaultValue: ''
  },
  {
    name: 'country',
    displayName: 'Country',
    description: 'Beneficiary address information. 2 letter ISO 3166-1 country code',
    defaultValue: ''
  },
  {
    name: 'city',
    displayName: 'City',
    description: 'Beneficiary address information',
    defaultValue: ''
  },
  {
    name: 'beneficiaryState',
    displayName: 'State',
    description: 'Beneficiary address information',
    defaultValue: ''
  },
  {
    name: 'postalCode',
    displayName: 'Postal Code',
    description: 'Beneficiary address information',
    defaultValue: ''
  },
  {
    name: 'line1',
    displayName: 'Address line 1',
    description: 'Beneficiary address information',
    defaultValue: ''
  },
  {
    name: 'line2',
    displayName: 'Address line 2',
    description: 'Beneficiary address information',
    defaultValue: ''
  },
];
const stringFields = beneficiaryProperties.map(buildBeneficiaryField);

const createOrUpdateParams = {
  nickname: '={{$parameter.nickname}}',
  type: '={{$parameter.beneficiaryType}}',
  first_name: '={{$parameter.firstName}}',
  last_name: '={{$parameter.lastName}}',
  company_name: '={{$parameter.companyName}}',
  bank_account_country: '={{$parameter.bankAccountCountry}}',
  currency: '={{$parameter.currency}}',
  email: '={{$parameter.email}}',
  account_number: '={{$parameter.accountNumber}}',
  sort_code: '={{$parameter.sortCode}}',
  iban: '={{$parameter.iban}}',
  bic_swift: '={{$parameter.bicSwift}}',
  aba: '={{$parameter.aba}}',
  bsb: '={{$parameter.bsb}}',
  routing_number: '={{$parameter.routingNumber}}',
  cnaps: '={{$parameter.cnaps}}',
  bank_branch_number: '={{$parameter.bankBranchNumber}}',
  cpf_cnpj: '={{$parameter.cpfCnpj}}',
  telephone: '={{$parameter.telephone}}',
  bank_code: '={{$parameter.bankCode}}',
  account_type: '={{$parameter.accountType}}',
  line1: '={{$parameter.line1}}',
  line2: '={{$parameter.line2}}',
  city: '={{$parameter.city}}',
  country: '={{$parameter.country}}',
  state: '={{$parameter.beneficiaryState}}',
  postal_code: '={{$parameter.postalCode}}',
}

export const BeneficiaryOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'beneficiary'
        ]
      }
    },
    routing: {
      send: {
        preSend: [removeEmptyBodyParameters]
      }
    },
    options: [
      {
        name: 'List',
        value: 'list',
        action: 'List benefiaries',
        description: 'List all trades',
        routing: {
          request: {
            method: 'GET',
            url: 'beneficiaries',
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
        action: 'Create beneficiary',
        description: 'Create a beneficiary providing all the required fields. **Note: ** Bank account fields marked as optional are conditionally required depending on the beneficiary country/currency combination. To get info for the requirements please check Currencies/Bank account fields.',
        routing: {
          request: {
            method: 'POST',
            url: 'beneficiaries',
            body: createOrUpdateParams
          },
        },
      },
      {
        name: 'Show',
        value: 'show',
        action: 'Show beneficiary',
        description: 'Show information for beneficiary',
        routing: {
          request: {
            method: 'GET',
            url: '=beneficiaries/{{$parameter.uuid}}',
          },
        },
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update beneficiary',
        description: 'Update information for beneficiary',
        routing: {
          request: {
            method: 'PUT',
            url: '=beneficiaries/{{$parameter.uuid}}',
            body: createOrUpdateParams
          },
        },
      },
    ],
    default: 'list'
  }
];

export const BeneficiaryFields: INodeProperties[] = [
  {
    displayName: 'Type',
    description: 'Beficiaries can be either a Company or an Individual',
    name: 'beneficiaryType',
    type: 'options',
    options: [
      {
        name: 'Individual',
        value: 'individual'
      },
      {
        name: 'Company',
        value: 'company'
      }
    ],
    default: 'individual',
    displayOptions: {
      show: {
        resource: [
          'beneficiary'
        ],
        operation: [
          'create', 'update'
        ]
      }
    }
  },
  ...stringFields
];
