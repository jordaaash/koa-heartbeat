'use strict';

var heartbeat = function (options) {
    var path, body, type;
    if (options == null) {
        options = {};
    }
    path = options.path;
    body = options.body;
    type = options.type;
    if (path == null) {
        path = '/heartbeat';
    }
    if (body === void 0) {
        body = '';
    }

    return function* heartbeat (next) {
        if (this.path === path) {
            this.status = 200;
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
