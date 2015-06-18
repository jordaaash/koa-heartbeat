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

    return function* heartbeat (next) {
        if (match(this.path)) {
            this.status = status;
            this.body   = body;
            if (type != null) {
                this.type = type;
            }
            if (headers != null) {
                this.set(headers);
            }
        }
        else {
            yield next;
        }
    };
};

module.exports = heartbeat;
