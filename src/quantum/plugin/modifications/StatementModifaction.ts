import { each } from "realm-utils";
import { RequireStatement } from "../../core/nodes/RequireStatement";
import { FileAbstraction } from "../../core/FileAbstraction";
import { QuantumCore } from "../QuantumCore";


export class StatementModification {
    public static perform(core: QuantumCore, file: FileAbstraction): Promise<void> {
        return each(file.requireStatements, (statement: RequireStatement) => {
            if (statement.isComputed) {
                statement.setFunctionName("$fsx.c");
                statement.bindID(file.getID());
                // file map is requested with computed require statements
                file.addFileMap();
            } else {
                let resolvedFile = statement.resolve();
                if (resolvedFile) {
                    statement.setFunctionName('$fsx.r');
                    statement.setValue(resolvedFile.getID());
                }
            }
        });
    }
}