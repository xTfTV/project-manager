import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "@/app/components/header/header";
import { getUserRoles } from "@/lib/user-role";
import CreateAccountForm from "@/app/components/create-account-form/create-account-form";

export const dynamic = "force-dynamic";

export default async function CreateAccountPage() {
    const session = await getSession();
    const roles = await getUserRoles();

    if (!session) {
        redirect("/");
    }

    if (session.roleId !== 1) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen">
            <title>Create Account</title>

            <Header roleId={session.roleId} />

            <main className="flex w-full justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl">
                    <h1 className="mb-6 text-2xl font-extrabold text-white">Create Account</h1>

                    <CreateAccountForm roles={roles} />
                </div>
            </main>
        </div>
    );
}
