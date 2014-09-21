{$$, EditorView, View} = require 'atom'
marked = require 'marked'
_ = require 'lodash'

statusToInt = (issue) ->
  switch issue.state
    when 'open' then 0
    when 'closed' then 1
  2

module.exports =

class GitIssueView extends View
  @content: ->
    @section 'class':'padded pane-item github-issues', =>
      @h1 'class':'section-heading', 'GitHub Issues'
      @div 'data-element':'issue-list'
  constructor: (opt={}) ->
    super
    console.log opt
    {@issues} = opt
    issueList = @issues
      .sort (a,b) ->
        return statusToInt(a) - statusToInt(b) if a.state isnt b.state
        +a.number - +b.number
      .map (issue) ->
        """
        <h2 class="section-heading issue-#{issue.state}">
          <a href="#{issue.html_url}">##{issue.number}: #{issue.title}</a>
        </h2>
        <div>
          #{(marked issue.body) or ''}
        </div>
        """
    issueList.forEach (issue) =>
      @find('[data-element="issue-list"]').append("<div class=block>#{issue}</div>")

  getTitle: -> 'GitHub Issues'
  getUri: -> 'github-issues://list'
