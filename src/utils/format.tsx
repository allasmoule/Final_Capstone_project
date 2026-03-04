import React from "react";

/**
 * Renders formatted text with markdown-like styling
 * Supports bold (**text**), bullet points, and line breaks
 */
export function renderFormatted(text: string): React.ReactNode {
  if (!text) return null;

  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/);

  return React.createElement(
    "div",
    { className: "formatted-text space-y-3" },
    paragraphs.map((paragraph, pIndex) => {
      // Check if it's a list (starts with - or *)
      const lines = paragraph.split("\n");
      const isListParagraph = lines.some((line) =>
        line.trim().match(/^[-*•]\s/),
      );

      if (isListParagraph) {
        return React.createElement(
          "ul",
          {
            key: `p-${pIndex}`,
            className: "list-disc list-inside space-y-1 ml-2",
          },
          lines
            .filter((line) => line.trim())
            .map((line, lIndex) => {
              const cleanLine = line.replace(/^[-*•]\s*/, "").trim();
              return React.createElement(
                "li",
                { key: `l-${pIndex}-${lIndex}` },
                formatInlineText(cleanLine),
              );
            }),
        );
      }

      // Check if it's a numbered list
      const isNumberedList = lines.some((line) =>
        line.trim().match(/^\d+[.)]\s/),
      );

      if (isNumberedList) {
        return React.createElement(
          "ol",
          {
            key: `p-${pIndex}`,
            className: "list-decimal list-inside space-y-1 ml-2",
          },
          lines
            .filter((line) => line.trim())
            .map((line, lIndex) => {
              const cleanLine = line.replace(/^\d+[.)]\s*/, "").trim();
              return React.createElement(
                "li",
                { key: `l-${pIndex}-${lIndex}` },
                formatInlineText(cleanLine),
              );
            }),
        );
      }

      // Regular paragraph with line breaks
      return React.createElement(
        "p",
        { key: `p-${pIndex}` },
        lines.map((line, lIndex) =>
          React.createElement(
            React.Fragment,
            { key: `l-${pIndex}-${lIndex}` },
            formatInlineText(line),
            lIndex < lines.length - 1 ? React.createElement("br") : null,
          ),
        ),
      );
    }),
  );
}

/**
 * Formats inline text with bold, italic, and code styling
 */
function formatInlineText(text: string): React.ReactNode {
  // Handle bold text (**text** or __text__)
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);

  return parts.map((part, index) => {
    // Bold text
    if (part.startsWith("**") && part.endsWith("**")) {
      return React.createElement(
        "strong",
        { key: index, className: "font-semibold" },
        part.slice(2, -2),
      );
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return React.createElement(
        "strong",
        { key: index, className: "font-semibold" },
        part.slice(2, -2),
      );
    }
    return part;
  });
}

export default renderFormatted;
