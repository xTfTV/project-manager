"use client";

import { useRef, useState } from "react";

interface UserRole {
    user_role_id: number;
    role_name: string;
}

interface CreateAccountFormProps {
    roles: UserRole[];
}

export default function CreateAccountForm({
    roles,
}: CreateAccountFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function showErrorMessage(message: string) {
        setErrorMessage(message);
        setSuccessMessage("");

        setTimeout(() => {
            setErrorMessage("");
        }, 3500);
    }

    function showSuccess(message: string) {
        setSuccessMessage(message);
        setErrorMessage("");

        setTimeout(() => {
            setSuccessMessage("");
        }, 3500);
    }

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);

        const firstName = formData.get("firstName")?.toString().trim() || "";
        const lastName = formData.get("lastName")?.toString().trim() || "";
        const emailAddress = formData.get("emailAddress")?.toString().trim() || "";
        const password = formData.get("password")?.toString() || "";
        const userRoleId = Number(formData.get("userRoleId"));

        // Required field handling
        if (!firstName) {
            showErrorMessage("First name is required");
            setIsSubmitting(false);
            return;
        }

        if (!lastName) {
            showErrorMessage("Last name is required");
            setIsSubmitting(false);
            return;
        }

        if (!emailAddress) {
            showErrorMessage("Email is required");
            setIsSubmitting(false);
            return;
        }

        if (!password) {
            showErrorMessage("Password is required");
            setIsSubmitting(false);
            return;
        }

        if (!userRoleId) {
            showErrorMessage("User Role must be selected");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/api/account/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ firstName, lastName, emailAddress, password, userRoleId }),
            });

            const data = await response.json();

            if (!response.ok) {
                showErrorMessage(data.message || "Failed to create account");
                return;
            }

            showSuccess("Account created successfully");

            formRef.current?.reset();
        } catch (error) {
            console.error("Error Creating Account:", error);
            showErrorMessage("Failed to create account");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="rounded-2xl bg-[#1f1f1f] p-6">

            <form
                ref={formRef}
                action={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">First Name</label>

                    <input
                        type="text"
                        name="firstName"
                        className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Last Name</label>

                    <input
                        type="text"
                        name="lastName"
                        className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                    />
                </div>

                <div className="flex flex-col col-span-2 gap-2">
                    <label className="text-sm text-gray-400">Email Address</label>

                    <input
                        type="email"
                        name="emailAddress"
                        className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                    />
                </div>

                <div className="flex flex-col col-span-2 gap-2">
                    <label className="text-sm text-gray-400">Password</label>

                    <input
                        type="password"
                        name="password"
                        className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                    />
                </div>

                <div className="flex flex-col col-span-2 gap-2">
                    <label className="text-sm text-gray-400">Role</label>

                    <select
                        name="userRoleId"
                        defaultValue=""
                        className="h-11 rounded-2xl bg-[#292929] px-4 text-white outline-none"
                    >
                        <option value="">
                            Select One
                        </option>

                        {roles.map((role) => (
                            <option 
                                key={role.user_role_id}
                                value={role.user_role_id}
                            >
                                {role.role_name}
                            </option>
                        ))}
                    </select>
                </div>

                {errorMessage && (
                    <p className="col-span-2 text-sm text-red-400">
                        {errorMessage}
                    </p>
                )}

                {successMessage && (
                    <p className="col-span-2 text-sm text-green-400">
                        {successMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        col-span-2 h-11 cursor-pointer
                        rounded-2xl bg-[#ff2d3b]
                        font-semibold text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    { isSubmitting ? "Creating..." : "Create Account" }
                </button>
            </form>
        </div>
    );
}

