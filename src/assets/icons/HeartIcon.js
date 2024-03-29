import * as React from "react";

function HeartIcon({ className }) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" className={className}>
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  );
}

export { HeartIcon };
