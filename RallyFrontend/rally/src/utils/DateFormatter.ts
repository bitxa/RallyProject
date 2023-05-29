export function formatDate(date: Date): Date {
  return new Date(
    date.toLocaleDateString("es-ES", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
}
