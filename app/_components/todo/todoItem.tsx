import { Form, useSubmit } from "@remix-run/react";

export const TodoItem = ({todo}: {todo: any}) => {
    const {content, completed, todo_id} = todo;
    const submit = useSubmit()
    
    function handleSubmit(event: any) {
        submit(event.currentTarget, { replace: true });
      }

    return <div className="group flex my-[14px] relative">
        <div className="mt-[2px]">
            <Form method="post" action="/api/update_todo" onChange={handleSubmit}>
                <input type="checkbox" name="completed" onChange={() => {}} checked={completed} 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-transparent"/>
                <input type={'number'} className={'hidden'} value={todo_id} name={'todo_id'} onChange={() => {}}/>
            </Form>
        </div>
        <p className="w-full text-description text-dark-blue-grey ml-[14px]">{content}</p>
        <Form method="post" action="/api/delete_todo" onClick={handleSubmit}>
            <input type={'number'} className={'hidden'} value={todo_id} name={'todo_id'} onChange={() => {}}/>
            <div className="absolute right-[-10px] top-[-2px] p-[10px] hidden group-hover:block cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
                    <path fill="#BFBFBF" fillRule="evenodd" d="M10.68.32c-.426-.426-1.116-.426-1.542 0L5.545 3.912 1.953.32C1.525-.094.845-.088.423.333c-.42.42-.426 1.101-.012 1.53l3.592 3.592L.41 9.047c-.284.274-.398.68-.298 1.06.1.382.398.68.78.78.38.1.786-.014 1.06-.298l3.592-3.592 3.593 3.592c.428.414 1.108.408 1.53-.013.42-.42.426-1.101.012-1.53L7.088 5.456l3.592-3.593c.426-.426.426-1.116 0-1.542z"/>
                </svg>
            </div>
        </Form>
    </div>
}