export function joinClasses(
    ...classes: Array<string | undefined>
): string | undefined {
    const result = classes.filter(Boolean).join(" ");
    return result || undefined;
}
