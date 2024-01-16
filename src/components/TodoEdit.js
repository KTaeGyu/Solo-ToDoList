import { useCallback, useEffect, useState } from "react";
import './TodoEdit.css';

function TodoEdit({ selectedTodo, inUpdate, onUpdate }) {
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value)
    }, []);

    const onSubmit = useCallback((e) => {
        onUpdate(selectedTodo.id, value);
        setValue('');
        e.preventDefault();
        },[onUpdate, value]);
    
    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.text);
        }
    }, [selectedTodo]);

    return (
        <div className='background'>
            <form onSubmit={onSubmit} className='todoedit__insert'>
                <h2>수정하기</h2>
                <input
                onChange={onChange}
                value={value}
                placeholder='할 일을 입력하세요'
                />
                <button type='submit'>수정하기</button>
            </form>
        </div>
    );
}

export default TodoEdit;