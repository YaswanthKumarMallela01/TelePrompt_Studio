# TelePrompt Studio

A sleek, premium, always-on-top floating teleprompter overlay for Windows. Position the semi-transparent window near your webcam to read scripts naturally during video recordings, with full keyboard hotkey control.

---

## Key Features

- **Webcam Placement**: Always-on-top frameless floating window designed to sit right next to your webcam lens.
- **Opacity Controls**: Transparent background options (10% to 100% overlay opacity) so you can keep an eye on your camera feed or window content behind the text.
- **Scroll Engine**: Ultra-smooth scrolling powered exclusively by `requestAnimationFrame`, including high-precision sub-pixel movement at fractional speeds (e.g. 0.1× to 0.9×).
- **Mirror Mode**: Flip the text horizontally for use with physical teleprompter reflection glass.
- **Rich Customization**: Customize font size (16–72px), font family (Inter, Georgia, Courier New), text/background colors, line height, text alignment, and margins.
- **Smart Countdown**: Gentle 3-2-1 scale-in countdown before auto-scrolling begins.
- **Global Hotkeys**: Control the teleprompter (play, pause, speed up/down, restart) even when focusing on another app (OBS, Zoom, Teams, PowerPoint, etc.).
- **Automatic Persistence**: Window size, position, and all typography/scroller settings persist automatically between sessions.
- **File Loader**: Open and read standard `.txt` scripts directly into the prompter.



---

## Prerequisites

To run or build TelePrompt Studio, ensure you have the following installed on your Windows machine:

1. **Node.js** (v18 or higher)
2. **Rust & Cargo** (via [rustup](https://rustup.rs/))
3. **C++ Build Tools** (via Visual Studio Installer, select the "Desktop development with C++" workload)
4. **WebView2 Runtime** (installed by default on Windows 10/11; required for Tauri applications)

---

## Getting Started

### 1. Clone & Install Dependencies
Navigate to the project directory and run:
```bash
npm install
```

### 2. Run in Development Mode
Start the local development server and launch the desktop application:
```bash
npm run tauri dev
```

### 3. Build Production Executable
Compile a highly optimized standalone Windows executable:
```bash
npm run tauri build
```
Once complete, the installer and standalone executable will be located in:
`src-tauri/target/release/bundle/nsis/` and `src-tauri/target/release/`

---

## Detailed Usage Guide

### Step-by-Step Instructions

#### 1. Import or Write a Script
- **Edit Mode**: When you first launch the app, you start in **Edit Mode**.
- **Paste Text**: Simply click the central text area and paste your script.
- **Load Text File**: Click the **"Load .txt File"** button to open a system file dialog and load a plain text script.
- **Start**: When you're ready, click the large green **"Start Teleprompter"** button.

#### 2. Adjust Appearance
- Click the **⚙ (gear) icon** in the custom title bar to open the **Settings Panel**.
- **Text Styling**:
  - Drag the **Font Size** slider (16px to 72px).
  - Select your preferred **Font Family** (Inter, Georgia, or Courier New).
  - Select custom text and background colors via color pickers.
  - Tweak the **Line Height** and **Text Alignment** (Left or Center).
  - Set the side margins with the **Horizontal Padding** slider.
- **Scrolling Config**:
  - Speed: Linearly control the scrolling rate (0.1× to 10×).
  - Direction: Scroll down (traditional) or scroll up.
  - **Mirror Mode**: Flips the text horizontally so it displays correctly when reflected off standard teleprompter beamsplitter glass.
- **Window Opacity**: Slide from 10% to 100% to control transparency. This applies only to the teleprompter window content, keeping controls readable.

#### 3. Position the Window
- **Drag** the window using the custom title bar at the top.
- **Resize** by hovering over the window edges and dragging. The app enforces a minimum size of 280×300px to ensure usability.
- The window is locked to stay **always-on-top**, meaning it won't hide behind OBS, Zoom, or PowerPoint.
- Your window size and coordinates are saved automatically by the `window-state` plugin and restored on subsequent launches.

#### 4. Control Playback & Global Hotkeys
In **Teleprompter Mode**, use the bottom control strip or system-wide hotkeys. These hotkeys work **even when TelePrompt Studio is not the active/focused window**:

| Hotkey | Action | Description |
| :--- | :--- | :--- |
| **`Space`** | Play / Pause | Toggle scrolling play state |
| **`R`** | Restart | Stop, reset position, and trigger 3-2-1 countdown before auto-playing |
| **`S`** | Stop & Reset | Stop scrolling and reset position to the start |
| **`↑ Arrow`** | Increase Speed | Increase scroll speed by `0.5×` (max 10.0×) |
| **`↓ Arrow`** | Decrease Speed | Decrease scroll speed by `0.5×` (min 0.1×) |
| **`Ctrl + O`** | Open File | Quick shortcut to open a `.txt` file |
| **`Escape`** | Exit to Edit | Switch back to Edit Mode to make script modifications |

---

## Pro Tips for Video Creators

1. **Perfect Eye Contact**: Place the floating window directly below or above your webcam lens. Shrink the window width to ~300px so your eyes don't travel too far horizontally, ensuring you look directly into the camera.
2. **Webcam Backing**: Reduce the window opacity to ~40% and overlay it right on top of your recording program's camera view. You'll be able to see yourself and read the text simultaneously.
3. **Pace Control**: Use the arrow keys (`↑` / `↓`) mid-recording to adapt the speed of the script to your natural speaking pace, rather than stopping and starting.
