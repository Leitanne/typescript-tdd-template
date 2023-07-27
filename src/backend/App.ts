const express = require('express')
const app = express()
const tasks_routes = require('../user/infrastructure/routes/tasks')

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

app.use(express.json());
app.use('/api/tasks', tasks_routes);