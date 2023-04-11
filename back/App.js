import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

const todos = JSON.parse(fs.readFileSync(`./todos.json`));

const getAllTodos = (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({
                status: 'fail',
                message: 'Error reading the file'
            });
        }

        const todos = JSON.parse(data);

        res.status(200).json({
            status: 'success',
            results: todos.length,
            data: {
                todos
            }
        });
    });
};

const getTodo = (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({
                status: 'fail',
                message: 'Error reading the file'
            });
        }

        const todos = JSON.parse(data);

        const id = parseInt(req.params.id);
        const todo = todos.find(el => el.id === id);

        if (todos.length === todo.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                todo
            }
        });
    });
}

const createTodo = (req, res) => {
    const newTodo = req.body;
    newTodo.text = "";
    newTodo.completed = false;
    todos.push(newTodo);
    fs.writeFile(`./todos.json`, JSON.stringify(todos, null, 2), err => {
        if (err) {
            console.error('Error writing the file:', err);
            return res.status(500).json({
                status: 'fail',
                message: 'Error writing the file'
            });
        }
        res.status(201).json({
            status: 'success',
            data: {
                id: newTodo.id,
                title: newTodo.title,
                text: "",
                completed: false
            }
        })
    });
}

const updateTodo = (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({
                status: 'fail',
                message: 'Error reading the file'
            });
        }

        const todos = JSON.parse(data);

        const id = parseInt(req.params.id);
        const todo = todos.find(el => el.id === id);
        const updatedTodo = req.body;

        console.log(updatedTodo.title);
        console.log(updatedTodo.text);

        if (todos.length === todo.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            });
        }

        fs.writeFile(`./todos.json`, JSON.stringify(todos, null, 2), err => {
            res.status(200).json({
                status: 'success',
                data: {
                    title: updatedTodo.title,
                    text: updatedTodo.text,
                }
            })
        });
    });
}

const deleteTodo = (req, res) =>{
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);3
            return res.status(500).json({
                status: 'fail',
                message: 'Error reading the file'
            });
        }

        const todos = JSON.parse(data);

        const id = parseInt(req.params.id);
        const todo = todos.filter(el => el.id !== id);

        if (todos.length === todo.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid ID'
            });
        }

        fs.writeFile(`./todos.json`, JSON.stringify(todo, null, 2), err => {
            if (err) {
                console.error('Error writing the file:', err);
                return res.status(500).json({
                    status: 'fail',
                    message: 'Error writing the file'
                });
            }
            res.status(204).json({
                status: 'success',
                data: {
                    todo
                }
            });
        });
    });
}

// app.get('/api/todos', getAllTodos);
// app.get('/api/todos/:id', getTodo);
// app.post('/api/todos', createTodo);
// app.patch('/api/todos/:id', updateTodo);
// app.delete('/api/todos/:id', deleteTodo);

app
    .route('/api/todos')
    .get(getAllTodos)
    .post(createTodo);

app
    .route('/api/todos/:id')
    .get(getTodo)
    .patch(updateTodo)
    .delete(deleteTodo);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}...!`);
});