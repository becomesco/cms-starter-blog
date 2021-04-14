import { BCMSFunctionBuilder } from '@becomes/cms-backend';

module.exports = BCMSFunctionBuilder({
  config: {
    name: 'test',
    public: false,
  },
  handler: async () => {
    return {
      message: 'This is test!',
    };
  },
});
