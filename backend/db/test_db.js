const dbLib = require('./manager');
const poolLib = require('./pool');

async function test() {
    const db = await poolLib.getConnection();
    // Create the users table
    await dbLib.createUserTable(db);

    // Create the token table
    await dbLib.createTokenTable(db);
    // Insert a user
    await dbLib.insertOrUpdateUser(db, 'testuser', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser1', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser2', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser3', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser4', 'password');

    // // Get a user by username
    const user = await dbLib.getUserByUsername(db, 'testuser');
    console.log(user);


    // Generate a token for the user
    const token = await dbLib.createOrUpdateToken(db, 'testuser');
    if (token) {
        // Validate the token
        const result = await dbLib.validateToken(db, token);
        console.log(result);
    }
    else {
        console.log("token = null")
    }

    await poolLib.releaseConnection();
}

test();

