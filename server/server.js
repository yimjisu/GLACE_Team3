const express = require('express');

const app = express();
const router1 = require('./router/main');
const router2 = require('./router/firebase/service');

app.use('/', router1)
app.use('/firebase', router2)

const port = 3001
app.listen(port, function() {
    console.log(`Listening on port ${port}`)
});