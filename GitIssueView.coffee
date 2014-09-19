{$$, EditorView, View} = require 'atom'
marked = require 'marked'

module.exports =

class GitIssueView extends View
  @content: ->
    @div =>
      @h1 'GitHub Issues'
      @ul()
  constructor: (opt) ->
    super
    {@issues} = opt
    issueList = @issues
      .sort (a,b) -> +a.number - +b.number
      .map (issue) ->
        "##{issue.number}: #{issue.title}<div>#{marked issue.body}</div>"
    #@setText issueList.join "\n"
    issueList.forEach (issue) =>
      @find('ul').append("<li>#{issue}</li>")
  getTitle: -> 'GitHub Issues'
  getUri: -> 'github-issues://list'
