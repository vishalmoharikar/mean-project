export interface CreateTaskDto {
    title: string;
    fileUrl?: string;
}

export const validateCreateTask = (body: any): CreateTaskDto => {
    if (!body.title || body.title.length < 3) {
        throw new Error("Title must be at least 3 chars");
    }
    const { title, fileUrl } = body;

    return { title: title.trim(), fileUrl: fileUrl?.trim() };
};