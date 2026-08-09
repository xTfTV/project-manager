"use client";

import { useState } from "react";

// interface Priority {
//     priority_id: number;
//     priority_name: string;
// }

interface AddProjectProps {
    children: React.ReactNode;
}

export default function AddProject({ children }: AddProjectProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function showError(message: string) {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage("");
        }, 3500);
    }

    async function handleSubmit(
        event: React.SyntheticEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const projectName = 
            formData.get("projectName")?.toString().trim() || "";

        const priorityId = 
            formData.get("priorityId")?.toString() || "";

        const projectDueDate = 
            formData.get("projectDueDate")?.toString() || "";

        const projectDueTime = 
            formData.get("projectDueTime")?.toString() || "";

        const comments =
            formData.get("comments")?.toString() || "";

        // Check the required fields
        if (!projectName) {
            showError("Project name is required");
            setIsSubmitting(false);
            return;
        }

        if (!priorityId) {
            showError("Priority is required");
            setIsSubmitting(false);
            return;
        }

        // If date or time becomes entered, require the date
        // Not one or the other
        if ((projectDueDate && !projectDueTime) || (projectDueTime && !projectDueDate)) {
            showError("Please enter both the due date and due time");
            
            setIsSubmitting(false);
            return;
        }
        const dueDateTime = 
            projectDueDate && projectDueTime ? `${projectDueDate} ${projectDueTime}:00` : null;

        try {
            const response = await fetch("/api/project/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    projectName,
                    priorityId: Number(priorityId),
                    projectDueDate: dueDateTime,
                    comments: comments || null
                })
            });
            const data = await response.json();

            if (!response.ok) {
                showError(data.message || "Failed to create project.");
                return;
            }
            // Reload so all dashboard cards
            // query the new project
            window.location.reload();
        } catch (error) {
            console.error("Error submitting project:", error);
            showError("Failed to create project.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
            {children}

            {errorMessage && (
                <p className="text-sm text-red-400 md:col-span-2">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="
                    relative h-11 overflow-hidden rounded-2xl
                    font-semibold text-white md:col-span-2
                    before:absolute before:inset-0 before:origin-left
                    before:scale-x-0 before:rounded-xl before:bg-[#ff2d3b]
                    before:transition-transform before:duration-300
                    hover:before:scale-x-100
                    cursor-pointer
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                <span className="relative z-10">
                    {isSubmitting ? "Submitting..." : "Submit Project"}
                </span>
            </button>
        </form>
    );
}
