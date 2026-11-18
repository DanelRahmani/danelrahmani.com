import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  value: any;
  renderText: (items: any[]) => ReactNode;
};

const plain = (cell: any[]) => (cell ?? []).map((item: any) => item.plain_text).join('').trim();

// A column reads as numeric when every body cell is empty, a number, an
// amount or a percentage ("$143.78", "-13%", "n/a", "not applicable"), so it can be right-aligned.
const NUMERIC = /^(not applicable|n\/?a|n\.a\.|-|[+-−]?[$€£¥]?\s?[+-−]?[\d.,]+\s?(%|x|×|[kmb]n?)?)$/i;

/**
 * A Notion simple table. Its rows arrive as `children` (table_row blocks),
 * fetched by notesApi like any block with children. Honours the column and
 * row header switches, right-aligns numeric columns with tabular figures,
 * and scrolls sideways on a phone instead of pushing the page wider.
 */
export const NotionTable = ({ value, renderText }: Props) => {
  const rows: any[][] = (value.children ?? [])
    .filter((row: any) => row.type === 'table_row')
    .map((row: any) => row.table_row.cells);
  if (rows.length === 0) return null;

  const head = value.has_column_header ? rows[0] : null;
  const body = value.has_column_header ? rows.slice(1) : rows;
  const width = value.table_width ?? rows[0].length;

  const numeric = Array.from({ length: width }, (_, column) => {
    const cells = body.map((row) => plain(row[column])).filter(Boolean);
    return cells.length > 0 && cells.every((text) => NUMERIC.test(text));
  });

  return (
    <div className="not-prose my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {head && (
          <thead>
            <tr className="border-b border-primary/30 dark:border-dark-accent/40">
              {head.map((cell, column) => (
                <th
                  key={column}
                  scope="col"
                  className={clsx(
                    'whitespace-nowrap py-2 pr-6 font-mono text-xs font-normal text-stone-600 last:pr-0 dark:text-stone-400',
                    numeric[column] ? 'text-right' : 'text-left',
                  )}
                >
                  {renderText(cell)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((row, index) => (
            <tr
              key={index}
              className="border-b border-dashed border-primary/20 last:border-b-0 dark:border-dark-accent/25"
            >
              {row.map((cell, column) => {
                const Cell = value.has_row_header && column === 0 ? 'th' : 'td';
                return (
                  <Cell
                    key={column}
                    {...(Cell === 'th' ? { scope: 'row' } : {})}
                    className={clsx(
                      'py-2.5 pr-6 align-baseline text-stone-800 last:pr-0 dark:text-stone-200',
                      numeric[column] ? 'text-right font-mono tabular-nums' : 'text-left',
                      Cell === 'th' && 'font-medium',
                    )}
                  >
                    {renderText(cell)}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
