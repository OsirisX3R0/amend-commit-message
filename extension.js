// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "amend-commit-message" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('amendcommitmessage.amendCommitMessage', function () {
		const gitExtension = vscode.extensions.getExtension('vscode.git').exports
		const api = gitExtension.getAPI(1)
		const repo = api.repositories[0]
		// May come back to this if I can find the old commit message
		// const head = repo ? repo.state.HEAD : {name: '', commit: ''}
		// const {name, upstream} = head
		// const oldMsg = upstream.name

		vscode.window.showInputBox({prompt: 'Enter your new commit message', placeHolder: ''})
			.then(newMsg => {
				// Only commit if the message changed, to avoid unnecessary updates
				if (newMsg) {
					repo.commit(newMsg, {amend: true})
						.then(() => {
							vscode.window.showInformationMessage(`New commit message >>> ${newMsg}`);
						})
						.catch(err => {
							vscode.window.showInformationMessage(err)
						})
				}
			})
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
