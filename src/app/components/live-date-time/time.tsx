"use client";

import { useEffect, useState } from "react";

export default function LiveDateTime() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="text-center">
            <p className="text-sm font-bold">{date}</p>
            <p className="text-sm font-bold">{time}</p>
        </div>
    );
}

