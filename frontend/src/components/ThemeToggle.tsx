import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
      return (localStorage.getItem('theme') as Theme) || 'light';
    });
    // default to local storgage value, or light if no value stored
  
    useEffect(() => {
        // Add 'dark' class to the root element if the theme is dark
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
      }, [theme]);
  
    function toggleTheme() {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
  
    return (
      <button 
      onClick={toggleTheme}
      className="p-2 mt-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
        
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    );
  }