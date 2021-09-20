const mockLogError = jest.fn();
const mockLogSuccess = jest.fn();


jest.mock('react-toastify', () => {
    const toast = {
        toast: {
            error: mockLogError,
            success: mockLogSuccess,
        },
    };

    return toast;
});

export {
    mockLogError,
    mockLogSuccess,
};
