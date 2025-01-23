type FormDataObject<T extends Record<string, string>> = {
    [K in keyof T]: string;
};

export const helper = {
    generateRandomId: () => Math.floor(100000 + Math.random() * 900000),
    createTemplate: () => document.createElement('template'),
    convertFormToObject: <T extends Record<string, string>>(
        form: HTMLFormElement
    ): T => {
        const result: Partial<FormDataObject<T>> = {};
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            result[key as keyof T] = value as string;
        });
        return result as T;
    },
    converTime: (datetime: string) =>
        new Date(datetime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
};
