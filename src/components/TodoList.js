import React, { useCallback } from "react";
import TodoListItem from './TodoListItem'
import './TodoList.css'
import {List} from 'react-virtualized'

function TodoList({ todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle }) {
  const rowRender = useCallback(({index, key, style}) => {
    const todo = todos[index];
    return(
      <TodoListItem
        todo={todo}
        key={key}
        onToggle={onToggle}
        onRemove={onRemove}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
        style={style}
      />
    )
  }, [ todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle ]);

  return (
    <List
      className="TodoList"
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRender}
      list={todos}
      style={{outline:'none'}}
    />
  );
}

export default React.memo(TodoList);