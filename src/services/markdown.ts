import { type Plugin, Renderer } from "@libs/markdown";
import { gfm } from "@libs/markdown/plugins";
import { parse } from "@std/yaml";
import { visit } from "unist-util-visit";

const classMap: Record<string, string> = {
  "heading[depth=1]": "text-4xl font-bold py-4 pt-8",
  "heading[depth=2]": "text-2xl font-bold py-2 pt-6",
  "heading[depth=3]": "text-xl font-bold py-2 pt-4",
  blockquote: "border-l-4 border-gray-300 pl-4 py-2",
  paragraph: "py-1",
  link: "text-pink-400",
  list: "list-disc pl-4 py-1",
};

const tailwindThemePlugin: Plugin = {
  remark(processor, _renderer) {
    function findNodeClassname(node: any) {
      let className = classMap[node.type];
      if (className) {
        return className;
      }

      const key = `${node.type}[depth=${node.depth}]`;
      className = classMap[key];
      if (className) {
        return className;
      }
    }

    const customProcessor = processor.use(function () {
      return function (tree) {
        visit(tree, (node) => {
          const className = findNodeClassname(node);
          if (!className) return;

          node.data ??= {};
          node.data = {
            ...node.data,
            hProperties: {
              class: className.split(" "),
            },
          };
        });

        return tree;
      };
    });

    return customProcessor;
  },
};

export function markdownMetadata(md: string) {
  const [_, metadataString] = md.split("---");
  return parse(metadataString) as any;
}

export function markdownToHTML(md: string) {
  const markdownParser = new Renderer({
    plugins: [gfm, tailwindThemePlugin],
  });

  // parse
  return markdownParser.render(md);
}
