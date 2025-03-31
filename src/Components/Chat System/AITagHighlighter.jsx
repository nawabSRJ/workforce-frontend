import React from 'react';
// ? highlights the tagging of ai "@ai"
const AITagHighlighter = ({ text }) => {
    if (!text.includes('@ai')) return <>{text}</>;
    
    const parts = text.split('@ai');
    return (
        <>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {part}
                    {index !== parts.length - 1 && (
                        <span className="text-blue-500">@ai</span>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default AITagHighlighter;