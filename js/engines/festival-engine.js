/**
 * 🌸 FestivalEngine
 * Automatic calendar event & festival detection.
 */
export class FestivalEngine {
  detect(date, festivalsList) {
    if (!festivalsList || !Array.isArray(festivalsList)) return null;

    const month = date.getMonth() + 1; // 1-indexed
    const day = date.getDate();

    return festivalsList.find(f => f.month === month && f.day === day) || null;
  }
}
