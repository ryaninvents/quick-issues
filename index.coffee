GitIssueView = require './GitIssueView'
request = require 'request'

request = request.defaults
  headers:
    'User-Agent': 'baconscript/github-issues'

GH_REGEX = /^(https:\/\/|git@)github\.com(\/|:)([-\w]+)\/([-\w]+)\.git$/

issuesUrl = (info) ->
  "https://api.github.com/repos/#{info.user}/#{info.repo}/issues"

getOriginUrl = -> atom.project.getRepo().getOriginUrl()

isGitHubRepo = ->
  return false unless getOriginUrl()
  console.log getOriginUrl()
  m = getOriginUrl().match GH_REGEX
  console.log m
  if m
    {
      user: m[3]
      repo: m[4]
    }
  else
    false

fetchIssues = (callback) ->
  request issuesUrl(isGitHubRepo()), (err, resp, body) ->
    if err
      callback err
    else
      try
        issues = JSON.parse body
        console.log issues
        callback null, issues
      catch err
        console.log 'ERR', body
        callback err

module.exports =
  configDefaults:
    username: ''
  activate: ->
    console.log issuesUrl isGitHubRepo()
    atom.workspaceView.command 'github-issues:list', ->
      if isGitHubRepo()
        atom.workspace.open 'github-issues://list'
    fetchIssues (err, issues) ->
      if err then console.error err
      atom.workspace.registerOpener (uri) ->
        return unless uri.match /^github-issues:/
        new GitIssueView
          issues: issues
