import { INodeProperties } from 'n8n-workflow';

export const GenericFields: INodeProperties[] = [
  {
    displayName: 'UUID',
    description: 'Resource UUID',
    required: true,
    name: 'uuid',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: [
          'account', 'trade'
        ],
        operation: [
          'list_account_broker_accounts', 'show', 'document_upload'
        ]
      }
    }
  }
];
