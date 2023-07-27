import * as Tasks from "../../../shared/utils/tasks"

const showTasks = ((req: any, res: any) => {
    let taskList: any = Tasks.getTaskList();
    res.json(taskList);
});

const findTask = ((req: any, res: any) => {
    const id = Number(req.params.id);
    const task = Tasks.findTask(id);

    res.json(task);
});

const addTask = ((req: any, res: any) => {
    Tasks.addTask(req.body.nombre);
    res.status(201).json('Tarea añadida');
});

const deleteTask = ((req: any, res: any) => {
    const id = Number(req.params.id);
    Tasks.deleteTask(id);
    res.status(200).json('Tarea borrada');
});

const markAsComplete = ((req: any, res: any) => {
    const id = Number(req.params.id);
    Tasks.markAsComplete(id);
    res.status(200).json('Marcada como completada');
});

module.exports = {
    addTask,
    findTask,
    deleteTask,
    markAsComplete,
    showTasks
}