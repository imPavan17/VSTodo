// The module 'vscode' contains the VS Code extensibility API - For interaction with VSCode.
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { authenticate } from "./authenticate";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";
import { TokenManager } from "./TokenManager";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  TokenManager.globalState = context.globalState;

  console.log("token value_>", TokenManager.getToken());

  const sidebarProvider = new SidebarProvider(context.extensionUri);

  /** A button in the below bar */
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  item.text = "$(beaker) Add todo";
  item.command = "vstodo.addTodo"; // to activate the specific action
  item.show();

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vstodo-sidebar", sidebarProvider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.addTodo", function () {
      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active window");
      } else {
        const text = activeTextEditor.document.getText(
          activeTextEditor.selection
        );
        vscode.window.showInformationMessage(text);

        /** To send data from vs to webview(Svelts) */

        sidebarProvider._view?.webview.postMessage({
          type: "new-todo",
          value: text,
        });
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.authenticate", function () {
      authenticate();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vstodo.refresh", function () {
      HelloWorldPanel.kill();
      HelloWorldPanel.createOrShow(context.extensionUri);
    })
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("vstodo.helloWorld", function () {
  //     HelloWorldPanel.createOrShow(context.extensionUri);
  //   })
  // );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("vstodo.askQuestion", async () => {
  //     const answer = await vscode.window.showInformationMessage(
  //       "How was your day?",
  //       "good",
  //       "bad"
  //     );

  //     if (answer === "bad") {
  //       vscode.window.showInformationMessage("Sorry to hear that!!!");
  //     } else {
  //       console.log({ answer });
  //     }
  //   })
  // );
}

// this method is called when your extension is deactivated
export function deactivate() {}
