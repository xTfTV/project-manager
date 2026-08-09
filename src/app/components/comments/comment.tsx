"use client";

import { useState } from "react";

export default function CommentsInput() {
    
    const [comments, setComments] = useState("");

    return (
        <div className="rounded-2xl bg-[#292929] p-4 flex flex-col gap-2 md:col-span-2">
            <label>Comments</label>
            <div className="relative">
                <textarea 
                    value={comments}
                    name="comments"
                    maxLength={500}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-24 w-full resize-none rounded-xl bg-[#1f1f1f] p-4 pb-8 outline-none placeholder:text-xs"
                    placeholder="500 Character Limit"
                />
                {comments.length > 0 && (
                    <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {500 - comments.length} characters remaining
                </span>
                )}

            </div>
        </div>
    );
}