import { buttonShape } from "./button";

export const card =
  "group relative isolate grid grid-rows-subgrid gap-y-6 p-6 after:absolute after:inset-0 after:-z-10 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out motion-reduce:after:transition-none sm:p-10 sm:hover:after:opacity-100 sm:has-[a:focus-visible]:after:opacity-100";
export const cardBase = "bg-surface after:bg-surface-hover";
export const cardFeatured = "bg-surface-2 after:bg-surface-2-hover";
export const cardTitle =
  "text-[1.5625rem] leading-[1.2] font-light font-stretch-expanded";

const action = `${buttonShape} relative isolate self-end before:absolute before:inset-0 before:-z-10 before:origin-left before:outline-offset-3 before:transition-[scale,background-color] before:duration-300 before:ease-out focus-visible:outline-none focus-visible:before:outline-2 focus-visible:before:outline-focus motion-reduce:before:transition-none max-sm:w-full sm:justify-self-start sm:group-hover:before:scale-x-110 sm:group-has-[a:focus-visible]:before:scale-x-110`;

export const actionText =
  "transition-[translate] duration-300 ease-out motion-reduce:transition-none sm:group-hover:translate-x-[calc(5%+0.15rem)] sm:group-has-[a:focus-visible]:translate-x-[calc(5%+0.15rem)]";
export const actionPrimary = `${action} text-accent-foreground before:bg-accent hover:before:bg-accent-strong`;
export const actionSecondary = `${action} text-foreground before:border before:border-border-strong hover:before:bg-surface-2`;
