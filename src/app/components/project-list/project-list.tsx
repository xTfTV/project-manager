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

    useEffect(() => {
        async function getProjects() {
            const response = await fetch ("/api/project-page/project-get");

            if (!response.ok) {
                console.error("Failed to fetch projects");
                return;
            }
            const data = await response.json();

            setProjects(data);
        }
        getProjects();
    }, []);

    return (
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
    );
}
