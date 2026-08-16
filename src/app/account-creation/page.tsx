import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "@/app/components/header/header";
import { getUserRoles } from "@/lib/user-role";
import CreateAccountForm from "@/app/components/create-account-form/create-account-form";

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

                    {/* <div className="rounded-2xl bg-[#1f1f1f] p-6">

                        <form className="grid grid-cols-2 gap-4">

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-400">First Name</label>

                                <input 
                                    type="text"
                                    name="firstName"
                                    className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-400">Last Name</label>

                                <input
                                    type="text"
                                    name="lastName"
                                    className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col col-span-2 gap-2">
                                <label className="text-sm text-gray-400">Email Address</label>

                                <input
                                    type="text"
                                    name="emailAddress"
                                    className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col col-span-2 gap-2">
                                <label className="text-sm text-gray-400">Password</label>

                                <input
                                    type="password"
                                    name="password"
                                    className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                                />
                            </div>

                            <div className="flex flex-col col-span-2 gap-2">
                                <label className="text-sm text-gray-400">Role</label>

                                <select
                                    name="userRoleId"
                                    className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                                >
                                    <option value="">Select Role</option>

                                    {roles.map((role) => (
                                        <option
                                            key={role.user_role_id}
                                            value={role.user_role_id}
                                        >
                                            {role.role_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button 
                                type="submit"
                                className="col-span-2 h-11 cursor-pointer rounded-2xl bg-[#ff2d3b] font-semibold text-white"
                            >
                                Create Account
                            </button>
                        </form>
                    </div> */}
                </div>
            </main>
        </div>
    );
}
