import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

let backPaths: string;

//Para cuando se testea el transpilador o el typescript, la ruta relativa al JSON es diferente
if(__dirname.search(/\\dist\\/) == -1){
    backPaths = '../../../'
}else{
    backPaths = '../../../../'
}

console.log(backPaths);
console.log(__dirname);

const JsonPath = join(__dirname, backPaths+'src/shared/infrastructure/persistance/tasks.json');

let jsonData: any;

type JsonItem = {
    id: number,
    nombre: String,
    completada: boolean
}

try{
    const jsonContent = readFileSync(JsonPath, 'utf-8');
    jsonData = JSON.parse(jsonContent);
}catch(e){
    console.error(e);
}

function addTask(taskName: string): boolean{
    let maxId: number = 0;
    
    jsonData.tasks.forEach((task: any) => (task.id > maxId) ? maxId = task.id : 0);

    let newJsonObject: JsonItem;
    newJsonObject = {
        id: maxId + 1,
        nombre: taskName,
        completada: false
    };

    jsonData.tasks.push(newJsonObject);

    return writeData(jsonData);
}

function writeData(jsonData: any): boolean{
    let check = true;
    let jsonString:string = JSON.stringify(jsonData, null, 4);

    try {
        writeFileSync(JsonPath, jsonString);
    }catch(e){
        check = false;
        console.error(e);
    }

    return check;
}

function findTask(id: number): JsonItem{
    let taskFound:JsonItem = jsonData.tasks.find((task: JsonItem) => task.id == id);

    return taskFound;
}

function deleteTask(id: number): boolean{
    let index: number = getTaskIndex(id);

    if(index != -1){
        jsonData.tasks.splice(index, 1);
        return writeData(jsonData);
    }else{
        return false;
    }
}

function getTaskIndex(id: number){
    let taskExists:JsonItem = findTask(id);

    if(taskExists != undefined){
        return jsonData.tasks.indexOf(taskExists);
    }else{
        return -1;
    }

}
function markAsComplete(id: number): boolean {
    
    let index: number = getTaskIndex(id);
    
    if(index != -1){
        jsonData.tasks[index].completada = true;
        return writeData(jsonData);
    }else{
        return false;
    }
}

function getTaskList(){
    return jsonData;
}

export {addTask, findTask, deleteTask, markAsComplete, JsonItem, getTaskList}