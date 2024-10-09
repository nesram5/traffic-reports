import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      <pre className="code-box">
      <ReactMarkdown>{code}</ReactMarkdown>
      </pre>
      <button className="copy-btn" onClick={copyToClipboard}>
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  );
};
