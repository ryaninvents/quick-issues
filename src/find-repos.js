/** @babel */
import * as urlUtils from 'url';

/**
 * If this repo is a GitHub SSH repo, translate the URL to an HTTPS URL.
 */
function convertSshToHttps(url) {
    return url.replace(/^git@github.com:/, 'https://github.com/');
}

export default async function findReposInWorkspace() {
    const repo = atom.project.getRepositories().find((repo) => {
        if (!repo || !repo.getOriginURL()) return false;
        const remote = urlUtils.parse(convertSshToHttps(repo.getOriginURL()));
        if (remote.host !== 'github.com') return false;
        return true;
    });
    if (!repo) return null;
    const remote = urlUtils.parse(convertSshToHttps(repo.getOriginURL()));
    const [user, repoName] = remote.path.split('/').filter(Boolean).slice(0, 2);
    return {user, name: repoName.replace(/\.git$/, '')};
}
