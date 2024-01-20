import md from "refractor/lang/markdown.js";
import clike from "refractor/lang/clike.js";
import c from "refractor/lang/c.js";
import cpp from "refractor/lang/cpp.js";
import arduino from "refractor/lang/arduino.js";
import bash from "refractor/lang/bash.js";
import csharp from "refractor/lang/csharp.js";
import markup from "refractor/lang/markup.js";
import css from "refractor/lang/css.js";
import diff from "refractor/lang/diff.js";
import go from "refractor/lang/go.js";
import ini from "refractor/lang/ini.js";
import java from "refractor/lang/java.js";
import regex from "refractor/lang/regex.js";
import javascript from "refractor/lang/javascript.js";
import json from "refractor/lang/json.js";
import kotlin from "refractor/lang/kotlin.js";
import less from "refractor/lang/less.js";
import lua from "refractor/lang/lua.js";
import makefile from "refractor/lang/makefile.js";
import yaml from "refractor/lang/yaml.js";
import objectivec from "refractor/lang/objectivec.js";
import perl from "refractor/lang/perl.js";
import php from "refractor/lang/php.js";
import python from "refractor/lang/python.js";
import r from "refractor/lang/r.js";
import ruby from "refractor/lang/ruby.js";
import rust from "refractor/lang/rust.js";
import sass from "refractor/lang/sass.js";
import scss from "refractor/lang/scss.js";
import sql from "refractor/lang/sql.js";
import swift from "refractor/lang/swift.js";
import typescript from "refractor/lang/typescript.js";
import basic from "refractor/lang/basic.js";
import vbnet from "refractor/lang/vbnet.js";

import data from "svgmoji/emoji.json";
import { cx } from "remirror";

import { CodeBlockLanguageSelect } from "@remirror/extension-react-language-select";
import { ExtensionCodeBlockTheme } from "@remirror/theme";

import {
  TableComponents,
  TableExtension,
} from "@remirror/extension-react-tables";

import { ExtensionPriority } from "remirror";
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  UnderlineExtension,
  StrikeExtension,
  TrailingNodeExtension,
  EmojiExtension,
  HorizontalRuleExtension,
  ImageExtension,
  TOP_50_TLDS,
} from "remirror/extensions";
import tlds from "tlds";
import {
  useRemirror,
  Remirror,
  MarkdownToolbar,
  ThemeProvider,
  CommandButton,
  useHelpers,
  useKeymap,
  EmojiPopupComponent,
  CreateTableButton,
} from "@remirror/react";
import { Suspense, useCallback, useEffect, useState } from "react";

export const MDEditor = ({} = {}) => {
  const [val, setVal] = useState<any>("");

  const markdown = useRemirror({
    extensions,
    content: val,
    stringHandler: "markdown",
  });

  useEffect(() => {
    const stored = localStorage.getItem("content");
    if (stored) {
      setVal(stored);
      markdown.manager.view.updateState(
        markdown.manager.createState({ content: JSON.parse(stored) })
      );
    }
  }, []);

  const onExport = () => {
    let candidateTitle = "";
    const previewEl = document.querySelector(".remirror-editor");
    const candidateTitleEl = previewEl?.querySelector("h1");
    if (candidateTitleEl) {
      candidateTitle = candidateTitleEl.innerText;

      const currentTitle = document.title;
      document.title = candidateTitle;
      window.requestAnimationFrame(() => {
        document.title = currentTitle;
      });
    }
    window.print();
  };

  const hooks = [
    () => {
      const { getMarkdown } = useHelpers();

      const handleSaveShortcut = useCallback(
        ({ state }: { state: any }) => {
          console.log(`Save to backend`);
          localStorage.setItem("content", JSON.stringify(getMarkdown(state)));

          return true; // Prevents any further key handlers from being run.
        },
        [getMarkdown]
      );

      useKeymap("Mod-s", handleSaveShortcut);
    },
  ];

  return (
    <Suspense fallback={<Fallback />}>
      <div className="editor">
        <h3 className="tip no-print">Markdown Editor</h3>
        <ThemeProvider>
          <Remirror
            hooks={hooks}
            manager={markdown.manager}
            placeholder="Start typing..."
            autoFocus
            autoRender="end"
            initialContent={markdown.state}
            onChange={({ helpers, state }) => {
              setVal(helpers.getMarkdown(state));
            }}
          >
            <TableComponents />
            <div className="toolbox no-print">
              <MarkdownToolbar />

              <CreateTableButton />
              <CommandButton
                commandName={"export"}
                title="Export"
                onSelect={onExport}
                icon={"upload2Fill"}
                enabled={true}
              />
            </div>
            <EmojiPopupComponent />
            <CodeBlockLanguageSelect
              offset={{ x: 5, y: 5 }}
              className={cx(
                ExtensionCodeBlockTheme.LANGUAGE_SELECT_POSITIONER,
                ExtensionCodeBlockTheme.LANGUAGE_SELECT_WIDTH
              )}
            />
          </Remirror>
        </ThemeProvider>
      </div>
    </Suspense>
  );
};

const extensions = () => [
  new LinkExtension({
    autoLink: true,
    autoLinkAllowedTLDs: [
      ...TOP_50_TLDS,
      ...tlds,
      "dev",
      "id",
      "london",
      "tech",
    ],
    defaultProtocol: "https",
  }),
  new BoldExtension(),
  new StrikeExtension(),
  new ImageExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension(),
  new TableExtension(),
  new ListItemExtension({
    priority: ExtensionPriority.High,
    enableCollapsible: true,
  }),
  new UnderlineExtension(),
  new EmojiExtension({
    // @ts-expect-error
    data,
    moji: "noto",
    identifier: "emoji",
    plainText: true,
  }),
  new HorizontalRuleExtension(),
  new CodeExtension(),
  new CodeBlockExtension({
    defaultLanguage: "markdown",
    supportedLanguages: [
      clike,
      arduino,
      bash,
      csharp,
      markup,
      css,
      diff,
      go,
      ini,
      regex,
      json,
      kotlin,
      less,
      lua,
      makefile,
      yaml,
      objectivec,
      md,
      python,
      php,
      r,
      ruby,
      rust,
      sass,
      scss,
      sql,
      swift,
      basic,
      vbnet,
      perl,
      cpp,
      c,
      javascript,
      typescript,
      java,
    ],
    syntaxTheme: "base16_ateliersulphurpool_light",
    defaultWrap: true,
  }),
  new TrailingNodeExtension(),
  new TableExtension(),
  new MarkdownExtension({ copyAsMarkdown: false }),
  new HardBreakExtension(),
];

export default MDEditor;

const Fallback = () => (
  <div className="editor">
    <h1 style={{ color: "white" }}>Loading</h1>
  </div>
);
