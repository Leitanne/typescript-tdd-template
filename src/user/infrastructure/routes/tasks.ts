import Router from 'express';
import * as express from 'express';

const {
    addTask,
    findTask,
    deleteTask,
    markAsComplete
} = require('../controllers/tasks');
