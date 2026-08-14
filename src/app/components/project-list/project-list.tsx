"use client";

import { useEffect, useState } from "react";
import ProjectCard from "../project-card/project-card";

interface Priority {
    priority_id: number;
    priority_name: string;
}

interface Status {
    project_status_id: number;
    project_status_name: string;
}

interface Project {
    project_id: number;
    project_name: string;
    priority_id: number;
    priority_name: string;
    project_status_id: number;
    project_status_name: string;
    project_created_date: string;
    project_due_date: string | null;
    comments: string | null;
    project_complete_date: string | null;
}

interface ProjectListProps {
    priorities: Priority[];
    statuses: Status[];
}

export default function ProjectList({
    priorities,
    statuses,
}: ProjectListProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function getProjects() {
            const response = await fetch (`/api/project-page/project-get?page=${currentPage}`);

            if (!response.ok) {
                console.error("Failed to fetch projects");
                return;
            }
            const data = await response.json();

            setProjects(data.projects);
            setTotalPages(data.totalPages)
        }
        getProjects();
    }, [currentPage]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.project_id}
                        projectId={project.project_id}
                        projectName={project.project_name}
                        priorityId={project.priority_id}
                        priorityName={project.priority_name}
                        statusId={project.project_status_id}
                        statusName={project.project_status_name}
                        createdDate={project.project_created_date}
                        dueDate={project.project_due_date}
                       comments={project.comments}
                        completeDate={project.project_complete_date}
                        priorities={priorities}
                        statuses={statuses}
                    />
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
                <button 
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="cursor-pointer rounded-xl bg-[#292929] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    ←
                </button>

                <p className="text-sm text-gray-400">
                    Page {currentPage} of {totalPages}
                </p>

                <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="cursor-pointer rounded-xl bg-[#292929] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    →
                </button>
            </div>

        </div>
    );
}
