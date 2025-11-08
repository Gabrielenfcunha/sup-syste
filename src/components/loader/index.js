import React from "react";

import css from './loader.module.scss';

export function Loader (props) {
  return (
    <div
      className={css['loader']}
      data-active={props.active}
    />
  );
}

