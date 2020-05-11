import React from 'react';
import './TodoList.css';

export type tasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: Array<tasksType>
}

export function TodoList(props: TodoListType) {
    
    return (
      <div>
       <h3>{props.title}</h3>
        <div>
          <input type="text" name="" id=""/>
          <button>+</button>
        </div>
          <ul>
            { props.tasks.map( t => 
                <li>
                    <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <button onClick={ () => { alert(t.id)}}>x</button>
                </li>
            )
            }
            {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li> 
            <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
            <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li> */}
          </ul>
            <div>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
      </div>
    )
  }