document.addEventListener('contextmenu', (e) => {
        const isMedia = ['img', 'image', 'video', 'svg', 'picture'].some(
          tagName => tagName.localeCompare(e.target.tagName, undefined, { sensitivity: 'base' }) === 0,
        );
        isMedia && e.preventDefault();
      });
