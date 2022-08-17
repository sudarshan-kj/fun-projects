import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import Linkify from "react-linkify";
import Autolinker from "autolinker";
import { SecureLink } from "react-secure-link";
import styles from "./InputWithLinkHighlight.module.css";

const replaceFn = (match) => {
  switch (match.getType()) {
    case "url":
      return `<a target='_blank' rel='noopener noreferrer' contentEditable='false' href='${match.getAnchorHref()}'>${match.getAnchorText()}</a> `;
  }
};

const InputWithLinkHighlight = ({ initValue }) => {
  const [, setValue] = useState(``);
  const inputRef = useRef(
    Autolinker.link(initValue, {
      replaceFn,
    })
  );

  const handleChange = (e) => {
    inputRef.current = e.target.value;
  };

  const addLinks = () => {
    const linkedText = Autolinker.link(inputRef.current, {
      replaceFn,
    });
    const sanitizedHtml = sanitizeHtml(linkedText, sanitizeConf);
    inputRef.current = sanitizedHtml;
    setValue(sanitizeHtml(linkedText, sanitizeConf));
  };
  const sanitizeConf = {
    allowedTags: ["a"],
    allowedAttributes: { a: ["href", "target", "contenteditable", "rel"] },
  };

  return (
    <div>
      <h2>Input box with Link Highlight</h2>
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <SecureLink href={decoratedHref} key={key}>
            {decoratedText}
          </SecureLink>
        )}
      >
        <p> Here is a link that will open securely in a new tab: github.com</p>
      </Linkify>
      <ContentEditable
        className={styles.input}
        tagName="div"
        html={inputRef.current}
        onBlur={addLinks}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputWithLinkHighlight;
