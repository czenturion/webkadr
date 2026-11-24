export const buttonShape =
  "inline-flex min-h-12 items-center justify-center px-6 leading-none font-medium whitespace-nowrap";

const press =
  "transition-[background-color,translate] duration-200 ease-out focus-visible:outline-offset-3 active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0";

export const buttonPrimary = `${buttonShape} ${press} bg-accent text-accent-foreground hover:bg-accent-strong`;
