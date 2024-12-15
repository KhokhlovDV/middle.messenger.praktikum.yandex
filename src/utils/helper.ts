export const helper = {
    generateRandomId: () => Math.floor(100000 + Math.random() * 900000),
    createTemplate: () => document.createElement('template'),
    consoleFormData: (data: FormData) => {
        const result: Record<string, unknown> = {};
        for (const key of data.keys()) {
            result[key] = data.get(key);
        }
        console.log(result);
    },
};
