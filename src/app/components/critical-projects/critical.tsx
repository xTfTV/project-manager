"use client";

import { useEffect, useState } from "react";

interface Project {
    project_id: number;
    project_name: string;
    project_due_date: string;
}

export default function CriticalProject() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function getCriticalProjects() {
            const response = await fetch("/api/project/critical");

            if (!response.ok) {
                console.error("Failed to fetch critical projects:");
                return;
            }

            const data = await response.json();

            setProjects(data);
        }
        getCriticalProjects();
    }, []);

    return (
        <div className="h-71 rounded-2xl bg-[#1f1f1f] p-4 text-center">
            <h2 className="mb-4 text-xl font-extrabold text-white">Critical Due Soon</h2>

            <div className="flex flex-col gap-2">
                {projects.map((project) => (
                    <div
                        key={project.project_id}
                        className="rounded-2xl bg-[#292929] p-3"
                    >
                        <p className="font-semibold text-white">
                            {project.project_name}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Due{" "}
                            {new Date (
                                project.project_due_date
                            ).toLocaleString("en-US",{
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
