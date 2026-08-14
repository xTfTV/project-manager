"use client";

import { useState } from "react";

interface Priority {
    priority_id: number;
    priority_name: string;
}

interface Status {
    project_status_id: number;
    project_status_name: string;
}

interface ProjectModelProps {
    projectId: number;
    projectName: string;
    priorityId: number;
    priorityName: string;
    statusId: number,
    statusName: string;
    createdDate: string;
    dueDate: string | null;
    comments: string | null;
    completeDate: string | null;
    onClose: () => void;
    priorities: Priority[];
    statuses: Status[];
}

export default function ProjectModel({
    projectId,
    projectName,
    priorityId,
    statusId,
    createdDate,
    dueDate,
    comments,
    completeDate,
    priorities,
    statuses,
    onClose,
} : ProjectModelProps) {

    const [editedProjectName, setEditedProjectName] = useState(projectName);
    const [editedPriorityId, setEditedPriorityId] = useState(priorityId);
    const [editedStatusId, setEditedStatusId] = useState(statusId);
    const [editedComment, setEditedComment] = useState(comments || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Due Date + Time logic
    const initialDueDate = dueDate ? new Date(dueDate).toISOString().slice(0,10) : "";

    const initialDueTime = dueDate ? new Date(dueDate).toTimeString().slice(0,5) : "";

    const [editedDueDate, setEditedDueDate] = useState(initialDueDate);
    const [editedDueTime, setEditedDueTime] = useState(initialDueTime);

    function showError(message: string) {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage("");
        }, 3500);
    }

    async function handleSave() {
        setIsSubmitting(true);

        // Required fields check
        if (!editedProjectName.trim()) {
            showError("Project name must be filled in");
            setIsSubmitting(false);
            return;
        }

        if (!editedPriorityId) {
            showError("Priority is required");
            setIsSubmitting(false);
            return;
        }

        if (!editedStatusId) {
            showError("Status is required");
            setIsSubmitting(false);
            return;
        }

        // If one part of the due date entered
        // The other must be filled in too
        if ((editedDueDate && !editedDueTime) || (editedDueTime && !editedDueDate)) {
            showError("Please enter both the due date or time, it cannot be one or the other");
            setIsSubmitting(false);
            return;
        }

        const dueDateTime = editedDueDate && editedDueTime ? `${editedDueDate} ${editedDueTime}:00` : null;

        try {
            const response = await fetch(`/api/project-page/${projectId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectName: editedProjectName.trim(),
                    priorityId: editedPriorityId,
                    projectStatusId: editedStatusId,
                    projectDueDate: dueDateTime,
                    comments: editedComment.trim() || null,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                showError(data.message || "Failed to update project");
                return;
            }
            window.location.reload();
        } catch (error) {
            console.error("Error updating object:", error);
            showError("Failed to update project");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-2xl rounded-2xl bg-[#1f1f1f] p-6">

                <div className="mb-6 flex items-center justify-between">
                    <input
                        type="text"
                        value={editedProjectName}
                        onChange={(event) =>
                            setEditedProjectName(event.target.value)
                        }
                        className="bg-transparent text-2xl font-bold text-white outline-none"
                    />

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

                        <select
                            value={editedPriorityId}
                            onChange={(event) => setEditedPriorityId(Number(event.target.value))}
                            className="mt-2 h-11 w-full rounded-2xl bg-[#1f1f1f] px-4 text-white outline-none"
                        >
                            {priorities.map((priority) => (
                                <option
                                    key={priority.priority_id}
                                    value={priority.priority_id}
                                >
                                    {priority.priority_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Status</p>

                        <select 
                            value={editedStatusId}
                            onChange={(event) => setEditedStatusId(Number(event.target.value))}
                            className="mt-2 h-11 w-full rounded-2xl bg-[#1f1f1f] px-4 text-white outline-none"
                        >
                            {statuses.map((status) => (
                                <option
                                    key={status.project_status_id}
                                    value={status.project_status_id}
                                >
                                    {status.project_status_name}
                                </option>
                            ))}
                        </select>
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

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Due Date</p>

                        <input
                            type="date"
                            value={editedDueDate}
                            onChange={(event) => setEditedDueDate(event.target.value)}
                            className="mt-2 h-11 w-full ronded-2xl bg-[#1f1f1f] px-4 text-white outline-none"
                        />
                    </div>

                    <div className="rounded-2xl bg-[#292929] p-4">
                        <label className="text-sm text-gray-400">
                            Due Time
                        </label>

                        <input
                            type="time"
                            value={editedDueTime}
                            onChange={(event) => setEditedDueTime(event.target.value)}
                            className="mt-2 h-11 w-full rounded-2xl bg-[#1f1f1f] px-4 text-white outline-none"
                        />
                    </div>

                    <div className="col-span-2 rounded-2xl bg-[#292929] p-4">
                        <p className="text-sm text-gray-400">Comments</p>

                        <textarea 
                            value={editedComment}
                            maxLength={500}
                            onChange={(event) => setEditedComment(event.target.value)}
                            className="mt-2 h-11 w-full rounded-2xl bg-[#1f1f1f] px-4 text-white outline-none"
                        />
                    </div>

                    {errorMessage && (
                        <p className="col-span-2 text-sm text-red-400">{errorMessage}</p>
                    )}

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="col-span-2 h-11 cursor-pointer rounded-2xl bg-[#ff2d3b] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>

                </div>
            </div>
        </div>
    );
}
