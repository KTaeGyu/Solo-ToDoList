import { useState, useRef, useCallback } from 'react';
import TodoEdit from './components/TodoEdit';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function App() {
  // App.js
  // useState로 일정 항목들 관리하기 (todos의 기본값 설정, 추후 setTodos를 이용하여 추가, 수정, 삭제 기능을 넣음)
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '할일1',
      checked: true,
    },
    {
      id: 2,
      text: '할일2',
      checked: true,
    },
    {
      id: 3,
      text: '할일3',
      checked: false,
    },
  ]);
  
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  const nextId = useRef(4);

  const onInsetToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  }, [selectedTodo]);
  
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo);
  };

  const onInsert = useCallback((text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo));
      nextId.current++;
    }, []);

  const onRemove = useCallback((id) => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }, []);

  const onUpdate = useCallback((id, text) => {
    onInsetToggle();

    setTodos((todos) => 
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  }, [onInsetToggle],);

  const onToggle = useCallback((id) => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    }, []);

    return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList 
        todos={todos}
        onToggle={onToggle}
        onRemove={onRemove}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsetToggle}
      />
      {insertToggle && (
        <TodoEdit 
          onInsert={onInsert}
          selectedTodo={selectedTodo}
          onInsertToggle={onInsetToggle}
          onUpdate={onUpdate}
          insertToggle={insertToggle}
        />
      )}
    </TodoTemplate>
  );
}

export default App;


/* 초간단 ToDoList
기능 : 추가

import { useState } from 'react';   # 동적 값 관리하는 함수

function App() {
  const [toDo, setTodo] = useState('')    # const [값, 조작 함수] = ustState(기본값)
  const [toDos, setTodos] = useState([])
  const onChange = (e) => {
    setTodo(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if(toDo === ''){
      return
    }
    setTodos((currentArray) =>[toDo, ...currentArray])
    setTodo('')
  }
  console.log(toDos)

  return (
    <div className="App">
      <h1>ToDoList</h1>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='입력하세요' onChange={onChange} value={toDo}></input>
        <button>등록하기</button>
      </form>
      <ul>
        {toDos.map((item, index)=><li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;
*/