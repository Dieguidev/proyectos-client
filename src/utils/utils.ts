export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("es-Es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  return formatter.format(date);

}
