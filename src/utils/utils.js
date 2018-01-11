// TODO: Clean up
export function formatDate(date) {
  return `Kl. ${date.getHours()}:${date.getMinutes()}, ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}
