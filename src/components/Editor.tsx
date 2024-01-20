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
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from "remirror/extensions";

import {
  useRemirror,
  Remirror,
  MarkdownToolbar,
  ThemeProvider,
  CreateTableButton,
  CommandButton,
} from "@remirror/react";
import { useState } from "react";

export const MDEditor = ({} = {}) => {
  const markdown = useRemirror({
    extensions,
    stringHandler: "markdown",
    content: basicContent,
  });

  const [val, setVal] = useState(markdown.state);

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

  return (
    <div className="editor">
      <h3 className="tip no-print">Markdown Editor</h3>
      <ThemeProvider>
        <Remirror
          manager={markdown.manager}
          placeholder="Start typing..."
          autoRender="end"
          initialContent={markdown.state}
          onChange={({ helpers, state }) => {
            const text = helpers.getText({ state });
            setVal(text);
          }}
        >
          <div className="toolbox no-print">
            <MarkdownToolbar />
            <CommandButton
              commandName={"export"}
              title="Export"
              onSelect={onExport}
              icon={"upload2Fill"}
              enabled={true}
            />
          </div>
        </Remirror>
      </ThemeProvider>
    </div>
  );
};

const extensions = () => [
  new LinkExtension({ autoLink: true }),
  new BoldExtension(),
  new StrikeExtension(),
  new ItalicExtension(),
  new HeadingExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension(),
  new ListItemExtension({
    priority: ExtensionPriority.High,
    enableCollapsible: true,
  }),
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

const basicContent = `
**Markdown** content is the _best_

<br>

# Heading 1

<br>

## Heading 2

<br>

### Heading 3

<br>

#### Heading 4

<br>

##### Heading 5

<br>

###### Heading 6

<br>

> Blockquote

\`\`\`ts
const a = 'asdf';
\`\`\`

playtime is just beginning

## List support

- an unordered
  - list is a thing
    - of beauty

1. As is
2. An ordered
3. List
`;

export default MDEditor;
