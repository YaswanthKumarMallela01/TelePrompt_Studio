You are an expert Tauri v2 + React/TypeScript desktop application developer. Build a complete, production-quality personal teleprompter Windows desktop application called **CueFloat**. Follow every requirement below precisely. Do not use placeholder comments — write all logic fully. Deliver every file in full.

---

## PROJECT OVERVIEW

CueFloat is a floating, always-on-top teleprompter overlay for Windows. The user positions it near their webcam preview to read scripts during video recordings. The window must be semi-transparent, resizable, and fully controllable via keyboard hotkeys while recording. This is a real, shippable desktop app — not a prototype.

---

## TECH STACK

- Tauri v2 (Rust backend)
- React 18 + TypeScript (frontend)
- Vite (bundler)
- Tailwind CSS v3 (styling)
- @tauri-apps/plugin-global-shortcut for system-level hotkeys
- @tauri-apps/plugin-fs for reading .txt script files from disk
- @tauri-apps/plugin-dialog for native open-file dialog
- @tauri-apps/plugin-window-state to persist window size and position across sessions

---

## WINDOW BEHAVIOR

1. Window starts at 420×600px, fully resizable by dragging edges, with a minimum size of 280×300px.
2. always_on_top must be true — the window must stay above all other windows including OBS, Teams, camera apps, and the Windows taskbar.
3. The window must be frameless and transparent with no native OS titlebar. Use a custom slim draggable header bar built in React using the data-tauri-drag-region attribute.
4. Window background supports an opacity control from 10% to 100% controlled by a slider in the settings panel. This lets the user see their camera feed faintly behind the text while reading.
5. Window position and size must be persisted on exit via the window-state plugin and fully restored on next launch.

---

## FILE AND FOLDER STRUCTURE

Produce exactly this structure with all files fully written:

cuefloat/
├── src-tauri/
│   ├── src/main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/
│   ├── components/
│   │   ├── TitleBar.tsx
│   │   ├── TeleprompterView.tsx
│   │   ├── ControlStrip.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── Countdown.tsx
│   ├── hooks/
│   │   ├── useScroller.ts
│   │   ├── useHotkeys.ts
│   │   └── useSettings.ts
│   ├── types/index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md

---

## TAURI CONFIGURATION

The tauri.conf.json must configure the window with: title "CueFloat", starting size 420×600, minimum size 280×300, resizable true, alwaysOnTop true, transparent true, decorations false, and centered on first launch. Register all four plugins: global-shortcut, fs (with all: true), dialog, and window-state with saveWindowState true. The bundle productName is "CueFloat", identifier is "com.cuefloat.app", version "1.0.0".

The Cargo.toml must include tauri v2, tauri-plugin-global-shortcut v2, tauri-plugin-fs v2, tauri-plugin-dialog v2, tauri-plugin-window-state v2, serde with derive feature, and serde_json. Use a release profile with panic=abort, lto=true, opt-level="s", and strip=true.

The main.rs must register all four plugins on the Tauri builder before calling run.

---

## FEATURES TO IMPLEMENT

### Feature 1 — Script Input (Edit Mode)
- A full-height textarea where the user pastes their script.
- A "Load .txt File" button that uses the Tauri dialog plugin to open a native file picker filtered to .txt files, then reads the file contents using the fs plugin and places them in the textarea.
- A "Clear" button to wipe the textarea.
- A prominent "Start Teleprompter" button at the bottom that switches the app to Teleprompter Mode. This button must be disabled when the script is empty.

