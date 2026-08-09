// This is for the Due Soon card (confusing because of similar names)

"use client";

import { useEffect, useState } from "react";

interface Project {
    project_id: number;
    project_name: string;
    project_due_date: string;
    priority_name: string;
}

export default function ProjectsDue() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function getProjectsDue() {
            const response = await fetch("/api/project/due");

            if(!response.ok) {
                console.error("Failed to fetch projects due");
                return;
            }
            const data = await response.json();
            setProjects(data);
        }
        getProjectsDue();
    }, []);

    return (
        <div className="h-full rounded-2xl bg-[#1f1f1f] p-4">
            <h2 className="mb-4 text-xl text-center font-extrabold text-white">Projects Due</h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.project_id} 
                        className="rounded-2xl bg-[#292929] p-4"
                    >
                        <p className="font-semibold text-white">
                            {project.project_name}
                        </p>

                        <p className="mt-2 text-sm text-gray-400">
                            Due{" "}
                            {new Date(
                                project.project_due_date
                            ).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                            })}
                        </p>

                        <p className="mt-2 text-sm text-gray-300">
                            Prioirity: {project.priority_name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
