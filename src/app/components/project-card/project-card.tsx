interface ProjectCardProps {
    projectId: number;
    projectName: string;
    priorityName: string;
    statusName: string;
    createdDate: string;
    dueDate: string | null;
    comments: string | null;
    completeDate: string | null;
}

export default function ProjectCard({
    projectId,
    projectName,
    priorityName,
    statusName,
    createdDate,
    dueDate,
    comments,
    completeDate
}: ProjectCardProps) {
    const commentsPreview = 
        comments && comments.length > 50 ? `${comments.substring(0,50)}...` : comments || "-";
    
    return (
        <div 
            data-project-id={projectId}
            className="
                grid grid-cols-7 items-center
                rounded-2xl bg-[#292929]
                px-5 py-4
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
    );
} 
