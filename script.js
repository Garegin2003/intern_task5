function Masonry() {}
Masonry.prototype.render = (className, objectSettings) => {
  const container = document.querySelector(className)
  const items = document.querySelectorAll('.masonry__item')
  const columnWidth = objectSettings.columnWidth || 200
  const autoResize = objectSettings.autoResize || false

  const numberColumns = Math.trunc(container.offsetWidth/ columnWidth)
}