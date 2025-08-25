import { forwardRef, useId } from "react";

function Select(
    {
        options = [{ text: "Select", value: "select", selected: true }],
        label = null,
        className = "",
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div class="max-w-sm mx-auto">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                ref={ref}
            >
                {options.map(({ text, value, selected, ...attr }) => (
                    <option
                        key={value}
                        selected={selected}
                        value={value}
                        {...attr}
                    >
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(Select);
