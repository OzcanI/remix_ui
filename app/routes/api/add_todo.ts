import { ActionArgs, json } from "@remix-run/node";
import axios from "axios";
import { redirect } from "react-router";
import { requireUser } from "~/session.server";
import { getBearerConfig } from "~/_utils/auth";

export async function action({ request }: ActionArgs) {
    const userObject = await requireUser(request);
    const formData = await request.formData();
    const todo_content = formData.get("todo_content");
    try {
        await axios.post(process.env.BACKEND_API + '/todo/createTodo', {
            content: todo_content,
        }, getBearerConfig(userObject))
    } catch(e) {
        return json(
            { errors: { error: (e as any)?.message, errorObject: (e as any).response?.data} },
            { status: 400 }
        );
    }
    return redirect('/')
}