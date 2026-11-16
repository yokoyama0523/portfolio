import { Fragment } from "react";
import type { Word } from "../content/studio";

export function Words({ words, wrap = false }: { words: Word[]; wrap?: boolean }) {
  return words.map((word, i) => {
    const text = word.italic ? <i className="serif">{word.text}</i> : word.text;
    return (
      <Fragment key={word.text}>
        {i > 0 && " "}
        {wrap ? (
          <span className="w">
            <span>{text}</span>
          </span>
        ) : (
          text
        )}
      </Fragment>
    );
  });
}
