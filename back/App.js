import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/todos', (req, res) => {
    const jsonData = [{
        id: '112545523',
        title: 'gg123',
        text: 'test',
        completed: false,
    }];

    res.json(jsonData);
});

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});