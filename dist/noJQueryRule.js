"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.FAILURE_STRING_FACTORY = function () {
        return "Calls to jQuery($) method are not allowed.";
    };
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NojQueryRuleWalker(sourceFile, this.getOptions()));
    };
    Rule.metagata = {
        ruleName: "no-jquery",
        description: "Bans the use of jQuery($) methods.",
        rationale: "Some jQuery methods, such as manipulating DOM directly is a kind of anti-pattern in many modern UI frameworks",
        optionsDescription: "Only the method on the list can be used, otherwise ban all methods",
        options: {
            type: "array",
            items: { type: "string" },
        },
        optionExamples: [[true, "Selector"]],
        type: "functionality",
        typescriptOnly: false,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NojQueryRuleWalker = (function (_super) {
    __extends(NojQueryRuleWalker, _super);
    function NojQueryRuleWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NojQueryRuleWalker.prototype.visitIdentifier = function (node) {
        if (node.text === 'jQuery' || node.text === '$') {
            this.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY());
        }
    };
    return NojQueryRuleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=noJQueryRule.js.map