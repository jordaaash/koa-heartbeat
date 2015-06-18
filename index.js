'use strict';

var heartbeat = function (options) {
    var path, status, body, type;
    if (options == null) {
        options = {};
    }
    path   = options.path;
    status = options.status;
    body   = options.body;
    type   = options.type;
    if (path == null) {
        path = '/heartbeat';
    }
    if (status === void 0) {
        status = 200;
    }
    if (body === void 0) {
        body = '';
    }

    return function* heartbeat (next) {
        if (this.path === path) {
            this.status = status;
            this.body   = body;
            if (type != null) {
                this.type = type;
            }
        }
        else {
            yield next;
        }
    };
};

module.exports = heartbeat;
