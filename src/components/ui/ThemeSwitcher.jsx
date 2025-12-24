import { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Sparkles } from 'lucide-react';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('cinema');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: 'cinema', label: '🎬 Cinema', icon: Sparkles, description: 'Custom movie theater theme' },
    { name: 'dark', label: '🌙 Dark', icon: Moon, description: 'Classic dark theme' },
    { name: 'light', label: '☀️ Light', icon: Sun, description: 'Clean light theme' },
    { name: 'synthwave', label: '🌈 Synthwave', icon: Sparkles, description: 'Neon retro vibes' },
    { name: 'cyberpunk', label: '🤖 Cyberpunk', icon: Sparkles, description: 'Futuristic neon' },
    { name: 'dracula', label: '🧛 Dracula', icon: Moon, description: 'Purple vampire theme' },
    { name: 'forest', label: '🌲 Forest', icon: Sparkles, description: 'Nature green theme' },
    { name: 'luxury', label: '✨ Luxury', icon: Sparkles, description: 'Premium gold & black' },
    { name: 'valentine', label: '💖 Valentine', icon: Sparkles, description: 'Romantic pink theme' },
    { name: 'halloween', label: '🎃 Halloween', icon: Sparkles, description: 'Spooky orange theme' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'cinema';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.name === currentTheme);

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle hover:btn-primary transition-all duration-300"
        title="Change Theme"
      >
        <Palette className="size-5" />
      </button>

      {/* Theme Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme Menu */}
          <div className="absolute right-0 top-12 z-50 w-80 bg-base-200 rounded-lg shadow-2xl border border-base-300 p-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Palette className="size-5" />
                Choose Theme
              </h3>
              <p className="text-sm text-base-content/70 mt-1">
                Current: {currentThemeData?.label}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
              {themes.map((theme) => {
                const IconComponent = theme.icon;
                return (
                  <button
                    key={theme.name}
                    onClick={() => changeTheme(theme.name)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200
                      hover:bg-base-300 hover:scale-105
                      ${currentTheme === theme.name 
                        ? 'bg-primary/20 border-2 border-primary text-primary' 
                        : 'bg-base-100 border border-base-300'
                      }
                    `}
                  >
                    <IconComponent className="size-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold">{theme.label}</div>
                      <div className="text-xs opacity-70">{theme.description}</div>
                    </div>
                    {currentTheme === theme.name && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-base-300">
              <p className="text-xs text-base-content/50 text-center">
                🎨 Theme changes are saved automatically
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;