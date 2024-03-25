const template = (locals, callback) => {
  callback(null, `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Paparazzi</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📸</text></svg>">
        <script>
            tailwind.config = {
              darkMode: 'selector',
            }
            window.toggleDarkMode = () => {
              document.body.classList.toggle('dark');
              document.querySelector('[data-ref="dark-mode-toggle"]').textContent = document.body.classList.contains('dark') ? '🌞' : '🌙'
            }
        </script>
      </head>
      <body class="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 mx-4">
        <div class="container mx-auto py-20 min-h-screen relative">
          <div class="flex justify-between">
            <h1 class="text-3xl text-center lg:text-left font-bold">📸 Paparazzi</h1>
            <button 
              data-ref="dark-mode-toggle"
              class="border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition px-4 py-2 rounded-lg" 
              onclick="window.toggleDarkMode()"
            >
              🌙
            </button>
          </div>

          <div class="w-full h-px bg-zinc-200 dark:bg-zinc-700 my-10"></div>

          <h2 class="text-lg"><span class="font-bold">📦 Directory:</span> ${locals.directory}</h2>
          <h2 class="text-lg"><span class="font-bold">📁 Files:</span> ${locals.fileList.length}</h2>

          <div class="w-full h-px bg-zinc-200 dark:bg-zinc-700 my-10"></div>

          <div class="grid place-content-center lg:grid-cols-4 gap-16">
            ${locals.fileList.map(file => `
              <div class="flex flex-col gap-y-4">
                <h2 class="text-lg font-bold whitespace-nowrap">🖼️ ${file.name}</h2>
                <a href="${locals.directory}/${file.name}" class="max-w-96 h-96">
                  <img class="w-full h-full object-cover shadow-xl" src="${locals.directory}/${file.name}" alt="${file.name}" />
                </a>
              </div>
            `).join('')} 
          </div>

          <div class="w-full h-px bg-zinc-200 dark:bg-zinc-700 my-10"></div>

          <footer class="absolute bottom-0 w-full py-4 text-center border-t border-zinc-200 dark:border-zinc-700">
            🏫 IUT de Troyes © 2024
          </footer>
        </div>
      </body>
    </html>
  `);
}

export default template;