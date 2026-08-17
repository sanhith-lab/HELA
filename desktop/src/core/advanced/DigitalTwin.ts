export interface UserPreferences {
  preferredVoiceLanguage: "en-US" | "te-IN";
  preferredTone: "executive" | "concise" | "detailed";
  autoApproveTyping: boolean;
}

export class DigitalTwin {
  private preferences: UserPreferences = {
    preferredVoiceLanguage: "en-US",
    preferredTone: "executive",
    autoApproveTyping: false,
  };

  getPreferences() {
    return this.preferences;
  }

  updatePreference<K extends keyof UserPreferences>(key: K, val: UserPreferences[K]) {
    this.preferences[key] = val;
    console.log(`[DigitalTwin] Updated preference ${key} =>`, val);
  }
}

export const digitalTwin = new DigitalTwin();
