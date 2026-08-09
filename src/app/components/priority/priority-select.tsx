interface Priority {
    priority_id: number;
    priority_name: string;
}

interface PrioritySelectProps {
    priorities: Priority[];
}

export default function PrioritySelect({
    priorities,
}: PrioritySelectProps) {
    return (
        <select
            name="priorityId"
            defaultValue=""
            className="
                h-11 w-full cursor-pointer
                rounded-xl bg-[#1f1f1f]
                px-4 outline-none
            "
        >

        <option value="" disabled>
            Select Priority
        </option>

        {priorities.map((priority) => (
            <option
                key={priority.priority_id}
                value={priority.priority_id}
            >
                {priority.priority_name}
            </option>
        ))}
        </select>
    );
}
