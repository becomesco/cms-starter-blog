import { BCMSFunctionBuilder } from '@becomes/cms-backend';

module.exports = BCMSFunctionBuilder({
  config: {
    name: 'hello-bcms-public',
    public: true,
  },
  handler: async () => {
    return 'Hello BCMS!';
  },
});
