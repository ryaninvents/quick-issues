/** @babel */
import request from 'request-promise';
import {format as urlFormat, parse as urlParse} from 'url';

const pkg = require('../package.json');

let currentToken = null;

function callGithub(apiMethod, {httpMethod = 'GET', query = {}} = {}) {
    const parsed = urlParse(`https://api.github.com${apiMethod}`, true);
    delete parsed.search;
    const passedQuery = Object.assign({}, query);
    if (currentToken) {
        passedQuery.access_token = currentToken;
    }
    const uri = urlFormat(Object.assign(parsed, {
        query: passedQuery,
    }));

    return request({
        uri,
        method: httpMethod,
        json: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': `${pkg.name} (Atom plugin)`,
        },
    });
}

function issueComparator(a, b) {
    if (a.state !== b.state) {
        return a.state === 'open' ? -1 : 1;
    }
    return Number(a.number) - Number(b.number);
}

export default {
    async authenticate() {
        currentToken = atom.config.get(`${pkg.name}.userToken`);
    },
    async listWatchedRepos() {
        await this.authenticate();
        return await callGithub('/user/subscriptions');
    },
    async issuesForRepo(user, repo, query = {}) {
        await this.authenticate();
        const issues = await(callGithub(`/repos/${user}/${repo}/issues`, {query}));
        issues.sort(issueComparator);
        return issues;
    },
};
