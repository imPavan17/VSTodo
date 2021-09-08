import * as vscode from "vscode";
import * as polka from "polka"; // like an express (lighter version)
import { TokenManager } from "./TokenManager";

export const authenticate = () => {
  const app = polka();

  app.get("/auth/:token", async (req, res) => {
    const { token } = req.params;
    if (!token) {
      res.end(`<h1>Something went wrong!`);
      return;
    }

    await TokenManager.setToken(token);
    res.end(`<h1>${token} - Auth was successful!</hh1>`);

    (app as any).server.close();
  });

  app.listen(54321, (err: { message: string }) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
    } else {
      vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse(`http://localhost:3002/auth/github`) // to open a url
      );
    }
  });
  // to open a url
};
