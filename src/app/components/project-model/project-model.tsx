"use client";

interface ProjectModelProps {
    projectName: string;
    priorityName: string;
    statusName: string;
    createdDate: string;
    dueDate: string | null;
    comments: string | null;
    completeDate: string | null;
    onClose: () => void;
}

export default function ProjectModel({
    projectName,
    priorityName,
    statusName,
    createdDate,
    dueDate,
    comments,
    completeDate,
    onClose
} : ProjectModelProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-2xl rounded-2xl bg-[#1f1f1f] p-6">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                        {projectName}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-xl text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Priority</p>

                        <p className="text-white">{priorityName}</p>
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Status</p>

                        <p className="text-white">{statusName}</p>
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Created</p>

                        <p className="text-white">
                            {new Date(createdDate).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Due Date</p>

                        <p className="text-white">
                            {dueDate ? new Date(dueDate).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                            }) : "-"},
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Comments</p>

                        <p className="text-white">{comments || "-"}</p>
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Complete Date</p>

                        <p className="text-white">
                            {completeDate ? new Date(completeDate).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                            }) : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
