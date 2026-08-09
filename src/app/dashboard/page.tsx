import Header from "../components/header/header";

// ft auth-for-login
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

// ft - getting the username
import pool from '@/lib/db'

// ft - live date/time
import LiveDateTime from "../components/live-date-time/time";

// ft - comment character counter
import CommentsInput from "../components/comments/comment";

// ft - adding the priority functionality to grab the db values
import { getPriorities } from "@/lib/priority";
import PrioritySelect from "../components/priority/priority-select";

// ft - adding the critical project tag
import CriticalProject from "../components/critical-projects/critical";

// ft - adding the count of projects due 
import DueSoon from "../components/due-soon/duesoon";


export default async function Dashboard() {

    // Getting the user session
    const session = await getSession();

    if (!session) {
        redirect("/");
    }

    const priorities = await getPriorities();

    // Grabbing the user's first name from their account
    const [rows] = await pool.query(
        `
            SELECT first_name
            FROM user_info
            WHERE user_id = ?
                AND logical_cancel_value = 0
        `,
        [session.userId]
    );

    const users = rows as {
        first_name: string;
    }[];

    const user = users[0];

    return (
        <div className="min-h-screen">
            <title>Dashboard</title>

            <Header />

            <main className="flex w-full justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-6">
          
                <div className="min-h-42 rounded-3xl bg-[#1f1f1f] p-6 md:col-span-2 flex flex-col items-center justify-center gap-2">
                    <h1 className="text-xl font-extrabold">Welcome back {user.first_name}!</h1>
                    <h1 className="text-xl font-extrabold">It is currently:</h1>
                    <LiveDateTime />
                </div>

                <div className="min-h-42 rounded-3xl bg-[#1f1f1f] p-6 md:col-span-4">
                    Projects Due
                </div>

                <div className="min-h-52 md:col-span-2">
                    <CriticalProject />
                </div>


                <div className="min-h-64 self-start rounded-3xl bg-[#1f1f1f] p-6 md:col-span-4 md:row-span-2 flex flex-col items-center gap-2">
                    <h1 className="text-xl font-extrabold">Add your project!</h1>
                    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <div className="rounded-2xl bg-[#292929] p-4 flex flex-col gap-2">
                            <label>Project Name</label>
                            <input 
                                type="text" 
                                className="h-11 rounded-xl bg-[#1f1f1f] px-4 outline-none"
                            />
                        </div>

                        <div className="rounded-2xl bg-[#292929] p-4 flex flex-col gap-2">
                            <label>Priority</label>

                            <PrioritySelect priorities={priorities} />
                        </div>

                        <div className="rounded-2xl bg-[#292929] p-4 flex flex-col gap-2">
                            <label>Project Due Date</label>
                            {/* This is just for now */}
                            <input 
                                type="date"
                                className="h-11 rounded-xl bg-[#1f1f1f] px-4 outline-none"
                            />
                        </div>

                        <div className="rounded-2xl bg-[#292929] p-4 flex flex-col gap-2">
                            <label>Project Due Time</label>
                            {/* This is just for now */}
                            <input 
                                type="time"
                                className="h-11 rounded-xl bg-[#1f1f1f] px-4 outline-none"
                            />
                        </div>

                        <CommentsInput />

                        <button
                            type="submit"
                            className="
                                relative h-11 overflow-hidden rounded-xl
                                font-semibold text-white md:col-span-2
                                before:absolute before:inset-0 before:origin-left 
                                before:scale-x-0 before:rounded-xl before:bg-[#ff2d3b]
                                before:transition-transform before:duration-300
                                hover:before:scale-x-100 cursor-pointer
                            "
                        >
                            <span className="relative z-10">
                                Submit Project
                            </span>
                        </button>
                    </form>
                </div>

                {/* <div className="min-h-52 rounded-3xl bg-[#1f1f1f] p-6 md:col-span-2">
                    Due Soon
                </div> */}

                {/* Testing this component */}
                <div className="min-h-52 md:col-span-2">
                    <DueSoon />
                </div>

            </div>
        </main>
    </div>
    );
}