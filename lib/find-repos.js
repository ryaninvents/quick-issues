'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var urlUtils = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
    var _ref = _asyncToGenerator(function* () {
        const repositories = atom.project.getRepositories().filter(Boolean);
        const repo = repositories[0];
        if (!repo || !repo.getOriginURL()) return null;
        const remote = urlUtils.parse(repo.getOriginURL());
        if (remote.host !== 'github.com') return null;
        const [user, repoName] = remote.path.split('/').filter(Boolean).slice(0, 2);
        return { user, name: repoName.replace(/\.git$/, '') };
    });

    function findReposInWorkspace() {
        return _ref.apply(this, arguments);
    }

    return findReposInWorkspace;
})();