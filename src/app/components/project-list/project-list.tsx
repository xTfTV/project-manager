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
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        async function getProjects() {

            const statusParam = statusFilter ? `&status=${encodeURIComponent(statusFilter)}` : "";

            const response = await fetch (`/api/project-page/project-get?page=${currentPage}${statusParam}`);

            if (!response.ok) {
                console.error("Failed to fetch projects");
                return;
            }
            const data = await response.json();

            setProjects(data.projects);
            setTotalPages(data.totalPages)

            if (data.totalPages > 0 && currentPage > data.totalPages) {
                setCurrentPage(data.totalPages);
            }
        }
        getProjects();
    }, [currentPage, statusFilter]);

    function changeStatusFilter(status: string) {
        setStatusFilter(status);
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col gap-6">

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => changeStatusFilter("")}
                    className={`
                        cursor-pointer rounded-xl px-4 py-2
                        ${
                            statusFilter === "" ? "bg-[#ff2d3b] text-white" : "bg-[#292929] text-gray-300"
                        }    
                    `}
                >
                    All
                </button>

                <button
                    type="button"
                    onClick={() => changeStatusFilter("Submitted")}
                    className={`
                        cursor-pointer rounded-xl px-4 py-2
                        ${
                            statusFilter === "Submitted" ? "bg-[#ff2d3b] text-white" : "bg-[#292929] text-gray-300"
                        }
                    `}
                >
                    Submitted
                </button>

                <button
                    type="button"
                    onClick={() => changeStatusFilter("In Progress")}
                    className={`
                        cursor-pointer rounded-xl px-4 py-2
                        ${
                            statusFilter === "In Progress" ? "bg-[#ff2b3b] text-white" : "bg-[#292929] text-gray-300"
                        }
                    `}
                >
                    In Progress
                </button>

                <button
                    type="button"
                    onClick={() => changeStatusFilter("Completed")}
                    className={`
                        cursor-pointer rounded-xl px-4 py-2
                        ${
                            statusFilter === "Completed" ? "bg-[#ff2b3b] text-white" : "bg-[#292929] text-gray-300"
                        }    
                    `}
                >
                    Completed
                </button>
            </div>

            <div className="mb-2 grid grid-cols-7 px-5 text-sm font-semibold text-gray-400">
                <span>Project</span>
                <span>Priority</span>
                <span>Status</span>
                <span>Created</span>
                <span>Due</span>
                <span>Comments</span>
                <span>Completed</span>
            </div>

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

            {projects.length === 0 && (
                <p className="py-8 text-center text-gray-400">No Projects Found</p>
            )}

            {totalPages > 0 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button 
                        type="button"
                        disabled={currentPage <= 1}
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
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((page) => page + 1)}
                        className="cursor-pointer rounded-xl bg-[#292929] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        →
                    </button>
                </div>
            )}

        </div>
    );
}
