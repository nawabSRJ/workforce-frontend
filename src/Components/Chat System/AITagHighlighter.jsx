import React from 'react';

const AITagHighlighter = ({ text, isSender }) => {
    if (!text.includes('@ai')) return <>{text}</>;
    
    const parts = text.split('@ai');
    return (
        <>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {part}
                    {index !== parts.length - 1 && (
                        <span className={isSender ? "text-white" : "text-blue-500"}>@ai</span>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default AITagHighlighter;