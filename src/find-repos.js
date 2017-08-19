/** @babel */
import * as urlUtils from 'url';

export default async function findReposInWorkspace() {
    const repo = atom.project.getRepositories().find((repo) => {
        if (!repo || !repo.getOriginURL()) return false;
        const remote = urlUtils.parse(repo.getOriginURL().replace(":","/").replace("git@","https://"));
        if (remote.host !== 'github.com') return false;
        return true;
    });
    if (!repo) return null;
    const remote = urlUtils.parse(repo.getOriginURL().replace(":","/").replace("git@","https://"));
    const [user, repoName] = remote.path.split('/').filter(Boolean).slice(0, 2);
    return {user, name: repoName.replace(/\.git$/, '')};
}
