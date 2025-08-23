export const alertType = {
    info: "info",
    danger: "danger",
    success: "success",
    warning: "warning",
    dark: "dark",
}

function getTextColor(type) {
    switch (type) {
        case alertType.info:
            return "blue";
        case alertType.danger:
            return "red";
        case alertType.success:
            return "green";
        case alertType.warning:
            return "yellow";
        case alertType.dark:
            return "gray";
        default:
            return "blue";
    }
}

export function Alert({
    type = alertType.info,
    heading = "",
    message = "",
    ...props
}) {

    const textColor = getTextColor(type);
    
    return (
        <div
            class={`flex items-center p-4 mb-4 text-sm text-${textColor}-800 rounded-lg bg-${textColor}-50 dark:bg-gray-800 dark:text-${textColor}-400`}
            role="alert"
            {...props}
        >
            <svg
                class="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">{heading}</span>
                {message}
            </div>
        </div>
    );
}
