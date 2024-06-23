import { LoaderFunctionArgs, redirect } from "@remix-run/server-runtime";

export async function loader({ request }: LoaderFunctionArgs) { 
    return redirect("/");
}