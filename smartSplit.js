import { Document } from "langchain/document";

export async function splitCode(codeContent, filePath) {
  const cleanedCode = codeContent
    .replace(/\r\n/g, "\n")
    .replace(/\n\s*\n\s*\n/g, "\n\n");
  const segments = [];
  let currentSegment = [];
  let currentImports = [];
  let lineNumber = 0;
  let currentStartLine = 0;

  const lines = cleanedCode.split("\n");

  for (let i = 0; i < lines.length; i++) {
    lineNumber = i + 1;
    const line = lines[i].trim();

    if (
      line.startsWith("import ") ||
      (line.startsWith("const ") && line.includes("require("))
    ) {
      currentImports.push(line);
      continue;
    }

    if (
      line.startsWith("class ") ||
      line.startsWith("function ") ||
      line.match(/^(async\s+)?(\w+)\s*=\s*(\(|async)/) ||
      line.startsWith("export ") ||
      line.startsWith("interface ") ||
      line.startsWith("type ")
    ) {
      if (currentSegment.length > 0) {
        const segment = currentSegment.join("\n");
        if (segment.trim().length > 0) {
          segments.push(
            createDocument(
              segment,
              filePath,
              currentImports,
              currentStartLine,
              lineNumber - 1
            )
          );
        }
        currentSegment = [];
        currentStartLine = lineNumber;
      }
    }

    currentSegment.push(lines[i]);

    if (
      line === "}" &&
      i < lines.length - 1 &&
      !lines[i + 1].trim().startsWith("else")
    ) {
      const segment = currentSegment.join("\n");
      if (segment.trim().length > 0) {
        segments.push(
          createDocument(
            segment,
            filePath,
            currentImports,
            currentStartLine,
            lineNumber
          )
        );
      }
      currentSegment = [];
      currentStartLine = lineNumber + 1;
    }
  }

  if (currentSegment.length > 0) {
    const segment = currentSegment.join("\n");
    if (segment.trim().length > 0) {
      segments.push(
        createDocument(
          segment,
          filePath,
          currentImports,
          currentStartLine,
          lineNumber
        )
      );
    }
  }

  return segments;
}

function createDocument(content, filePath, imports, startLine, endLine) {
  const relevantImports = imports.filter((imp) => {
    const importedItem =
      imp.match(/import\s+{\s*(\w+)/)?.[1] ||
      imp.match(/import\s+(\w+)/)?.[1] ||
      imp.match(/const\s+(\w+)/)?.[1];
    return importedItem && content.includes(importedItem);
  });

  const fullContent = [...relevantImports, "", content].join("\n");

  return new Document({
    pageContent: fullContent,
    metadata: {
      filePath,
      language: filePath.split(".").pop(),
      lineCount: content.split("\n").length,
      importCount: relevantImports.length,
      startLine, // Added line number tracking
      endLine, // Added line number tracking
      rawContent: content, // Store original content before cleaning
    },
  });
}
