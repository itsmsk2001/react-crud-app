const API_URL = 'http://localhost:5000/api/users';

async function runTests() {
    console.log('--- Starting API Verification ---');

    try {
        // 1. Create User
        console.log('\nTesting POST /api/users...');
        const newUser = {
            firstName: 'Test',
            lastName: 'User',
            email: `test${Date.now()}@example.com`,
            phone: '1234567890'
        };

        const createRes = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (!createRes.ok) throw new Error(`Create failed: ${createRes.status} ${createRes.statusText}`);
        const createdUser = await createRes.json();
        console.log('User Created:', createdUser._id);

        // 2. Get Users
        console.log('\nTesting GET /api/users...');
        const listRes = await fetch(API_URL);
        if (!listRes.ok) throw new Error(`List failed: ${listRes.status}`);
        const users = await listRes.json();
        console.log(`Users found: ${users.length}`);
        const found = users.find(u => u._id === createdUser._id);
        if (!found) throw new Error('Created user not found in list');
        console.log('Created user verified in list.');

        // 3. Update User
        console.log(`\nTesting PUT /api/users/${createdUser._id}...`);
        const updateRes = await fetch(`${API_URL}/${createdUser._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName: 'Updated' })
        });
        if (!updateRes.ok) throw new Error(`Update failed: ${updateRes.status}`);
        const updatedUser = await updateRes.json();
        console.log('User Updated:', updatedUser.firstName);
        if (updatedUser.firstName !== 'Updated') throw new Error('Update verification failed');

        // 4. Delete User
        console.log(`\nTesting DELETE /api/users/${createdUser._id}...`);
        const deleteRes = await fetch(`${API_URL}/${createdUser._id}`, {
            method: 'DELETE'
        });
        if (!deleteRes.ok) throw new Error(`Delete failed: ${deleteRes.status}`);
        console.log('User Deleted.');

        // Verify Deletion
        const getRes = await fetch(`${API_URL}/${createdUser._id}`);
        if (getRes.status !== 404) throw new Error('User still exists after deletion');
        console.log('Deletion verified.');

        console.log('\n--- API Verification Passed Successfully ---');

    } catch (error) {
        console.error('\n!!! API Verification Failed !!!');
        console.error(error);
        process.exit(1);
    }
}

runTests();
