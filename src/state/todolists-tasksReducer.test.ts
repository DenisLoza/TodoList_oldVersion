import {tasksStateType, todoListType} from "../App";
import {addTodoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasksReducer";

test ("ids should be equals", () => {
    // задаем стартовый стэйт для тасок = пустой объект
  const startTasksState: tasksStateType = {};
    // задаем стартовый стэйт для туду-листов = пустой массив
  const startTodoListsState: Array<todoListType> = [];

// ActionCreator
    // что сделать: добавить туду-лист с именем "newTodoList"
  const action = addTodoListAC("newTodoList");
    // отправь стартовые данные из startTasksState и отправь action в файл-редьюсер tasksReducer
  const endTasksState = tasksReducer(startTasksState, action)
    // отправь стартовые данные из startTodoListsState и отправь action в файл-редьюсер todoListsReducer
  const endTodoListsState = todoListsReducer(startTodoListsState, action)

    // получаем все ключи тасок
  const keys = Object.keys(endTasksState)
      // id таски будет равно значению keys[0]
  const idFromTasks = keys[0]
    // id тудулист будет равно значению todoList[0].id
  const idFromTodoList = endTodoListsState[0].id

    //
  expect(idFromTasks).toBe(action.todoListId)
  expect(idFromTodoList).toBe(action.todoListId)
})
