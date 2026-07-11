/**
 * Serialises the Notion blocks returned by `notesApi.getNote` into plain Markdown.
 *
 * The blocks arrive already grouped — consecutive list items are folded into
 * `bulleted_list` / `numbered_list` wrappers by `getPageContent` — so this walks
 * that shape rather than the raw Notion response.
 */

type RichText = {
  plain_text: string;
  href: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  };
};

const renderRichText = (richText: RichText[] = []): string =>
  richText
    .map(({ plain_text, href, annotations }) => {
      let text = plain_text;

      // Code first: Markdown emphasis is not parsed inside a code span anyway.
      if (annotations?.code) text = `\`${text}\``;
      if (annotations?.bold) text = `**${text}**`;
      if (annotations?.italic) text = `_${text}_`;
      if (annotations?.strikethrough) text = `~~${text}~~`;
      if (href) text = `[${text}](${href})`;

      return text;
    })
    .join('');

const fileUrl = (value: any): string =>
  value?.type === 'external' ? value.external.url : (value?.file?.url ?? '');

const renderBlock = (block: any, depth = 0): string => {
  const value = block[block.type];
  const indent = '  '.repeat(depth);

  switch (block.type) {
    case 'paragraph':
      return renderRichText(value.rich_text);

    case 'heading_1':
      return `## ${renderRichText(value.rich_text)}`;
    case 'heading_2':
      return `### ${renderRichText(value.rich_text)}`;
    case 'heading_3':
      return `#### ${renderRichText(value.rich_text)}`;

    case 'bulleted_list':
    case 'numbered_list':
      return value.children
        .map((child: any, index: number) => {
          const marker = block.type === 'numbered_list' ? `${index + 1}.` : '-';
          const item = renderRichText(child[child.type].rich_text);
          const nested = child[child.type].children
            ?.map((grandchild: any) => renderBlock(grandchild, depth + 1))
            .filter(Boolean)
            .join('\n');

          return `${indent}${marker} ${item}${nested ? `\n${nested}` : ''}`;
        })
        .join('\n');

    case 'to_do':
      return `${indent}- [${value.checked ? 'x' : ' '}] ${renderRichText(value.rich_text)}`;

    case 'toggle':
      return [
        renderRichText(value.rich_text),
        ...(value.children ?? []).map((child: any) => renderBlock(child, depth)),
      ]
        .filter(Boolean)
        .join('\n\n');

    case 'quote':
      return `> ${renderRichText(value.rich_text)}`;

    case 'code':
      return `\`\`\`${value.language ?? ''}\n${renderRichText(value.rich_text)}\n\`\`\``;

    case 'divider':
      return '---';

    case 'image': {
      const caption = renderRichText(value.caption);
      return `![${caption}](${fileUrl(value)})`;
    }

    case 'file':
    case 'pdf':
    case 'video': {
      const caption = renderRichText(value.caption) || block.type;
      return `[${caption}](${fileUrl(value)})`;
    }

    case 'bookmark':
    case 'embed':
    case 'link_preview':
      return `[${value.url}](${value.url})`;

    case 'callout':
      return `> ${renderRichText(value.rich_text)}`;

    case 'equation':
      return `$$${value.expression}$$`;

    case 'child_page':
      return `### ${value.title}`;

    // Structural or unrenderable blocks contribute nothing to the text.
    default:
      return '';
  }
};

export const notionBlocksToMarkdown = (blocks: any[]): string =>
  blocks
    .map((block) => renderBlock(block))
    .filter((text) => text.trim().length > 0)
    .join('\n\n');
