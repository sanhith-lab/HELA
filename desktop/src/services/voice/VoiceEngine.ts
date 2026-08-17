import { useAppStore } from "../../store/appStore";
import { helaCore } from "../../core/HelaCore";

export class VoiceEngine {
  private isListening = false;
  private recognition: unknown = null;
  private currentLanguage = "en-US"; // Supports 'en-US' and 'te-IN' (Telugu)
  private wakeWords = ["hela", "hey hela", "hi hela"];

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as unknown as Record<string, unknown>).SpeechRecognition ||
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition;

      if (SpeechRecognition) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rec = new (SpeechRecognition as any)();
        rec.continuous = true;
        rec.interimResults = false;
        rec.lang = this.currentLanguage;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rec.onresult = (event: any) => {
          const lastResult = event.results[event.results.length - 1];
          if (lastResult && lastResult[0]) {
            const transcript = lastResult[0].transcript.trim();
            console.log("[VoiceEngine] Heard:", transcript);
            this.handleTranscript(transcript);
          }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rec.onerror = (err: any) => {
          console.warn("[VoiceEngine] Error:", err);
          this.stopListening();
        };

        rec.onend = () => {
          if (this.isListening) {
            rec.start();
          }
        };

        this.recognition = rec;
      }
    }
  }

  setLanguage(lang: "en-US" | "te-IN") {
    this.currentLanguage = lang;
    if (this.recognition) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.recognition as any).lang = lang;
    }
    console.log("[VoiceEngine] Language set to:", lang);
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    const store = useAppStore.getState();
    this.isListening = true;
    store.setHelaState("listening");

    if (this.recognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.recognition as any).start();
      } catch {
        // Already started
      }
    }
    console.log("[VoiceEngine] Started listening for wake word 'HELA'...");
  }

  stopListening() {
    const store = useAppStore.getState();
    this.isListening = false;
    store.setHelaState("idle");

    if (this.recognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.recognition as any).stop();
      } catch {
        // Ignore
      }
    }
    console.log("[VoiceEngine] Stopped listening.");
  }

  private handleTranscript(transcript: string) {
    const lower = transcript.toLowerCase();
    const store = useAppStore.getState();

    // Check for wake word or direct command
    const isWake = this.wakeWords.some((w) => lower.includes(w));
    const commandText = isWake
      ? lower.replace(/hey hela|hi hela|hela/gi, "").trim()
      : lower;

    if (commandText.length > 0) {
      store.setHelaState("thinking");
      this.speakText(`Processing command: ${commandText}`);

      helaCore
        .execute({ command: commandText, source: "voice" })
        .then((res) => {
          this.speakText(res.message);
        });
    }
  }

  speakText(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);

      // Select natural female voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        (v) =>
          v.name.includes("Female") ||
          v.name.includes("Zira") ||
          v.name.includes("Google UK English Female") ||
          v.name.includes("Samantha") ||
          v.name.includes("Telugu")
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.1;

      const store = useAppStore.getState();
      utterance.onstart = () => store.setHelaState("speaking");
      utterance.onend = () => store.setHelaState("idle");

      window.speechSynthesis.speak(utterance);
    }
  }

  getIsListening() {
    return this.isListening;
  }
}

export const voiceEngine = new VoiceEngine();
