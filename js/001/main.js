        const themeToggleButton = document.getElementById('themeToggle');

        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDarkMode = document.body.classList.contains('dark');
            themeToggleButton.innerText = isDarkMode ? '☀️' : '🌙';
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {document.body.classList.add('dark');themeToggleButton.innerText = '☀️';}});
