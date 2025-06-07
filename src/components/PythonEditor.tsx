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
  };  const runCode = () => {
    // Simulate Python code execution by parsing print statements and imports
    try {
      const lines = value.split('\n');
      let simulatedOutput = '🤖 Code simulation started...\n\n';
      
      // Track imports, variables, and functions for more realistic simulation
      const imports = new Set();
      const variables = new Map();
      const functions = new Map();
        // Helper function to evaluate simple expressions
      const evaluateExpression = (expr: string): string => {
        // Handle basic arithmetic and variable substitution
        let result = expr;
        
        // Replace variables with their values
        for (const [varName, varValue] of variables) {
          const regex = new RegExp(`\\b${varName}\\b`, 'g');
          result = result.replace(regex, varValue);
        }
        
        // Handle simple arithmetic operations safely
        try {
          // Only allow safe mathematical operations (no eval for security)
          if (/^[\d\s+\-*/().]+$/.test(result)) {
            // Simple math parser for basic operations
            const mathResult = Function(`"use strict"; return (${result})`)();
            result = mathResult.toString();
          }
        } catch {
          // If evaluation fails, return original
        }
        
        return result;
      };
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith('#')) continue;
        
        // Handle imports
        if (line.startsWith('import ') || line.startsWith('from ')) {
          const importMatch = line.match(/(?:from\s+(\w+)\s+)?import\s+(.+)/);
          if (importMatch) {
            const moduleName = importMatch[1] || importMatch[2].split(',')[0].trim();
            imports.add(moduleName);
            simulatedOutput += `📦 Imported: ${line}\n`;
          }
          continue;
        }
        
        // Handle function definitions
        if (line.startsWith('def ')) {
          const funcMatch = line.match(/def\s+(\w+)\s*\(/);
          if (funcMatch) {
            const funcName = funcMatch[1];
            functions.set(funcName, i);
            simulatedOutput += `📋 Defined function: ${funcName}()\n`;
          }
          continue;
        }
          // Handle variable assignments (including function calls)
        const varMatch = line.match(/^(\w+)\s*=\s*(.+)/);
        if (varMatch) {
          const varName = varMatch[1];
          let varValue = varMatch[2].trim();
          
          // Handle function calls in assignments
          const funcCallInAssign = varValue.match(/(\w+)\s*\(\s*(.*?)\s*\)/);
          if (funcCallInAssign && functions.has(funcCallInAssign[1])) {
            const funcName = funcCallInAssign[1];
            const funcArgs = funcCallInAssign[2];
            
            // Special handling for calculate_time function
            if (funcName === 'calculate_time' && funcArgs) {
              const args = funcArgs.split(',').map(arg => {
                const trimmedArg = arg.trim();
                return variables.get(trimmedArg) || trimmedArg;
              });
              if (args.length >= 2) {
                const distance = parseFloat(args[0]) || 0;
                const speedVal = parseFloat(args[1]) || 1;
                const result = (distance / speedVal).toString();
                variables.set(varName, result);
                simulatedOutput += `📝 Set ${varName} = ${funcName}(${funcArgs}) = ${result}\n`;
                continue;
              }
            }
            
            // Generic function call result
            varValue = 'function_result';
          }
          
          // Handle string literals
          if (varValue.startsWith('"') && varValue.endsWith('"')) {
            varValue = varValue.slice(1, -1);
          } else if (varValue.startsWith("'") && varValue.endsWith("'")) {
            varValue = varValue.slice(1, -1);
          } else if (!varValue.includes('(')) {
            // Try to evaluate expression (only if not a function call)
            varValue = evaluateExpression(varValue);
          }
          
          variables.set(varName, varValue);
          simulatedOutput += `📝 Set ${varName} = ${varValue}\n`;
          continue;
        }
          // Handle function calls (both simple and with parameters)
        const funcCallMatch = line.match(/^(\w+)\s*\(\s*(.*?)\s*\)/);
        if (funcCallMatch && functions.has(funcCallMatch[1])) {
          const funcName = funcCallMatch[1];
          const funcArgs = funcCallMatch[2];
          simulatedOutput += `🔧 Called function: ${funcName}(${funcArgs})\n`;
          
          // For functions that return values (like calculate_time)
          if (funcName === 'calculate_time' && funcArgs) {
            const args = funcArgs.split(',').map(arg => {
              const trimmedArg = arg.trim();
              // Try to get variable value or use as literal
              return variables.get(trimmedArg) || trimmedArg;
            });
            if (args.length >= 2) {
              const distance = parseFloat(args[0]) || 0;
              const speedVal = parseFloat(args[1]) || 1;
              const result = distance / speedVal;
              simulatedOutput += `  ↳ Calculated: ${distance} / ${speedVal} = ${result}\n`;
            }
          }
          
          // Simulate function execution by looking for print statements inside
          const funcStartLine = functions.get(funcName);
          if (funcStartLine !== undefined) {
            for (let j = funcStartLine + 1; j < lines.length; j++) {
              const funcLine = lines[j].trim();
              if (funcLine.startsWith('def ') || (!funcLine.startsWith(' ') && !funcLine.startsWith('\t') && funcLine !== '')) {
                break; // End of function
              }
              
              const funcPrintMatch = funcLine.match(/print\s*\(\s*(.+)\s*\)/);
              if (funcPrintMatch) {
                let printContent = funcPrintMatch[1];
                
                // Handle f-strings and variable substitution
                if (printContent.startsWith('f"') || printContent.startsWith("f'")) {
                  printContent = printContent.substring(2, printContent.length - 1);
                  for (const [varName, varValue] of variables) {
                    printContent = printContent.replace(new RegExp(`\\{${varName}\\}`, 'g'), varValue);
                  }
                } else if (printContent.startsWith('"') || printContent.startsWith("'")) {
                  printContent = printContent.substring(1, printContent.length - 1);
                }
                
                simulatedOutput += `  > ${printContent}\n`;
              }
            }
          }
          continue;
        }
        
        // Handle conditional statements (if/else)
        if (line.startsWith('if ') && line.endsWith(':')) {
          const condition = line.substring(3, line.length - 1).trim();
          let conditionResult = false;
          
          // Simple condition evaluation
          if (condition.includes('>')) {
            const [left, right] = condition.split('>').map(s => s.trim());
            const leftVal = parseFloat(variables.get(left) || left) || 0;
            const rightVal = parseFloat(right) || 0;
            conditionResult = leftVal > rightVal;
          } else if (condition.includes('<')) {
            const [left, right] = condition.split('<').map(s => s.trim());
            const leftVal = parseFloat(variables.get(left) || left) || 0;
            const rightVal = parseFloat(right) || 0;
            conditionResult = leftVal < rightVal;
          } else if (condition.includes('==')) {
            const [left, right] = condition.split('==').map(s => s.trim());
            const leftVal = variables.get(left) || left;
            const rightVal = right.replace(/['"]/g, '');
            conditionResult = leftVal === rightVal;
          }
          
          simulatedOutput += `🤔 Checking condition: ${condition} → ${conditionResult ? 'True' : 'False'}\n`;
          
          // Look ahead to find the if block and else block
          let ifBlockExecuted = false;
          for (let j = i + 1; j < lines.length; j++) {
            const nextLine = lines[j];
            
            // If we hit another if/def/unindented line, break
            if (!nextLine.startsWith('    ') && !nextLine.startsWith('\t') && nextLine.trim() !== '') {
              if (nextLine.trim().startsWith('else:')) {
                // Handle else block
                if (!conditionResult && !ifBlockExecuted) {
                  simulatedOutput += `📝 Executing else block:\n`;
                  // Execute else block
                  for (let k = j + 1; k < lines.length; k++) {
                    const elseLine = lines[k];
                    if (!elseLine.startsWith('    ') && !elseLine.startsWith('\t') && elseLine.trim() !== '') {
                      break;
                    }
                    const elsePrintMatch = elseLine.trim().match(/print\s*\(\s*(.+)\s*\)/);
                    if (elsePrintMatch) {
                      let printContent = elsePrintMatch[1];
                      if (printContent.startsWith('"') || printContent.startsWith("'")) {
                        printContent = printContent.substring(1, printContent.length - 1);
                      }
                      simulatedOutput += `  > ${printContent}\n`;
                    }
                  }
                }
                break;
              }
              break;
            }
            
            // Execute if block if condition is true
            if (conditionResult && !ifBlockExecuted) {
              const ifPrintMatch = nextLine.trim().match(/print\s*\(\s*(.+)\s*\)/);
              if (ifPrintMatch) {
                let printContent = ifPrintMatch[1];
                if (printContent.startsWith('"') || printContent.startsWith("'")) {
                  printContent = printContent.substring(1, printContent.length - 1);
                }
                simulatedOutput += `  > ${printContent}\n`;
                ifBlockExecuted = true;
              }
            }
          }
          continue;
        }
        
        // Skip else statements (handled in if block)
        if (line.startsWith('else:')) {
          continue;
        }
        
        // Skip indented lines (handled by if blocks and functions)
        if (line.startsWith('    ') || line.startsWith('\t')) {
          continue;
        }

        // Handle print statements
        const printMatch = line.match(/print\s*\(\s*(.+)\s*\)/);
        if (printMatch) {
          let printContent = printMatch[1];
          
          // Handle f-strings and variable substitution
          if (printContent.startsWith('f"') || printContent.startsWith("f'")) {
            printContent = printContent.substring(2, printContent.length - 1);
            // Simple f-string variable substitution
            for (const [varName, varValue] of variables) {
              printContent = printContent.replace(new RegExp(`\\{${varName}\\}`, 'g'), varValue);
            }
          } else if (printContent.startsWith('"') || printContent.startsWith("'")) {
            // Remove quotes for regular strings
            printContent = printContent.substring(1, printContent.length - 1);
          } else {
            // Handle variable names directly
            if (variables.has(printContent)) {
              printContent = variables.get(printContent) || printContent;
            }
          }
          
          simulatedOutput += `> ${printContent}\n`;
          continue;
        }
        
        // Handle LEGO SPIKE Prime specific commands
        if (line.includes('hub.light_matrix.show_image')) {
          const imageMatch = line.match(/show_image\s*\(\s*['"](\w+)['"]\s*\)/);
          const image = imageMatch ? imageMatch[1] : 'UNKNOWN';
          simulatedOutput += `🔆 Hub LED Matrix: Showing ${image}\n`;
        } else if (line.includes('hub.speaker.beep')) {
          simulatedOutput += `🔊 Hub Speaker: Beep sound played\n`;
        } else if (line.includes('motor.run_for_seconds')) {
          const motorMatch = line.match(/run_for_seconds\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+)\s*\)/);
          if (motorMatch) {
            simulatedOutput += `⚙️ Motor: Running for ${motorMatch[1]}s at speed ${motorMatch[2]}\n`;
          }
        } else if (line.includes('time.sleep')) {
          const sleepMatch = line.match(/time\.sleep\s*\(\s*(\d+(?:\.\d+)?)\s*\)/);
          if (sleepMatch) {
            simulatedOutput += `⏳ Waiting ${sleepMatch[1]} seconds...\n`;
          }
        }
      }
      
      simulatedOutput += '\n✅ Code executed successfully!\n';
      simulatedOutput += '💡 This is a simulation. Copy your code to the LEGO SPIKE Prime app to run on real hardware.';
      
      setOutput(simulatedOutput);
      showToast('Code executed successfully! 🚀', 'success');
        } catch (error) {
      let errorMessage = '❌ Simulation Error:\n';
      
      // Provide helpful error messages for common mistakes
      if (value.includes('print(') && !value.includes('print("') && !value.includes("print('")) {
        errorMessage += '💡 Tip: Remember to put quotes around text in print statements!\n';
        errorMessage += 'Example: print("Hello World") instead of print(Hello World)\n\n';
      } else if (value.includes('def ') && !value.includes(':')) {
        errorMessage += '💡 Tip: Don\'t forget the colon (:) after function definitions!\n';
        errorMessage += 'Example: def my_function(): instead of def my_function()\n\n';
      } else if (value.includes('if ') && !value.includes(':')) {
        errorMessage += '💡 Tip: Don\'t forget the colon (:) after if statements!\n';
        errorMessage += 'Example: if speed > 50: instead of if speed > 50\n\n';
      } else {
        errorMessage += `${error instanceof Error ? error.message : 'Unknown error'}\n\n`;
      }
      
      errorMessage += '🔧 Check your Python syntax and try again!';
      setOutput(errorMessage);
      showToast('Code execution failed! ❌', 'error');
    }
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
