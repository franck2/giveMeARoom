// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import './tests/config/mockLog.ts';
import './tests/config/mockItranslate';

jest.setTimeout(20000);

const mockDefaultDate = '2020-10-23 10:20';

export { mockDefaultDate };
