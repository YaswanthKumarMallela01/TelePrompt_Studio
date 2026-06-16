import React from 'react';
import { Settings } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  onUpdateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  onReset: () => void;
}

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-neutral-400 mb-3 mt-1">
    {children}
  </h3>
);

const FieldRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex items-center justify-between gap-4 min-h-[44px]">
    <label className="text-sm text-neutral-300 whitespace-nowrap">{label}</label>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onUpdateSetting,
  onReset,
}) => {
  return (
    <div
      className="bg-[#171717]/95 border-b border-neutral-800 overflow-y-auto shrink-0"
      style={{ maxHeight: '60vh' }}
    >
      <div className="px-4 py-3 space-y-4">
        {/* Text Section */}
        <div>
          <SectionLabel>Text</SectionLabel>
          <div className="space-y-2">
            {/* Font Size */}
            <FieldRow label="Font Size">
              <input
                type="range"
                min={16}
                max={72}
                step={1}
                value={settings.fontSize}
                onChange={(e) =>
                  onUpdateSetting('fontSize', Number(e.target.value))
                }
                className="w-28"
                style={{ minHeight: 44 }}
              />
              <span className="text-xs text-neutral-400 w-10 text-right">
                {settings.fontSize}px
              </span>
            </FieldRow>

            {/* Font Family */}
            <FieldRow label="Font Family">
              <select
                value={settings.fontFamily}
                onChange={(e) =>
                  onUpdateSetting(
                    'fontFamily',
                    e.target.value as Settings['fontFamily']
                  )
                }
                className="bg-neutral-800 text-white border border-neutral-600 rounded px-2 py-1.5 text-sm outline-none focus:border-neutral-400 transition-colors"
                style={{ minHeight: 44 }}
              >
                <option value="inter">Inter</option>
                <option value="georgia">Georgia</option>
                <option value="courier">Courier New</option>
              </select>
            </FieldRow>

            {/* Text Color */}
            <FieldRow label="Text Color">
              <input
                type="color"
                value={settings.textColor}
                onChange={(e) =>
                  onUpdateSetting('textColor', e.target.value)
                }
                className="w-8 h-8"
              />
            </FieldRow>

            {/* Background Color */}
            <FieldRow label="Background Color">
              <input
                type="color"
                value={settings.bgColor}
                onChange={(e) =>
                  onUpdateSetting('bgColor', e.target.value)
                }
                className="w-8 h-8"
              />
            </FieldRow>

            {/* Line Height */}
            <FieldRow label="Line Height">
              <input
                type="range"
                min={1.2}
                max={2.5}
                step={0.1}
                value={settings.lineHeight}
                onChange={(e) =>
                  onUpdateSetting('lineHeight', Number(e.target.value))
                }
                className="w-28"
                style={{ minHeight: 44 }}
              />
              <span className="text-xs text-neutral-400 w-8 text-right">
                {settings.lineHeight.toFixed(1)}
              </span>
            </FieldRow>

            {/* Text Alignment */}
            <FieldRow label="Text Align">
              <div className="flex items-center bg-neutral-800 rounded-full p-0.5">
                <button
                  onClick={() => onUpdateSetting('textAlign', 'left')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    settings.textAlign === 'left'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  style={{ minHeight: 28 }}
                >
                  Left
                </button>
                <button
                  onClick={() => onUpdateSetting('textAlign', 'center')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    settings.textAlign === 'center'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  style={{ minHeight: 28 }}
                >
                  Center
                </button>
              </div>
            </FieldRow>

            {/* Horizontal Padding */}
            <FieldRow label="Padding">
              <input
                type="range"
                min={8}
                max={80}
                step={4}
                value={settings.padding}
                onChange={(e) =>
                  onUpdateSetting('padding', Number(e.target.value))
                }
                className="w-28"
                style={{ minHeight: 44 }}
              />
              <span className="text-xs text-neutral-400 w-10 text-right">
                {settings.padding}px
              </span>
            </FieldRow>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700" />

        {/* Scroll Section */}
        <div>
          <SectionLabel>Scroll</SectionLabel>
          <div className="space-y-2">
            {/* Speed */}
            <FieldRow label="Speed">
              <input
                type="range"
                min={0.1}
                max={10}
                step={0.1}
                value={settings.scrollSpeed}
                onChange={(e) =>
                  onUpdateSetting('scrollSpeed', Number(e.target.value))
                }
                className="w-28"
                style={{ minHeight: 44 }}
              />
              <span className="text-xs text-neutral-400 w-8 text-right">
                {settings.scrollSpeed.toFixed(1)}×
              </span>
            </FieldRow>

            {/* Direction */}
            <FieldRow label="Direction">
              <div className="flex items-center bg-neutral-800 rounded-full p-0.5">
                <button
                  onClick={() => onUpdateSetting('scrollDirection', 'down')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    settings.scrollDirection === 'down'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  style={{ minHeight: 28 }}
                >
                  Down
                </button>
                <button
                  onClick={() => onUpdateSetting('scrollDirection', 'up')}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    settings.scrollDirection === 'up'
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  style={{ minHeight: 28 }}
                >
                  Up
                </button>
              </div>
            </FieldRow>

            {/* Mirror Mode */}
            <FieldRow label="Mirror Mode">
              <button
                onClick={() => onUpdateSetting('mirror', !settings.mirror)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.mirror ? 'bg-emerald-500' : 'bg-neutral-600'
                }`}
                style={{ minHeight: 24 }}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    settings.mirror ? 'translate-x-[22px]' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </FieldRow>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700" />

        {/* Window Section */}
        <div>
          <SectionLabel>Window</SectionLabel>
          <div className="space-y-2">
            {/* Overlay Opacity */}
            <FieldRow label="Overlay Opacity">
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={Math.round(settings.overlayOpacity * 100)}
                onChange={(e) =>
                  onUpdateSetting(
                    'overlayOpacity',
                    Number(e.target.value) / 100
                  )
                }
                className="w-28"
                style={{ minHeight: 44 }}
              />
              <span className="text-xs text-neutral-400 w-10 text-right">
                {Math.round(settings.overlayOpacity * 100)}%
              </span>
            </FieldRow>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700" />

        {/* Reset Button */}
        <div className="flex justify-center pb-1">
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
            style={{ minHeight: 44 }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
