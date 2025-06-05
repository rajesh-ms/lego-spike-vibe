'use client';

import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { Play, Copy, Download, RotateCcw, Lightbulb } from 'lucide-react';
import { useToast } from './Toast';

interface PythonEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
  hints?: string[];
}

export default function PythonEditor({ 
  value, 
  onChange, 
  height = '400px', 
  readOnly = false,
  showToolbar = true,
  hints = []
}: PythonEditorProps) {
  const [output, setOutput] = useState<string>('');
  const [showHints, setShowHints] = useState(false);
  const { showToast } = useToast();

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const runCode = () => {
    // Simulate code execution - in a real implementation, this would run Python code
    setOutput('🤖 Code simulation:\n✅ Robot is ready!\n📝 Your code looks great!\n\n' + 
             '💡 Remember: This is a simulation. To run on real LEGO hardware,\n' +
             '   copy your code to the LEGO SPIKE Prime app!');
    showToast('Code executed successfully! 🚀', 'success');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(value);
    setOutput('📋 Code copied to clipboard!');
    showToast('Code copied to clipboard! 📋', 'success');
  };

  const resetCode = () => {
    onChange('# Write your LEGO SPIKE Prime Python code here!\n# Have fun programming! 🧱\n\n');
    setOutput('');
    showToast('Code reset successfully! 🔄', 'info');
  };

  const downloadCode = () => {
    const blob = new Blob([value], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lego_program.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOutput('💾 Code downloaded as lego_program.py');
    showToast('Code downloaded as lego_program.py! 💾', 'success');
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white shadow-md">
      {/* Toolbar */}
      {showToolbar && (
        <div className="bg-gray-100 p-3 border-b flex flex-wrap items-center gap-2">
          <button
            onClick={runCode}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Play size={16} />
            Run Code
          </button>
          
          <button
            onClick={copyCode}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Copy size={16} />
            Copy
          </button>
          
          <button
            onClick={downloadCode}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Download
          </button>
          
          <button
            onClick={resetCode}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          {hints.length > 0 && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium ml-auto"
            >
              <Lightbulb size={16} />
              Hints
            </button>
          )}
        </div>
      )}

      {/* Hints Panel */}
      {showHints && hints.length > 0 && (
        <div className="bg-yellow-50 border-b p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Helpful Hints:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            {hints.map((hint, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Editor */}
      <Editor
        height={height}
        defaultLanguage="python"
        value={value}
        onChange={handleEditorChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 16,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          theme: 'vs-light',
          padding: { top: 16, bottom: 16 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          parameterHints: { enabled: true },
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 4,
          insertSpaces: true,
          cursorBlinking: 'smooth',
          renderLineHighlight: 'all',
          smoothScrolling: true,
        }}
        beforeMount={(monaco) => {
          // Configure Python language features
          monaco.languages.setLanguageConfiguration('python', {
            indentationRules: {
              increaseIndentPattern: /^(.*:)\s*$/,
              decreaseIndentPattern: /^(.*:)\s*$/
            }
          });
            // Add LEGO SPIKE Prime specific completions
          monaco.languages.registerCompletionItemProvider('python', {
            provideCompletionItems: () => {
              const suggestions = [
                {
                  label: 'hub',
                  kind: monaco.languages.CompletionItemKind.Module,
                  insertText: 'from spike import PrimeHub\nhub = PrimeHub()',
                  documentation: 'Import and create the LEGO SPIKE Prime hub',
                  range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                  }
                },
                {
                  label: 'motor',
                  kind: monaco.languages.CompletionItemKind.Module,
                  insertText: 'from spike import Motor\nmotor = Motor("A")',
                  documentation: 'Import and create a motor connected to port A',
                  range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                  }
                },
                {
                  label: 'sensor',
                  kind: monaco.languages.CompletionItemKind.Module,
                  insertText: 'from spike import DistanceSensor\nsensor = DistanceSensor("1")',
                  documentation: 'Import and create a distance sensor',
                  range: {
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                  }
                }
              ];
              return { suggestions };
            }
          });
        }}
      />

      {/* Output Panel */}
      {output && (
        <div className="bg-gray-900 text-green-400 p-4 text-sm font-mono">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400">Console Output:</span>
          </div>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
