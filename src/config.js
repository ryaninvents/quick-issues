/** @babel */
export default {
    userToken: {
        title: 'User token',
        order: 0,
        description: 'GitHub user token; visit [tokens page](https://github.com/settings/tokens) to generate',
        type: 'string',
        default: '',
    },
    displayOptions: {
        type: 'object',
        order: 1,
        properties: {
            defaultFilter: {
                title: 'Default filter',
                description: 'Default filter to apply when GitHub Issues is loaded.',
                type: 'string',
                default: 'open',
                enum: [
                    {value: 'open', description: 'Open'},
                    {value: 'closed', description: 'Closed'},
                    {value: 'all', description: 'All'},
                ],
            },
        },
    },
};
