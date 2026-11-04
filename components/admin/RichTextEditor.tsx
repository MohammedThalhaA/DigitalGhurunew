"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Heading1,
  Heading2,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  Unlink2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  Code,
  PenTool,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

/**
 * Splits malformed headings that contain <br> or multiple lines into separate <h2> and <p> tags
 */
export function cleanMalformedHeadings(html: string): string {
  if (!html) return html;
  return html.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (match, level, content) => {
    const parts = content
      .split(/<br\s*\/?>|\r?\n/)
      .map((s: string) => s.trim())
      .filter(Boolean);

    if (parts.length <= 1) return match;

    const heading = `<h${level}>${parts[0]}</h${level}>`;
    const paragraphs = parts.slice(1).map((p: string) => `<p>${p}</p>`).join("\n");
    return `${heading}\n${paragraphs}`;
  });
}

/**
 * Finds the closest enclosing block-level element of a node inside the editor
 */
function getClosestBlock(node: Node, root: HTMLElement): HTMLElement {
  let curr: Node | null = node;
  while (curr && curr !== root) {
    if (curr instanceof HTMLElement) {
      const tag = curr.tagName.toUpperCase();
      if (/^(P|H1|H2|H3|H4|H5|H6|BLOCKQUOTE|LI|DIV|SECTION|ARTICLE)$/.test(tag)) {
        return curr;
      }
    }
    curr = curr.parentNode;
  }
  return root;
}

/**
 * Converts Markdown string into clean HTML for WYSIWYG display.
 * Accurately treats each line independently so paragraphs right below headings are never lumped into the heading.
 */
