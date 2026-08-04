/**
 * 🌸 ThemeEngine
 * Controls dynamic background gradients, ambient lighting, particle modes, and glass styles.
 */
export class ThemeEngine {
  resolve(date, activeFestival, themesData) {
    if (!themesData) return null;

    // Check Festival Override first
    if (activeFestival && activeFestival.themeOverride && themesData.overrides[activeFestival.themeOverride]) {
      return themesData.overrides[activeFestival.themeOverride];
    }

    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
      return themesData.morning;
    } else if (hours >= 12 && hours < 17) {
      return themesData.afternoon;
    } else if (hours >= 17 && hours < 20) {
      return themesData.evening;
    } else {
      return themesData.night;
    }
  }
}
