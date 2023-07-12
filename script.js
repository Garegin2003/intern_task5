function Masonry() {
  this.resizeRequestId = null;
}

Masonry.prototype.render = function(className, objectSettings) {

  const container = document.querySelector(className)
  const items = document.querySelectorAll('.masonry__item')
  const columnWidth = objectSettings.columnWidth || 200
  const autoResize = objectSettings.autoResize || false
  const numberColumns = Math.trunc(container.offsetWidth / columnWidth)
  const columns = []

  for (let i = 0; i < numberColumns; i++) {
    columns.push(0)
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const columnIndex = getColumnIndex(columns)

    item.style.left = `${(columnIndex * columnWidth)}px`
    item.style.top = `${columns[columnIndex]}px`
    item.style.width = columnWidth + 'px'
    columns[columnIndex] += item.offsetHeight+10
  }

  container.style.height = Math.max(...columns) + 'px'
  
  if (autoResize) {
    window.addEventListener('resize', () => {

      if (this.resizeRequestId) {
        return; 
      }

      this.resizeRequestId = window.requestAnimationFrame(() => {
        this.resizeRequestId = null;

        this.handleResize(className, {
          columnWidth: columnWidth,
          autoResize: autoResize
        });
      });
    });
  } else {
    window.removeEventListener('resize', this.handleResize);
  }
}

function getColumnIndex(columns) {
  let index = 0
  let indexHeight = columns[0]

  for (let i = 0; i < columns.length; i++) {

    if (columns[i] <= indexHeight) {
      index = i
      indexHeight = columns[i]
    }
  }

  return index

}

Masonry.prototype.handleResize = function(className, objectSettings) {
  this.render(className, objectSettings);
};

const MasonryLayout = new Masonry();

window.addEventListener('DOMContentLoaded', () => {

  MasonryLayout.render('.masonry', {
    columnWidth: 300,
    autoResize: true
  });
});