export function markdownToHtml(md: string): string {
  if (!md) return "<p><br></p>";

  // If already full HTML, clean any malformed headings and return
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr)[\s>]/i.test(md.trim())) {
    return cleanMalformedHeadings(md);
  }

  const lines = md.split(/\r?\n/);
  const blocks: string[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      blocks.push(`<p>${formatInline(currentParagraph.join(" "))}</p>`);
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0 && listType) {
      blocks.push(
        `<${listType}>${currentList.map((li) => `<li>${formatInline(li)}</li>`).join("")}</${listType}>`
      );
      currentList = [];
      listType = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${formatInline(trimmed.slice(2).trim())}</h2>`);
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${formatInline(trimmed.slice(3).trim())}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h3>${formatInline(trimmed.slice(4).trim())}</h3>`);
    } else if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      flushList();
      blocks.push("<hr>");
    } else if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push(`<blockquote>${formatInline(trimmed.slice(2).trim())}</blockquote>`);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushParagraph();
      if (listType !== "ul") flushList();
      listType = "ul";
      currentList.push(trimmed.replace(/^[-*]\s+/, "").trim());
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      if (listType !== "ol") flushList();
      listType = "ol";
      currentList.push(trimmed.replace(/^\d+\.\s+/, "").trim());
    } else {
      flushList();
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  flushList();

  return cleanMalformedHeadings(blocks.join("\n"));
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/**
 * Universal blog content renderer:
 * Ensures any stored blog content (whether Markdown or HTML) renders as clean, semantic HTML.
 */
export function renderBlogContentHtml(content: string): string {
  if (!content) return "";
  const trimmed = content.trim();

  // If content contains HTML tags, clean and return
  if (/<(p|h1|h2|h3|h4|ul|ol|blockquote|hr|div)[\s>]/i.test(trimmed)) {
    return cleanMalformedHeadings(trimmed);
  }

  // Otherwise convert standard Markdown to HTML
  return markdownToHtml(trimmed);
}

/**
 * Sanitizes rich HTML pasted from MS Word, Google Docs, or other websites
 */
function sanitizePastedHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .replace(/<span[^>]*style="[^"]*font-weight:\s*(?:bold|700)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, "<strong>$1</strong>")
    .replace(/<span[^>]*style="[^"]*font-style:\s*italic[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, "<em>$1</em>")
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, "$1")
    .replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, "$1")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/<o:p>[\s\S]*?<\/o:p>/gi, "");
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tell your story... Write or paste your article content here.",
  minHeight = "460px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChangeRef = useRef(false);
  const [viewMode, setViewMode] = useState<"compose" | "html">("compose");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readTimeMinutes, setReadTimeMinutes] = useState(1);

  // Update statistics (word count, reading time)
  const updateStats = useCallback((htmlOrText: string) => {
    const text = htmlOrText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;
    setWordCount(words);
    setCharCount(chars);
    setReadTimeMinutes(Math.max(1, Math.ceil(words / 200)));
  }, []);

  // Sync incoming value to innerHTML on mount or external reset
  useEffect(() => {
    if (editorRef.current && !isInternalChangeRef.current) {
      const currentHtml = editorRef.current.innerHTML.trim();
      const targetHtml = markdownToHtml(value).trim();
      if (currentHtml !== targetHtml) {
        editorRef.current.innerHTML = targetHtml;
        updateStats(targetHtml);
      }
    }
  }, [value, updateStats]);

  const triggerChange = () => {
    if (!editorRef.current) return;
    isInternalChangeRef.current = true;
    const currentHtml = editorRef.current.innerHTML;
    onChange(currentHtml);
    updateStats(currentHtml);
    setTimeout(() => {
      isInternalChangeRef.current = false;
    }, 100);
  };

  /**
   * Execute document.execCommand with selection preservation
   */
  const exec = (command: string, val: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, val);
    triggerChange();
  };

  /**
   * Surgically converts the block containing the cursor/selection to a target tag (p, h2, h3).
   * Operates strictly on the targeted block without modifying or resetting other blocks.
   */
  const convertBlockTo = (targetTag: "p" | "h2" | "h3") => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const targetBlock = getClosestBlock(range.startContainer, editorRef.current);

    // Fallback if cursor is directly on editor root
    if (targetBlock === editorRef.current) {
      try {
        document.execCommand("formatBlock", false, `<${targetTag}>`);
      } catch {
        try {
          document.execCommand("formatBlock", false, targetTag);
        } catch {}
      }
      triggerChange();
      return;
    }

    // Case A: The block contains an internal <br> (e.g. Heading<br>Paragraph in a single element)
    const br = targetBlock.querySelector("br");
    if (br) {
      const nextNodes: Node[] = [];
      let n = br.nextSibling;
      while (n) {
        const next = n.nextSibling;
        nextNodes.push(n);
        n = next;
      }
      br.remove();

      let cursorInSecond = false;
      for (const node of nextNodes) {
        if (node === range.startContainer || node.contains(range.startContainer)) {
          cursorInSecond = true;
          break;
        }
      }

      const firstTag = cursorInSecond ? (targetBlock.tagName.toLowerCase() as any) : targetTag;
      const secondTag = cursorInSecond ? targetTag : "p";

      const firstEl = document.createElement(firstTag);
      while (targetBlock.firstChild) {
        firstEl.appendChild(targetBlock.firstChild);
      }

      const secondEl = document.createElement(secondTag);
      for (const child of nextNodes) {
        secondEl.appendChild(child);
      }

      const parent = targetBlock.parentNode;
      if (parent) {
        parent.insertBefore(firstEl, targetBlock);
        parent.insertBefore(secondEl, targetBlock);
        parent.removeChild(targetBlock);
      }

      const activeEl = cursorInSecond ? secondEl : firstEl;
      const newRange = document.createRange();
      newRange.selectNodeContents(activeEl);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);

      triggerChange();
      return;
    }

    // Case B: Convert targetBlock directly to targetTag
    const newEl = document.createElement(targetTag);
    while (targetBlock.firstChild) {
      newEl.appendChild(targetBlock.firstChild);
    }

    // If converting to normal paragraph, unwrap full bold if the entire text was bold
    if (targetTag === "p") {
      newEl.querySelectorAll("strong, b").forEach((b) => {
        if (b.textContent === newEl.textContent) {
          const parent = b.parentNode;
          if (parent) {
            while (b.firstChild) {
              parent.insertBefore(b.firstChild, b);
            }
            parent.removeChild(b);
          }
        }
      });
    }

    targetBlock.parentNode?.replaceChild(newEl, targetBlock);

    // Place cursor cleanly inside the newly converted block
    const newRange = document.createRange();
    newRange.selectNodeContents(newEl);
    newRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(newRange);

    triggerChange();
  };

  /**
   * Clear Formatting
   */
  const clearFormatting = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    try {
      document.execCommand("removeFormat", false);
    } catch {}
    convertBlockTo("p");
  };

  /**
   * Insert link with prompt
   */
  const handleInsertLink = () => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    const selectedText = selection?.toString() || "";

    const url = window.prompt("Enter destination URL (e.g. https://...):", "https://");
    if (!url || url === "https://") return;

    editorRef.current.focus();
    if (!selectedText) {
      document.execCommand("insertHTML", false, `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    } else {
      document.execCommand("createLink", false, url);
    }
    triggerChange();
  };

  /**
   * Smart Paste Handler:
   * Supports ChatGPT Markdown, Word/Google Docs Rich Text, or plain text
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    // Case 1: ChatGPT or Markdown pasted (contains ##, **, -, etc.)
    if (
      text &&
      (/^#{1,6}\s/m.test(text) ||
        /\*\*.*?\*\*/m.test(text) ||
        /^[-*]\s/m.test(text) ||
        /^\d+\.\s/m.test(text) ||
        /^>\s/m.test(text))
    ) {
      e.preventDefault();
      const convertedHtml = markdownToHtml(text);
      document.execCommand("insertHTML", false, convertedHtml);
      triggerChange();
      return;
    }

    // Case 2: Rich HTML pasted from Word, Google Docs, or Web
    if (html && (html.includes("<h") || html.includes("<p") || html.includes("<ul") || html.includes("<b") || html.includes("<strong") || html.includes("<div"))) {
      e.preventDefault();
      const cleaned = cleanMalformedHeadings(sanitizePastedHtml(html));
      document.execCommand("insertHTML", false, cleaned);
      triggerChange();
      return;
    }

    // Case 3: Regular text with multiple paragraphs
    if (text && text.includes("\n")) {
      e.preventDefault();
      const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const htmlToInsert = lines.map((l) => `<p>${l}</p>`).join("");
      document.execCommand("insertHTML", false, htmlToInsert || `<p>${text}</p>`);
      triggerChange();
    }
  };

  return (
    <div className="rounded-2xl border border-ink-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-blue/30 focus-within:border-brand-blue transition-all overflow-hidden">
      {/* ── BLOGGER / MEDIUM STYLE TOOLBAR ── */}
      <div className="bg-[#f8f9fa] border-b border-ink-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none sticky top-0 z-20">
        <div className="flex flex-wrap items-center gap-1">
          {/* Mode Switcher: Compose (Visual) vs HTML Mode */}
          <div className="flex items-center bg-ink-200/60 p-0.5 rounded-lg mr-1.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setViewMode("compose")}
              title="Compose View (Visual WYSIWYG)"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === "compose"
                  ? "bg-white text-brand-blue shadow-xs"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <PenTool className="h-3.5 w-3.5" />
              <span>Compose</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setViewMode("html")}
              title="HTML Code View"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === "html"
                  ? "bg-white text-brand-blue shadow-xs"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>HTML</span>
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Undo / Redo */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec("undo")}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec("redo")}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Block Formatting Selector: Normal, Heading 1 (H2), Heading 2 (H3) */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => convertBlockTo("p")}
              title="Normal Body Text (Converts current paragraph to regular unbolded text)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-ink-200/80 text-ink-700 text-xs font-medium hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
            >
              <Type className="h-3.5 w-3.5 text-brand-blue" />
              <span>Normal</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => convertBlockTo("h2")}
              title="Heading 1 (Main Section Title)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200/80 text-ink-800 text-xs font-bold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
            >
              <Heading1 className="h-3.5 w-3.5 text-brand-blue" />
              <span>Heading</span>
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => convertBlockTo("h3")}
              title="Heading 2 (Subheading)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-ink-200/80 text-ink-800 text-xs font-semibold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all shadow-xs"
            >
              <Heading2 className="h-3.5 w-3.5 text-brand-blue" />
              <span>Subhead</span>
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Inline Styles: Bold, Italic, Underline, Strikethrough */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("bold")}
              title="Bold (Ctrl+B)"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors font-bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("italic")}
              title="Italic (Ctrl+I)"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("underline")}
              title="Underline (Ctrl+U)"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Underline className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("strikeThrough")}
              title="Strikethrough"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Strikethrough className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Lists: Bullets & Numbers */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("insertUnorderedList")}
              title="Bulleted List"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-emerald-600 transition-colors"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("insertOrderedList")}
              title="Numbered List"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-indigo-600 transition-colors"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Blockquote, Divider, Link */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("formatBlock", "<blockquote>")}
              title="Quote Callout"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-amber-600 transition-colors"
            >
              <Quote className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("insertHorizontalRule")}
              title="Horizontal Divider"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleInsertLink}
              title="Insert Link"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-brand-blue transition-colors"
            >
              <Link2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("unlink")}
              title="Remove Link"
              className="p-1.5 rounded-lg text-ink-800 hover:bg-ink-200 hover:text-red-600 transition-colors"
            >
              <Unlink2 className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Alignments */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("justifyLeft")}
              title="Align Left"
              className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("justifyCenter")}
              title="Align Center"
              className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec("justifyRight")}
              title="Align Right"
              className="p-1.5 rounded-lg text-ink-700 hover:bg-ink-200 hover:text-ink-900 transition-colors"
            >
              <AlignRight className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-ink-200 mx-1 hidden sm:block" />

          {/* Clear Formatting */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearFormatting}
            title="Clear Formatting (Resets to clean normal text)"
            className="p-1.5 rounded-lg text-ink-500 hover:bg-ink-200 hover:text-red-600 transition-colors"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── EDITOR BODY ── */}
      {viewMode === "compose" ? (
        /* Visual Medium/Blogger Style Canvas */
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={triggerChange}
          onBlur={triggerChange}
          onPaste={handlePaste}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className="w-full bg-white p-6 sm:p-10 text-ink-800 font-body text-base leading-relaxed focus:outline-none overflow-y-auto cursor-text
            [&_h2]:font-heading [&_h2]:font-black [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:text-ink-900 [&_h2]:mt-8 [&_h2]:mb-3.5 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-ink-100 first:[&_h2]:border-t-0 first:[&_h2]:mt-0
            [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:text-ink-900 [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:font-body [&_p]:font-normal [&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-ink-700 [&_p]:mb-5
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-5 [&_ul]:text-ink-700 [&_ul]:text-base
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-5 [&_ol]:text-ink-700 [&_ol]:text-base
            [&_li]:leading-relaxed [&_li]:pl-1
            [&_blockquote]:p-5 [&_blockquote]:rounded-2xl [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-brand-blue/5 [&_blockquote]:to-transparent [&_blockquote]:border-l-4 [&_blockquote]:border-brand-blue [&_blockquote]:text-ink-800 [&_blockquote]:italic [&_blockquote]:text-base [&_blockquote]:my-6
            [&_hr]:my-8 [&_hr]:border-ink-200
            [&_strong]:font-bold [&_strong]:text-ink-900
            [&_b]:font-bold [&_b]:text-ink-900
            [&_a]:text-brand-blue [&_a]:underline [&_a]:font-semibold
            empty:before:content-[attr(data-placeholder)] empty:before:text-ink-300 empty:before:pointer-events-none"
        />
      ) : (
        /* Raw HTML / Code View (Blogger style) */
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            updateStats(e.target.value);
          }}
          style={{ minHeight }}
          placeholder="Paste or write raw HTML code here..."
          className="w-full bg-[#1e293b] text-emerald-400 p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y selection:bg-brand-blue/40"
        />
      )}

      {/* ── BOTTOM METRICS & STATUS BAR (MEDIUM STYLE) ── */}
      <div className="bg-[#f8f9fa] border-t border-ink-200 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] font-medium text-ink-500">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-ink-800 font-semibold">{wordCount}</strong> words
          </span>
          <span>•</span>
          <span>
            <strong className="text-ink-800 font-semibold">{charCount}</strong> characters
          </span>
          <span>•</span>
          <span>
            <strong className="text-ink-800 font-semibold">~{readTimeMinutes}</strong> min read
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-ink-400">
          <span>Highlight text to apply formatting</span>
          <span>•</span>
          <kbd className="px-1.5 py-0.5 rounded bg-ink-200/60 text-ink-700 text-[10px] font-mono">Ctrl+B</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-ink-200/60 text-ink-700 text-[10px] font-mono">Ctrl+I</kbd>
        </div>
      </div>
    </div>
  );
}
