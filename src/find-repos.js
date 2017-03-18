import * as urlUtils from 'url';

export default async function findReposInWorkspace() {
    const repositories = atom.project.getRepositories().filter(Boolean);
    const repo = repositories[0];
    if (!repo || !repo.getOriginURL()) return null;
    const remote = urlUtils.parse(repo.getOriginURL());
    if (remote.host !== 'github.com') return null;
    const [user, repoName] = remote.path.split('/').filter(Boolean).slice(0, 2);
    return {user, name: repoName.replace(/\.git$/, '')};
}