### Feature 2 — Text Display Customization (in Settings Panel)
- Font size slider from 16px to 72px.
- Font family dropdown with three options: Inter (sans-serif), Georgia (serif), Courier New (monospace).
- Text color picker, defaulting to white (#ffffff).
- Background color picker, defaulting to black (#000000). This is separate from the window opacity.
- Line height slider from 1.2 to 2.5.
- Text alignment toggle between Left and Center.
- Horizontal padding slider from 8px to 80px to control the text column width.

### Feature 3 — Scrolling Engine
- Implement smooth auto-scroll using requestAnimationFrame only. Do not use CSS animations, setInterval, or setTimeout for the scroll movement itself.
- Speed is controlled by a slider from 0.1 to 10. At speed 1, the scroll rate should be approximately 30px per second. At speed 10 it should be approximately 300px per second. The rate must scale linearly.
- Support scroll direction toggle: top-to-bottom (default) and bottom-to-top.
- Support a mirror/flip toggle that applies CSS transform scaleX(-1) to the text area for use with physical teleprompter glass setups.
- When the script reaches the end (or beginning in reverse mode), the scroll must auto-stop and display a subtle "End of Script" indicator in the text area.

### Feature 4 — Playback Controls
- Play / Pause toggle button. When playing the label shows a pause icon; when paused or stopped it shows a play icon.
- Stop & Reset button that halts scrolling and snaps the scroll position back to the top (or bottom for reverse mode).
- Restart with Countdown button that first calls Stop & Reset, then displays a 3-2-1 animated countdown overlay over the teleprompter view, then automatically begins playing when the countdown finishes.
- A slim progress bar spanning the full width showing scroll progress from 0% to 100%. Display the percentage as a number next to it.
- A live speed readout in the control strip showing the current speed value to one decimal place.

### Feature 5 — Keyboard Hotkeys
Register the following as global system-level shortcuts using the Tauri global-shortcut plugin so they work even when the CueFloat window is not focused:

- Space → Play / Pause toggle
- R → Restart with countdown
- S → Stop and reset to top
- Arrow Up → Increase speed by 0.5
- Arrow Down → Decrease speed by 0.5
- Ctrl+O → Open file dialog
- Escape → Return to Edit Mode and pause if playing

Hotkeys must only be registered when the app is in Teleprompter Mode and must be fully unregistered when switching back to Edit Mode or when the component unmounts, to prevent duplicate handler registration.

### Feature 6 — Window Opacity Control
- A slider in the settings panel controls the CSS opacity of the entire teleprompter view area (TeleprompterView component) from 10% to 100%.
- The TitleBar, SettingsPanel, and ControlStrip must always remain at 100% opacity regardless of this setting, so the user can still interact with controls while the text area is transparent.

### Feature 7 — Settings Panel
- The settings panel is toggled open and closed via a gear icon button in the TitleBar.
- It slides in below the TitleBar and above the main content area.
- It must have a maximum height with internal vertical scroll so it never pushes the teleprompter view off screen.
- It contains all customization controls from Features 2, 3, and 6 organized into three labeled sections: Text, Scroll, and Window.
- Include a "Reset to Defaults" button at the bottom of the panel.
- All settings must be persisted to localStorage and restored on next launch.

### Feature 8 — Scroll Fade Masks
- Apply a CSS gradient fade at the top of the TeleprompterView that transitions from the background color to transparent, so text fades in as it enters the reading area.
- Apply a matching fade at the bottom so text fades out as it exits.
- These fades must update dynamically when the background color setting changes.
- The fades must use absolute positioning with pointer-events none so they do not block scroll interaction.

### Feature 9 — Custom TitleBar
- Height of 36px, dark background.
- Left side: app name "CueFloat" in small uppercase tracking-widest style.
- Center: Edit / Read mode toggle (two buttons styled as a pill switcher).
- Right side: settings gear icon, minimize button, and close button. Minimize and close use the Tauri window API.
- The entire titlebar must be draggable via data-tauri-drag-region on the container div.

### Feature 10 — Countdown Overlay
- When Restart with Countdown is triggered, render a full-overlay div over the TeleprompterView (not over the TitleBar or ControlStrip) with a semi-transparent dark backdrop.
- Display the countdown number (3, then 2, then 1) centered in large bold text.
- Each number should animate with a scale-in keyframe (scale from 0.6 to 1, opacity 0 to 1) over 0.4 seconds.
- After "1" finishes, remove the overlay and begin playing.

---

## TYPES

Define the following TypeScript types in src/types/index.ts and import them wherever needed:
- AppMode: 'edit' | 'teleprompter'
- ScrollDirection: 'down' | 'up'
- TextAlign: 'left' | 'center'
- FontFamily: 'inter' | 'georgia' | 'courier'
- PlaybackState: 'playing' | 'paused' | 'stopped'
- Settings interface with all customization fields typed correctly
- ScrollerState interface with playback, progress (0–1), and countdownValue (number | null)

---

## HOOKS

### useSettings
Manages all Settings state. Initializes from localStorage with a full default values fallback. Persists to localStorage on every change via useEffect. Exposes: settings object, updateSetting(key, value) generic function, and resetSettings().

### useScroller
Accepts a containerRef, the current settings object, and an onEnd callback. Manages the requestAnimationFrame scroll loop internally. Exposes: state (ScrollerState), play(), pause(), stop(), startWithCountdown(), and togglePlayPause(). The countdown logic must use setTimeout internally for the 1-second intervals between countdown numbers, not requestAnimationFrame. Cleans up all RAF and timer references on unmount.

### useHotkeys
Accepts an actions object with all hotkey handlers and an enabled boolean. When enabled is true, registers all global shortcuts using the Tauri plugin. When enabled becomes false or the component unmounts, calls unregisterAll() to clean up. Handles async registration inside a useEffect with a try/catch.

---

## DESIGN REQUIREMENTS

- Dark theme only throughout the entire application.
- TitleBar and ControlStrip background: #171717 (neutral-900).
- SettingsPanel background: #171717 at 95% opacity with no blur.
- All interactive controls (buttons, sliders, selects) must have a minimum touch target of 44px height.
- Slider inputs must use accent-color white so the thumb and track are visible on dark backgrounds.
- The UI font for all chrome (labels, buttons, settings) is Inter loaded from Google Fonts.
- The teleprompter text area must be completely free of UI chrome when the settings panel is closed — only the scrolling text is visible.
- The ControlStrip is always visible at the bottom of the Teleprompter Mode view and must never overlap the text area — it must be part of the flex column layout, not absolutely positioned.
- Color pickers for text and background colors must use native HTML input type="color" elements.
- All toggle switches (mirror mode) must be custom-built pill-style toggles, not native checkboxes.

---

## VITE AND BUILD CONFIGURATION

- vite.config.ts: use @vitejs/plugin-react, server port 1420 with strictPort true, build target es2021 and chrome105.
- tailwind.config.js: content paths covering index.html and src/**/*.{ts,tsx}, extend theme with a custom keyframe called ping-once that animates scale from 0.6 to 1 and opacity from 0 to 1 over its duration, and an animation utility ping-once that uses it with 0.4s ease-out forwards.
- index.css: import Inter from Google Fonts, include Tailwind base/components/utilities, hide scrollbars on the teleprompter scroll container using both WebKit and standard properties, set html/body/#root to height 100% overflow hidden background transparent.

---

## README

Include a README.md with:
- One-line description of CueFloat
- Prerequisites list (Node.js 18+, Rust, Tauri CLI, Tauri system dependencies link)
- Install and dev run commands
- Production build command and output location
- Full hotkey reference table
- Three practical tips for using CueFloat as a webcam overlay during video recording

---

## CRITICAL REQUIREMENTS CHECKLIST

Before finalizing output, verify:
- alwaysOnTop, transparent, and decorations:false are all set in tauri.conf.json — these three together are what makes the overlay work on Windows 10/11
- The scroll engine uses only requestAnimationFrame for movement, never setInterval
- Global hotkeys are unregistered when leaving Teleprompter Mode
- overlayOpacity only affects the TeleprompterView div, not the TitleBar, SettingsPanel, or ControlStrip
- The "Start Teleprompter" button is disabled when script is empty
- All settings survive a full app close and reopen via localStorage
- Every file in the structure above is present and fully written with no TODOs
