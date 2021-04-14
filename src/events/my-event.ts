import { BCMSEventBuilder } from '@becomes/cms-backend';

exports.event = BCMSEventBuilder({
  config: {
    method: 'ALL',
    scope: 'TEMPLATE',
  },
  handler: async (data) => {
    console.log('here', data);
  },
});
