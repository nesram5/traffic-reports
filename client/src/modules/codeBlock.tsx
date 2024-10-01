import React, { useState } from 'react';

// CodeBlock component
interface CodeBlockProps {
    code: any;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    // Function to copy the code to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
        });
    };

    return (
        <div className="code-container">
            <button className="copy-btn" onClick={copyToClipboard}>
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre className="code-block">
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;