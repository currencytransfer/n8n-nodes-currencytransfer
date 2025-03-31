import { INodeProperties } from 'n8n-workflow';

const resource = [
  'trade', 'beneficiary'
];

const operation = [
  'list'
]

export const MetaFields: INodeProperties[] = [
  {
    displayName: 'Page',
    description: 'Page number',
    name: 'pageNumber',
    type: 'string',
    default: '1',
    displayOptions: {
      show: { resource, operation }
    }
  },
  {
    displayName: 'Per Page',
    description: 'Records per page',
    name: 'perPage',
    type: 'string',
    default: '25',
    displayOptions: {
      show: { resource, operation }
    }
  }
];
