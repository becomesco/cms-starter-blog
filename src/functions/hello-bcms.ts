import { BCMSFunctionBuilder } from '@becomes/cms-backend';

module.exports = BCMSFunctionBuilder({
  config: {
    name: 'hello-bcms',
    public: false,
  },
  handler: async () => {
    return 'Hello BCMS! (shhh, this is private)';
  },
});
