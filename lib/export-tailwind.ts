export function toTailwindTheme(colors: string[]) {
  const [primary, secondary, accent, surface, text] = colors;
  return `// tailwind.config.ts
theme:{extend:{colors:{
  primary:"${primary}", secondary:"${secondary}", accent:"${accent}",
  surface:"${surface}", text:"${text}"
}}}`;
}
