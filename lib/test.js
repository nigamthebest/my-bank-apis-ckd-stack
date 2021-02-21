const fetch = require('node-fetch');
async function makeHttpCall(method = 'POST', url = '', data = {}, headers = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}
makeHttpCall('POST', 'http://bankb-bigbl-1wx58wk4eou7a-1886738708.us-east-1.elb.amazonaws.com/user/register', { email_address: "ankitni1234@amazon.com", password: "ankitni", first_name: "ankit", last_name: "nigam" })
//makeHttpCall('POST', 'https://hookb.in/wNZzOYYpg2cz88VDyeKY', { email_address: "ankitni1234@amx.com", password: "ankitni", first_name: "ankit", last_name: "nigam" })
.then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });