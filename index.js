'use strict';

var heartbeat = function (options) {
    var path, status, body, type, headers, match;
    if (options != null) {
        path    = options.path;
        status  = options.status;
        body    = options.body;
        type    = options.type;
        headers = options.headers;
    }
    if (path == null) {
        path = '/heartbeat';
    }
    if (status == null) {
        status = 200;
    }
    if (body == null) {
        body = '';
    }

    if (Object.prototype.toString.call(path) === '[object RegExp]') {
        match = function (value) {
            return path.test(value);
        };
    }
    else {
        match = function (value) {
            return path === value;
        };
    }

    return async function heartbeat (context, next) {
        if (match(context.path)) {
            context.status = status;
            context.body   = (typeof body === 'function') ? body.call(context) : body;
            if (type != null) {
                context.type = type;
            }
            if (headers != null) {
                context.set(headers);
            }
        }
        else {
            await next();
        }
    };
};

module.exports = heartbeat;
