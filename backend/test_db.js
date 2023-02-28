const dbLib = require('./db');

async function test() {
    const db = await dbLib.openConnection();
    // Create the users table
    await dbLib.createUserTable(db);

    // Insert a user
    await dbLib.insertOrUpdateUser(db, 'testuser', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser1', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser2', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser3', 'password');
    await dbLib.insertOrUpdateUser(db, 'testuser4', 'password');

    // // Get a user by username
    const user = await dbLib.getUserByUsername(db, 'testuser');
    console.log(user);

    // Create the token table
    await dbLib.createTokenTable(db);

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

    await dbLib.closeConnection(db);
}

test();

