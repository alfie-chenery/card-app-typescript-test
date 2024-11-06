# Integrum ESG interview - Card App 🎴🃏

## Submission: Alfie Chenery

### Implement Dark Mode

To implement dark mode I modified the ```tailwind.config.js``` file and added the line ```darkMode: "class",```
This tells tailwind to style componenets in dark mode according to their class name. This allows me to define additional colours in the class of componenets that will react to dark mode. We can now stipulate for example ```bg-gray-300 dark:bg-gray-500``` which states to use gray-300 as the background, or gray-500 when in dark mode. The ```dark:``` prefix can be applied to any parameter of the tailwind class definition (bg, text, shadow, etc).

A component is considered in dark mode if its class list contains the 'dark' class. Since we want dark mode to
apply to the whole website, we can set the top level document to be dark, and this will automatically propegate to all the children compoenents within it. Therefore we can achieve this with ```document.documentElement.classList.add("dark");``` or disable dark mode using ```.remove("dark")```. "dark" is a keyword tailwind is already expecting, and when it sees that a component has the dark class, it uses the colour as specified for dark mode.

To impement the toggle, a component is created which handles the logic for applying the dark tag to the document, and returns a React component for displaying a toggle slider. I then added a settings page which currently only holds this toggle, and added the settings page to the navigation bar.

All commits implementing this feature took aproximately 45 minutes.

### Adding a scheduled date