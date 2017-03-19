'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const pkg = require('../package.json');

let currentToken = null;

function callGithub(apiMethod, { httpMethod = 'GET', query = {} } = {}) {
    const parsed = (0, _url.parse)(`https://api.github.com${apiMethod}`, true);
    delete parsed.search;
    const passedQuery = Object.assign({}, query);
    if (currentToken) {
        passedQuery.access_token = currentToken;
    }
    const uri = (0, _url.format)(Object.assign(parsed, {
        query: passedQuery
    }));

    return (0, _requestPromise2.default)({
        uri,
        method: httpMethod,
        json: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': `${pkg.name} (Atom plugin)`
        }
    });
}

function issueComparator(a, b) {
    if (a.state !== b.state) {
        return a.state === 'open' ? -1 : 1;
    }
    return Number(a.number) - Number(b.number);
}

exports.default = {
    authenticate() {
        return _asyncToGenerator(function* () {
            currentToken = atom.config.get(`${pkg.name}.userToken`);
        })();
    },
    listWatchedRepos() {
        var _this = this;

        return _asyncToGenerator(function* () {
            yield _this.authenticate();
            return yield callGithub('/user/subscriptions');
        })();
    },
    issuesForRepo(user, repo, query = {}) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            yield _this2.authenticate();
            const issues = yield callGithub(`/repos/${user}/${repo}/issues`, { query });
            issues.sort(issueComparator);
            return issues;
        })();
    }
};