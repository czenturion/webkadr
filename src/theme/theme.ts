export const themeStorageKey = "theme";

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(themeStorageKey);

    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

export const applyTheme = () => {
  const system = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  document.documentElement.dataset.theme = readStoredTheme() ?? system;
};
