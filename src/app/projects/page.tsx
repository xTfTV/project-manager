import Header from "../components/header/header";

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

// ft - Adding the project list component
import ProjectList from "../components/project-list/project-list";

// ft - Adding priorities/statuses
import { getPriorities } from "@/lib/priority";
import { getProjectStatuses } from "@/lib/status";

export default async function Projects() {

    const priorities = await getPriorities();
    const statuses = await getProjectStatuses();

    // Adding the session auth for the page
    const session = await getSession();

    if (!session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen">
            <title>Projects</title>

            <Header />

            <main className="flex w-full justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl">
                    <h1 className="mb-6 text-2xl font-extrabold text-white">Projects</h1>
                    
                    <ProjectList
                        priorities={priorities}
                        statuses={statuses}
                    />
                </div>
            </main>
        </div>
    );
}