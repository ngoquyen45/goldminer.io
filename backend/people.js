const bcrypt = require('bcrypt');

const persons = [
    {
        name: 'dai',
        password: '536323'
    },
    {
        name: 'dat',
        password: '923423'
    },
    {
        name: 'dong',
        password: '892303'
    },
    {
        name: 'hanh',
        password: '963563'
    },
    {
        name: 'loi',
        password: '562722'
    },
    {
        name: 'nghia',
        password: '346425'
    },
    {
        name: 'ngoc',
        password: '452563'
    },
    {
        name: 'quyen',
        password: '645335'
    },
    {
        name: 'son',
        password: '687253'
    },
    {
        name: 'thang',
        password: '843363'
    },
    {
        name: 'thanh',
        password: '473734'
    },
    {
        name: 'tien',
        password: '247363'
    },
    {
        name: 'tuan',
        password: '848474'
    },
    {
        name: 'tung',
        password: '464563'
    }
];

async function getUsers() {
    const data = [];
    for (let i = 0; i < persons.length; i++) {
        const hash = await bcrypt.hash(persons[i].password, 10);
        data.push({
            id: i + 1,
            username: persons[i].name,
            password: hash
        });
    }
    return data;
}

module.exports = getUsers;