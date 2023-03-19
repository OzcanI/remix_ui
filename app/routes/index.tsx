import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import axios from "axios";
import { json } from "react-router";
import { requireUser } from "~/session.server";
import { Card } from "~/_components/card";
import { TextInput } from "~/_components/inputs/textInput";
import { AddTodo } from "~/_components/todo/addTodo";
import { TodoFilter } from "~/_components/todo/todoFilter";
import { TodoItem } from "~/_components/todo/todoItem";
import { getBearerConfig } from "~/_utils/auth";

export async function loader({ request }: LoaderArgs) {
    const user = await requireUser(request)
    const url = new URL(request.url)
    const search = new URLSearchParams(url.search);
    const filter = search.get("filter") || 'all';

    const {data: todos} = await axios.get(process.env.BACKEND_API + `/todo/listTodos?filter=${filter}`, getBearerConfig(user));
    return {todos, filter}
}

export default function TodoList() {
    const {todos} = useLoaderData()
    return (
        <Card title="Todo List">
            <AddTodo/>
            <div className="mb-[26px]"></div>
            {!todos?.length && <p className="text-center my-10 font-bold opacity-20">Such An Empty List!</p>}
            {todos?.map((todo: any) => <TodoItem key={'todo'+todo.todo_id} todo={todo}/>)}
            <TodoFilter/>
            <div className="mb-[35px]"></div>
        </Card>
    );
  }
  