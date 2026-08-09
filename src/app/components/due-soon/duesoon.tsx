"use client";

import { useEffect, useState } from "react";

interface DueSoonData {
    due_today: number;
    due_this_week: number;
    due_this_month: number;
    due_this_year: number;
}

export default function DueSoon() {
    const [dueSoon, setDueSoon] = useState<DueSoonData | null>(null);

    useEffect(() => {
        async function getDueSoonProjects() {
            const response = await fetch("/api/project/due-soon");

            if (!response.ok) {
                console.error("Failed to fetch due soon projects");
                return;
            }
            const data = await response.json();

            setDueSoon(data);
        }
        getDueSoonProjects();
    }, []);

    return (
        <div className="h-fit rounded-3xl bg-[#1f1f1f] p-4">
            <h2 className="mb-6 text-xl font-extrabold text-white text-center">Due Soon</h2>

            {dueSoon && (
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="text-sm text-grap-400">
                            Due Today:
                        </p>
                        
                        <p className="text-md font-bold text-white">
                            {dueSoon.due_today}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-grap-400">
                            Due This Week:
                        </p>
                        
                        <p className="text-md font-bold text-white">
                            {dueSoon.due_this_week}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-grap-400">
                            Due This Month:
                        </p>
                        
                        <p className="text-md font-bold text-white">
                            {dueSoon.due_this_month}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-grap-400">
                            Due This Year:
                        </p>
                        
                        <p className="text-md font-bold text-white">
                            {dueSoon.due_this_year}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}
