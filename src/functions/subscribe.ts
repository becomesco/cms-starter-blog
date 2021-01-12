import {
  BCMSFunctionBuilder,
  CacheControl,
  EntryFactory,
  PropType,
  SocketEventName,
  SocketUtil,
} from '@becomes/cms-backend';

module.exports = BCMSFunctionBuilder({
  config: {
    name: 'subscribe',
    public: false,
  },
  async handler(req) {
    const payload: {
      name: string;
      email: string;
    } = req.body;
    if (typeof payload.name !== 'string') {
      throw Error('Name is required.');
    }
    if (typeof payload.email !== 'string') {
      throw Error('Email is required.');
    }
    const entries = await CacheControl.entry.findAllByTemplateId(
      '5ffe05f22354e61d8bea5229',
    );
    for (const i in entries) {
      const entry = entries[i];
      if (entry.meta[0].props[2].value[0] === payload.email) {
        throw Error(`Email "${payload.email}" is already registered.`);
      }
    }
    const subscription = EntryFactory.instance;
    subscription.templateId = '5ffe05f22354e61d8bea5229';
    subscription.meta = [
      {
        lng: 'en',
        props: [
          {
            label: 'Title',
            name: 'title',
            array: false,
            required: true,
            type: PropType.STRING,
            value: [payload.name],
          },
          {
            label: 'Slug',
            name: 'slug',
            array: false,
            required: true,
            type: PropType.STRING,
            value: [
              payload.name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/_/g, '-')
                .replace(/[^a-z0-9 - ---]/g, ''),
            ],
          },
          {
            name: 'email',
            label: 'Email',
            array: false,
            required: true,
            type: PropType.STRING,
            value: [payload.email],
          },
        ],
      },
    ];
    subscription.content = [
      {
        lng: 'en',
        props: [],
      },
    ];
    const addResult = await CacheControl.entry.add(subscription);
    if (!addResult) {
      throw Error('Failed to add subscription to the database.');
    }
    SocketUtil.emit(SocketEventName.ENTRY, {
      entry: {
        _id: `${subscription._id}`,
        additional: { templateId: subscription.templateId },
      },
      message: 'Entry added',
      source: '',
      type: 'add',
    });
    return 'OK';
  },
});
