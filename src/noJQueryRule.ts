import * as ts from "typescript";
import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    /* tslint:disable:object-literal-sort-keys */
    public static metagata: Lint.IRuleMetadata = {
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
    /* tslint:enable:object-literal-sort-keys */

    public static FAILURE_STRING_FACTORY() {
        return `Calls to jQuery($) method are not allowed.`;
    }

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        // return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
        return this.applyWithWalker(new NojQueryRuleWalker(sourceFile, this.getOptions()));
    }
}

class NojQueryRuleWalker extends Lint.RuleWalker {
    protected visitIdentifier(node: ts.Identifier): void {
        if(node.text === 'jQuery' || node.text === '$') {
            this.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY());
        }
    }
}
