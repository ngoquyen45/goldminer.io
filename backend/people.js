const bcrypt = require('bcrypt');
const dbLib = require('./db');

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

async function createPeoples() {
    const db = await dbLib.openConnection();
    // Create the users table
    await dbLib.createUserTable(db);

    // Create the token table
    await dbLib.createTokenTable(db);
    
    for (let i = 0; i < persons.length; i++) {
        const hash = await bcrypt.hash(persons[i].password, 10);
        await dbLib.insertOrUpdateUser(db, persons[i].name, hash);
    }
    await dbLib.openConnection();
}

createPeoples()

module.exports = createPeoples;