function Masonry(className,objectSettings) {
  this.resizeRequestId = null;
  this.objectSettings = objectSettings
  this.className = className
}

Masonry.prototype.render = function (className, objectSettings) {
  objectSettings = this.objectSettings
  className = this.className
  const container = document.querySelector(className);
  const items = document.querySelectorAll('.masonry__item');
  const columnWidth = objectSettings.columnWidth || 200;
  const autoResize = objectSettings.autoResize || false;
  const gap = objectSettings.gap || 0;
  const numberColumns = Math.trunc(container.offsetWidth / columnWidth);
  const columns = [];

  for (let i = 0; i < numberColumns; i++) {
    columns.push(0);
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const columnIndex = this.getColumnIndex(columns);

    item.style.left = `${columnIndex * columnWidth + columnIndex * gap}px`;
    item.style.top = `${columns[columnIndex]}px`;
    item.style.width = columnWidth + 'px';
    columns[columnIndex] += item.offsetHeight + gap;
  }

  container.style.height = Math.max(...columns) + 'px';

  if (autoResize) {
    window.addEventListener('resize', () => {
      if (this.resizeRequestId) {
        return;
      }

      this.resizeRequestId = window.requestAnimationFrame(() => {
        this.resizeRequestId = null;

        this.handleResize();
      });
    });
  } else {
    window.removeEventListener('resize', this.handleResize);
  }
};

Masonry.prototype.getColumnIndex = function (columns) {
  let index = 0;
  let indexHeight = columns[0];

  for (let i = 0; i < columns.length; i++) {
    if (columns[i] <= indexHeight) {
      index = i;
      indexHeight = columns[i];
    }
  }

  return index;
}

Masonry.prototype.handleResize = function () {
  this.render(this.className, this.objectSettings);
};

const MasonryLayout = new Masonry('.masonry', {
  columnWidth: 300,
  autoResize: true,
  gap: 10,
});

window.addEventListener('DOMContentLoaded', () => {
  MasonryLayout.render();
});
