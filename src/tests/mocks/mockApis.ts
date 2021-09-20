
const EnvironementConfiguration = require('../../api/client/config.json');

// eslint-disable-next-line no-process-env
const { api } = EnvironementConfiguration[`${process.env.REACT_APP_ENV}`];

// eslint-disable-next-line import/order
const nock = require('nock');

export const CROSS_ORIGIN_HEADERS = {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
};

export const AUTHORISATION_HEADER = {
    'access-control-allow-headers': 'Authorization',
};

export const getNockForGetInSuccess = (apiUrl: string, response?: any) => {
    nock.disableNetConnect();

    return nock(api.endPoint).defaultReplyHeaders({
        ...CROSS_ORIGIN_HEADERS,
    })
        .persist()
        .intercept(apiUrl, 'OPTIONS')
        .reply(200, {
        }, {
            ...AUTHORISATION_HEADER,
        })
        .intercept(apiUrl, 'GET')
        .reply(200,
            response);
};


export const getNockForGetInError = (apiUrl: string) => {
    nock.disableNetConnect();

    return nock(api.endPoint).defaultReplyHeaders({
        ...CROSS_ORIGIN_HEADERS,
    })
        .persist()
        .intercept(apiUrl, 'OPTIONS')
        .reply(200, {
        }, {
            ...AUTHORISATION_HEADER,
        })
        .intercept(apiUrl, 'GET')
        .reply(500);
};

export const getNockForPostInSuccess = (apiUrl: string, response?: any) => {
    nock.disableNetConnect();

    return nock(api.endPoint).defaultReplyHeaders({
        ...CROSS_ORIGIN_HEADERS,
    })
        .persist()
        .intercept(apiUrl, 'OPTIONS')
        .reply(200, {
        }, {
            ...AUTHORISATION_HEADER,
        })
        .intercept(apiUrl, 'POST')
        .reply(200,
            response);
};

export const getNockForPostInError = (apiUrl: string) => {
    nock.disableNetConnect();

    return nock(api.endPoint).defaultReplyHeaders({
        ...CROSS_ORIGIN_HEADERS,
    })
        .persist()
        .intercept(apiUrl, 'OPTIONS')
        .reply(200, {
        }, {
            ...AUTHORISATION_HEADER,
        })
        .intercept(apiUrl, 'POST')
        .reply(500);
};

export const getNockForDeleteInSuccess = (apiUrl: string, response?: any) => {
    nock.disableNetConnect();

    return nock(api.endPoint).defaultReplyHeaders({
        ...CROSS_ORIGIN_HEADERS,
    })
        .persist()
        .intercept(apiUrl, 'OPTIONS')
        .reply(200, {
        }, {
            ...AUTHORISATION_HEADER,
        })
        .intercept(apiUrl, 'DELETE')
        .reply(200,
            response);
};


export const getNockForDeleteInError = (apiUrl: string) => {
    nock.disableNetConnect();

    return nock(api.endPoint).defaultReplyHeaders({
        ...CROSS_ORIGIN_HEADERS,
    })
        .persist()
        .intercept(apiUrl, 'OPTIONS')
        .reply(200, {
        }, {
            ...AUTHORISATION_HEADER,
        })
        .intercept(apiUrl, 'DELETE')
        .reply(500);
};
