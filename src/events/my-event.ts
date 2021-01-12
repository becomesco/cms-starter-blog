import { BCMSEventBuilder } from '@becomes/cms-backend';

module.exports = BCMSEventBuilder({
  config: {
    method: 'GET',
    scope: 'Template',
  },
  handler: async (data: any) => {
    console.log('here', data);
  },
});
