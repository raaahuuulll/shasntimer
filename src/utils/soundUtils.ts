class SoundManager {
  private tickSound: HTMLAudioElement;
  private alertSound: HTMLAudioElement;
  private buzzerSound: HTMLAudioElement;
  private initialized: boolean = false;

  constructor() {
    this.tickSound = new Audio();
    this.alertSound = new Audio();
    this.buzzerSound = new Audio();
    
    this.initializeSounds();
  }

  private initializeSounds() {
    this.tickSound.src = 'assets/capture.mp3';
    this.alertSound.src = 'assets/tenseconds.mp3';
    // this.buzzerSound.src = 'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/game-end.mp3';
    this.buzzerSound.src = 'assets/buzzer-227217.mp3';

    // Preload sounds
    this.tickSound.load();
    this.alertSound.load();
    this.buzzerSound.load();
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Try to play and immediately pause to handle autoplay restrictions
      await this.tickSound.play();
      this.tickSound.pause();
      this.tickSound.currentTime = 0;
      
      await this.alertSound.play();
      this.alertSound.pause();
      this.alertSound.currentTime = 0;
      
      await this.buzzerSound.play();
      this.buzzerSound.pause();
      this.buzzerSound.currentTime = 0;
      
      this.initialized = true;
    } catch (error) {
      console.warn('Sound initialization failed:', error);
    }
  }

  playTick() {
    if (!this.initialized) return;
    this.tickSound.currentTime = 0;
    this.tickSound.play().catch(console.warn);
  }

  playAlert() {
    if (!this.initialized) return;
    this.alertSound.currentTime = 0;
    this.alertSound.play().catch(console.warn);
  }

  playBuzzer() {
    if (!this.initialized) return;
    this.buzzerSound.currentTime = 0;
    this.buzzerSound.play().catch(console.warn);
  }
}

export const soundManager = new SoundManager();