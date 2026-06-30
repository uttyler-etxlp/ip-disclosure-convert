export function clean(value) {
    if (!value) return "";

    const text = value.trim();

    if (
        text === "N/A" ||
        text === "Descriptive Title of Invention:"
    ) {
        return "";
    }

    return text;
}
