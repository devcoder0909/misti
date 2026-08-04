/**
 * 🌸 GreetingEngine
 * Always delivers a warm, comforting "Good Morning, Misti" (or festival greeting override).
 * Strictly morning time focus as requested.
 */
export class GreetingEngine {
  resolve(date, activeFestival, greetingsData) {
    if (activeFestival && activeFestival.greetingOverride) {
      return activeFestival.greetingOverride;
    }

    if (greetingsData && greetingsData.morning && greetingsData.morning.length > 0) {
      const seed = date.getDate() % greetingsData.morning.length;
      return greetingsData.morning[seed];
    }

    return "Good Morning, Misti 🌸";
  }
}
