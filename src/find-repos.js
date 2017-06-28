/** @babel */
import * as urlUtils from 'url';

export default async function findReposInWorkspace() {
    const repo = atom.project.getRepositories().find((repo) => {
        if (!repo || !repo.getOriginURL()) return false;
        const remote = urlUtils.parse(repo.getOriginURL());
        if (remote.host !== 'github.com') return false;
        return true;
    });
    const remote = urlUtils.parse(repo.getOriginURL());
    const [user, repoName] = remote.path.split('/').filter(Boolean).slice(0, 2);
    return {user, name: repoName.replace(/\.git$/, '')};
}
