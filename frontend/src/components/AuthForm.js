import { useState } from "react";

const AuthForm = ({ formTitle, fields, onSubmit, submitButtonText }) => {
    const [error, setError] = useState("");

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {formTitle}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label
                                htmlFor={field.name}
                                className="block mb-1 text-gray-700 font-medium"
                            >
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {/* エラーメッセージ表示 */}
                            {error && (
                                <p className="text-red-500 text-center font-bold">{error}</p>
                            )}

                        </div>
                    ))}
                    <button
                        type="submit"
                        className="block w-full mt-4 py-2 rounded bg-secondary text-white font-semibold hover:opacity-90 focus:opacity-90 transition-opacity"
                    >
                        {submitButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;