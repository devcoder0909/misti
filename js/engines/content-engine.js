/**
 * 🌸 ContentEngine
 * Deterministic selector based on date hash, weekday, and active festival. Zero randomness.
 */
export class ContentEngine {
  getSeed(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return y * 10000 + m * 100 + d;
  }

  select(date, activeFestival, thoughts, guidance) {
    const seed = this.getSeed(date);

    let filteredThoughts = thoughts;
    let filteredGuidance = guidance;

    // Festival filter if present
    if (activeFestival) {
      const festThoughts = thoughts.filter(t => t.festival === activeFestival.name);
      if (festThoughts.length > 0) filteredThoughts = festThoughts;

      const festGuidance = guidance.filter(g => g.festival === activeFestival.name);
      if (festGuidance.length > 0) filteredGuidance = festGuidance;
    }

    const thoughtIndex = seed % filteredThoughts.length;
    const guidanceIndex = (seed + 3) % filteredGuidance.length;

    return {
      thought: filteredThoughts[thoughtIndex],
      guidance: filteredGuidance[guidanceIndex]
    };
  }
}
