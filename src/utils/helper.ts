export const helper = {
    generateRandomId: () => Math.floor(100000 + Math.random() * 900000),
    createTemplate: () =>
        document.createElement('template') as HTMLTemplateElement,
};
