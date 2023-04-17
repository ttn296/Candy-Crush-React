const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/src/index.html')));

app.listen(port, () => {
    console.log(`listening on ${port}`)
});