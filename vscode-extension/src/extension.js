const vscode = require('vscode');
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';
const TOKEN_KEY = 'neurostack.token';

/**
 * Get stored token from SecretStorage
 */
async function getToken(context) {
  return await context.secrets.get(TOKEN_KEY);
}

/**
 * Make authenticated API call
 */
async function apiCall(context, method, endpoint, data) {
  const token = await getToken(context);
  if (!token) {
    vscode.window.showErrorMessage('NeuroStack: Not logged in. Run "NeuroStack: Login" first.');
    return null;
  }
  return axios({ method, url: `${API_BASE}${endpoint}`, data, headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get selected text and file info from active editor
 */
function getEditorContext() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return null;

  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);
  const fileName = editor.document.fileName.split(/[\\/]/).pop();
  const language = editor.document.languageId;

  return { selectedText, fileName, language };
}

/**
 * Parse comma-separated tags input into array
 */
function parseTags(input) {
  if (!input) return [];
  return input.split(',').map(t => t.trim()).filter(Boolean);
}

function activate(context) {

  // --- LOGIN ---
  context.subscriptions.push(
    vscode.commands.registerCommand('neurostack.login', async () => {
      const token = await vscode.window.showInputBox({
        prompt: 'Paste your NeuroStack JWT token',
        password: true,
        placeHolder: 'eyJhbGci...',
      });
      if (!token) return;
      await context.secrets.store(TOKEN_KEY, token);
      vscode.window.showInformationMessage('NeuroStack: Logged in successfully.');
    })
  );

  // --- SAVE SNIPPET ---
  context.subscriptions.push(
    vscode.commands.registerCommand('neurostack.saveSnippet', async () => {
      const editor = getEditorContext();
      if (!editor?.selectedText) {
        return vscode.window.showWarningMessage('NeuroStack: Select some code first.');
      }

      const title = await vscode.window.showInputBox({ prompt: 'Snippet title', placeHolder: 'e.g. Debounce hook' });
      if (!title) return;

      const description = await vscode.window.showInputBox({ prompt: 'Short description (optional)', placeHolder: 'What does this do?' }) || '';
      const tagsInput = await vscode.window.showInputBox({ prompt: 'Tags (comma separated, optional)', placeHolder: 'react, hooks, utility' });

      const res = await apiCall(context, 'post', '/snippets', {
        title,
        code: editor.selectedText,
        language: editor.language,
        description,
        tags: parseTags(tagsInput),
      });

      if (res) vscode.window.showInformationMessage(`NeuroStack: Snippet "${title}" saved.`);
    })
  );

  // --- SAVE NOTE ---
  context.subscriptions.push(
    vscode.commands.registerCommand('neurostack.saveNote', async () => {
      const editor = getEditorContext();
      if (!editor?.selectedText) {
        return vscode.window.showWarningMessage('NeuroStack: Select some text first.');
      }

      const title = await vscode.window.showInputBox({ prompt: 'Note title', placeHolder: 'e.g. How useEffect cleanup works' });
      if (!title) return;

      const tagsInput = await vscode.window.showInputBox({ prompt: 'Tags (comma separated, optional)', placeHolder: 'react, hooks' });

      const res = await apiCall(context, 'post', '/notes', {
        title,
        content: editor.selectedText,
        tags: parseTags(tagsInput),
      });

      if (res) vscode.window.showInformationMessage(`NeuroStack: Note "${title}" saved.`);
    })
  );

  // --- SAVE BUG ---
  context.subscriptions.push(
    vscode.commands.registerCommand('neurostack.saveBug', async () => {
      const editor = getEditorContext();
      if (!editor?.selectedText) {
        return vscode.window.showWarningMessage('NeuroStack: Select some code or error text first.');
      }

      const title = await vscode.window.showInputBox({ prompt: 'Bug title', placeHolder: 'e.g. useEffect infinite loop' });
      if (!title) return;

      const solution = await vscode.window.showInputBox({ prompt: 'Solution (optional)', placeHolder: 'What fixed it?' }) || '';
      const tagsInput = await vscode.window.showInputBox({ prompt: 'Tags (comma separated, optional)', placeHolder: 'react, hooks' });

      const severity = await vscode.window.showQuickPick(['low', 'medium', 'high', 'critical'], { placeHolder: 'Severity' });
      if (!severity) return;

      const res = await apiCall(context, 'post', '/bugs', {
        title,
        description: `File: ${editor.fileName}\n\n${editor.selectedText}`,
        solution,
        severity,
        status: solution ? 'resolved' : 'open',
        tags: parseTags(tagsInput),
      });

      if (res) vscode.window.showInformationMessage(`NeuroStack: Bug "${title}" saved.`);
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
