import { ActionArgs, json } from "@remix-run/node";
import axios from "axios";
import { redirect } from "react-router";
import { requireUser } from "~/session.server";
import { getBearerConfig } from "~/_utils/auth";

export async function action({ request }: ActionArgs) {
    const userObject = await requireUser(request);
    const formData = await request.formData();
    const todo_id = formData.get('todo_id');
    try {
        await axios.post(process.env.BACKEND_API + '/todo/deleteTodo', {
            todo_id
        }, getBearerConfig(userObject))
    } catch(e) {
    }
    return redirect('/')
}