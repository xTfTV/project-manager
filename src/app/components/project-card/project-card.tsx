"use client";

import { useState } from "react";
import ProjectModel from "../project-model/project-model";

interface Priority {
    priority_id: number;
    priority_name: string;
}

interface Status {
    project_status_id: number;
    project_status_name: string;
}

interface ProjectCardProps {
    projectId: number;
    projectName: string;
    priorityId: number;
    priorityName: string;
    statusId: number;
    statusName: string;
    createdDate: string;
    dueDate: string | null;
    comments: string | null;
    completeDate: string | null;
    priorities: Priority[];
    statuses: Status[];
}

export default function ProjectCard({
    projectId,
    projectName,
    priorityId,
    priorityName,
    statusId,
    statusName,
    createdDate,
    dueDate,
    comments,
    completeDate,
    priorities,
    statuses,
}: ProjectCardProps) {

    const [isOpen, setIsOpen] = useState(false);

    const commentsPreview = 
        comments && comments.length > 50 ? `${comments.substring(0,50)}...` : comments || "-";
    
    return (
    <>
        <div 
            data-project-id={projectId}
            onClick={() => setIsOpen(true)}
            className="
                grid grid-cols-7 items-center
                rounded-2xl bg-[#292929]
                px-5 py-4 cursor-pointer
            "
        >
            <p className="font-semibold text-white">{projectName}</p>

            <p className="text-gray-300">{priorityName}</p>

            <p className="text-gray-300">{statusName}</p>

            <p className="text-sm text-gray-400">
                {new Date(createdDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>

            <p className="text-sm text-gray-400">
                {dueDate ? new Date(dueDate).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                }) : "-" }
            </p>

            <p className="truncate text-sm text-gray-400">{commentsPreview}</p>

            <p className="text-sm text-gray-400">
                {completeDate ? new Date(completeDate).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                }) : "-" }
            </p>
        </div>

        {isOpen && (
            <ProjectModel
                projectId={projectId}
                projectName={projectName}
                priorityId={priorityId}
                priorityName={priorityName}
                statusId={statusId}
                statusName={statusName}
                createdDate={createdDate}
                dueDate={dueDate}
                comments={comments}
                completeDate={completeDate}
                priorities={priorities}
                statuses={statuses}
                onClose={() => setIsOpen(false)}
            />
        )}
    </>
    );
} 
