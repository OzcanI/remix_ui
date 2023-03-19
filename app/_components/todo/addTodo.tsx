import { Form } from "@remix-run/react"
import { useState } from "react"
import { TextInput } from "../inputs/textInput"

export const AddTodo = () => {
    const [content, setContent] = useState('')
    return <Form method="post" action="/api/add_todo" onSubmit={() => {setContent('')}}>
        <TextInput placeHolder="Add a new todo" name={'todo_content'} value={content} onChange={setContent}/>
    </Form>
}