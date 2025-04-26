// see https://marked.js.org/using_pro#renderer
import { Marked, type Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import katex from "katex";
import DOMPurify from "dompurify";
import hljs from 'highlight.js';
// import hljs from '@/plugins/utils/highlight.js'
/*
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/vs2015.css";
import "highlight.js/styles/stackoverflow-dark.css";
import "highlight.js/styles/night-owl.css";
*/
const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );
const renderer = new marked.Renderer();

let titles: string[] = [];
let codeBlockId = 0;
/**
 * 代码块与数学公式
 * @param {*} code
 * @param {*} lang
 * @param {*} isEscaped
 * @returns
 */
renderer.code = function ({ text, lang, escaped }: Tokens.Code): string {
    switch ((lang = lang ? lang.toLocaleLowerCase().trim() : "")) {
        case "math":
        case "latex":
        case "katex":
            try {
                const math = katex.renderToString(text, { displayMode: true });
                if (math) return math;
            } catch (error) {
                console.warn(error);
            }
            break;
    }
    const id = `code-${++codeBlockId}`;
    const langClass = "js";
    // const langClass = this.options.langPrefix + lang;
    // if (this.options.highlight)
    //     code = this.options.highlight(code, lang) || code;
    return `
    <pre class="hljs ${langClass}">
      <div class="code-options"><i data-copy="${id}" class="code-content-copy" aria-hidden="true"></i></div>
      <div class="code-wrap"><code class="${langClass}" id="${id}">${text}</code></div>
    </pre>\n`;
};

/**
 * 内联代码与数学公式
 * @param {*} text
 * @returns
 */
const rendererCodespan = renderer.codespan;
renderer.codespan = function ({ text }: Tokens.Codespan) {
    try {
        return (
            mathsExpression(text) ||
            rendererCodespan({ text } as Tokens.Codespan)
        );
    } catch (error) {
        console.warn(error);
    }
    return rendererCodespan({ text } as Tokens.Codespan);
};

/**
 * 表格
 * @param {*} header
 * @param {*} body
 * @returns
 */
// const rendererTable = renderer.table
// renderer.table = function (table: Tokens.Table) {
    // return `<div class="md-table">${rendererTable(table)}</div>`;
    // return rendererTable(table);
    // if (raw) raw = `<tbody>${raw}</tbody>`;
    // return `<div class="table-wrap">\n<table>\n<thead>\n${table.header}</thead>\n${raw}</table>\n</div>\n`;
// };
/*
renderer.image = function (href, title, text) { 
  console.log();
  return `<div colorify-container><img src="${href}" alt="${text}" colorify /></div>`
}*/

/**
 * 标题
 * @param {*} text
 * @param {*} level
 * @param {*} raw
 * @param {*} slugger
 * @returns
 */
// renderer.heading = function (text, level, raw, slugger) {
//   renderer.heading = function (heading: Tokens.Heading) {
//     const id = slugger.slug("md-title");
//     titles.push({ id, level, title: raw });
//     return `<h${level} id="${id}">\n${raw}\n</h${level}>\n`;
// };
/**
 * 数学表达式解析
 * @param {*} expr
 * @returns
 */
function mathsExpression(expr: string) {
    if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
        expr = expr.substring(2, expr.length - 4);
        return katex.renderToString(expr, { displayMode: true });
    } else if (expr.match(/^\$[\s\S]*\$$/)) {
        expr = expr.substring(1, expr.length - 2);
        return katex.renderToString(expr, { displayMode: false });
    }
}

marked.setOptions({
    renderer,
    // highlight: (code) => hljs.highlightAuto(code).value,
    pedantic: false,
    gfm: true,
    // tables: true,
    breaks: false,
    // sanitize: false,
    // smartLists: true,
    // smartypants: false,
    // xhtml: false,
});
/**
 * 重置状态
 */
function reset() {
    titles = [];
    codeBlockId = 0;
}
/**
 * 解析 Markdown 到 HTML
 * @param {*} markdown
 * @returns
 */
function markdown(markdown: string): HtmlMarkdown {
    reset();
    return {
        html: DOMPurify.sanitize(marked.parse(markdown).toString()),
        titles,
    };
}
export interface HtmlMarkdown {
    html: string;
    titles: string[];
}
export function useMarkdown(md: string): HtmlMarkdown {
    return markdown(md);
}
/**
 * 属性注入
 */
// export default ({ app }, inject) => {
//   inject('markdown', md => markdown(md))
// }
// export default defineNuxtPlugin((nuxtApp) => {
//     return {
//         provide: {
//             markdown: (md: string) => markdown(md),
//         },
//     };
// });
