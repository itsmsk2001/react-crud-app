require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

console.log('--- MongoDB Connection Debug Script ---');
console.log('Node Version:', process.version);
if (!uri) {
    console.error('ERROR: MONGO_URI is undefined. Check your .env file.');
    process.exit(1);
}

// Mask password for logging
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log('Content of MONGO_URI:', maskedUri);

console.log('Attempting to connect...');

mongoose.connect(uri)
    .then((conn) => {
        console.log(`\nSUCCESS! MongoDB Connected: ${conn.connection.host}`);
        process.exit(0);
    })
    .catch((error) => {
        console.error('\nCONNECTION FAILED');
        console.error('Error Name:', error.name);
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);

        if (error.reason) {
            console.error('Error Reason:', error.reason);
        }

        console.log('\n--- Troubleshooting Tips ---');
        if (error.message.includes('whitelist')) {
            console.log('1. IP Whitelist issue. Double check 0.0.0.0/0 is Active in Atlas Network Access.');
        } else if (error.code === 'ENOTFOUND') {
            console.log('1. DNS/Network issue. Your network might be blocking MongoDB SRV lookup.');
            console.log('2. Try using a standard connection string (non-srv) if available.');
        } else if (error.name === 'MongoServerError' && error.code === 8000) {
            console.log('1. Authentication failed. Check username and password.');
        }

        process.exit(1);
    });
