/**
 * 🌸 IllustrationEngine
 * Resolves multi-layered SVG divine vector art (Lord Jagannath, Lord Hanuman, Temple Silhouette, Sacred Lotus).
 */
export class IllustrationEngine {
  resolve(activeFestival, illustrationsData) {
    if (!illustrationsData) return null;

    if (activeFestival) {
      if (activeFestival.name === "Rath Yatra" || activeFestival.name === "Snana Purnima") {
        return illustrationsData.jagannath;
      }
      if (activeFestival.name === "Hanuman Jayanti") {
        return illustrationsData.hanuman;
      }
    }

    // Default rotation if no specific festival
    const keyOrder = ['jagannath', 'hanuman', 'temple', 'lotus'];
    const day = new Date().getDate();
    const key = keyOrder[day % keyOrder.length];
    return illustrationsData[key] || illustrationsData.jagannath;
  }
}
