
const mockTranslate = jest.fn();


jest.mock('react-i18next', () => {
    mockTranslate.mockImplementation((value: string) => value);
    const translate = {
        ...jest.requireActual('react-i18next'),
        useTranslation: () => ({
            t: mockTranslate,
            i18n: {
                changeLanguage: jest.fn(),
            },
        }),
    };

    return translate;
});

export { mockTranslate };
