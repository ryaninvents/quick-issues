{$$, EditorView, View} = require 'atom'

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
      .map (iss) -> "##{iss.number}: #{iss.title}"
    #@setText issueList.join "\n"
    issueList.forEach (issue) =>
      @find('ul').append("<li>#{issue}</li>")
  getTitle: -> 'GitHub Issues'
  getUri: -> 'github-issues://list'
