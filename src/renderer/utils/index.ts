interface styleObjectProps {
  [key: string]: string;
}

export const setThemeColor = (styleObject: styleObjectProps) => {
  const docStyle = document.documentElement.style;

  for (const key in styleObject) {
    docStyle.setProperty(key, styleObject[key]);
  }
};
