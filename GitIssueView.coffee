{$$, EditorView, View} = require 'atom'

module.exports =

class GitIssueView extends EditorView
  @aoecontent: ->
    @h1 'GitHub Issues'
    @ul =>
      @issues.forEach (issue) =>
        @li issue.title
  constructor: (opt) ->
    super
    {@issues} = opt
    issueList = @issues.map (iss) -> JSON.stringify iss
    @setText issueList.join "\n"
  getTitle: -> 'GitHub Issues'
  getUri: -> 'github-issues://list'
