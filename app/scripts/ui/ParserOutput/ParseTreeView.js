'use strict';

/** @jsx React.DOM */
var PureRenderMixin = require('React/addons').addons.PureRenderMixin;

var ParseTreeRawView = require('./ParseTreeRawView');
var ParseTreeD3View = require('./ParseTreeD3View');

var safeStringify = require('../../util/util').safeStringify;

var ParseTreeView = React.createClass({
  mixins: [PureRenderMixin],
  render: function () {

    var parserDebugger = this.props.parserDebugger || [];

    var text = parserDebugger.map(function (step) {
      var res = '';
      if (step.action === 'reduce') {
        res += ' --> ';
      }
      res += step.action + ': ' + safeStringify(step.text);
      if (step.action === 'reduce') {
        res += ' (' + step.nonterminal + ' -> ' + JSON.stringify(step.productions) + ')';
      } else if (step.action === 'shift') {
        res += ' (' + step.terminal + ')';
      }
      return res;
    }).join('\n');

    // <ParseTreeRawView parserDebugger={this.props.parserDebugger}/>

    return (
      <div>
        <h5>Parse tree</h5>
        <ParseTreeD3View parserDebugger={this.props.parserDebugger} />
      </div>
    );
  }
});

module.exports = ParseTreeView;

