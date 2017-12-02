import * as vscode from 'vscode';
import * as resolver from './resolver';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

function openFile(fileName) {
	vscode.workspace
		.openTextDocument(fileName)
		.then(vscode.window.showTextDocument);
}

function prompt(fileName, cb) {
	let options = {
		placeHolder: `Create ${fileName}?`
	}
	vscode.window.showQuickPick(["Yes", "No"], options)
			.then(function(answer) {
				if (answer === "Yes") {
					cb();
				}
			});
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.jestGoToSpec', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; 
		}

		let document = editor.document;
		let fileName: string = document.fileName;
		let related: string = resolver.switchFile(fileName);
		let relative: string = vscode.workspace.asRelativePath(related);
		let fileExists: boolean = fs.existsSync(related);
		let dirname: string = path.dirname(related);
		
		if (fileExists) {
			openFile(related);
		} else {
			prompt(relative, function() {
				mkdirp.sync(dirname);
				fs.closeSync(fs.openSync(related, 'w'));
				openFile(related);
			});
		}
	});
	context.subscriptions.push(disposable);
}