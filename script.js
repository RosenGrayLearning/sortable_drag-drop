const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

/**
 * Our draggables
 */
draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', (e) => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', (e) => {
    draggable.classList.remove('dragging');
  });
});

/** Our Containers where our draggables should be insert to */

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    //constantly runs while our draggable is on the container area

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');

    if (!afterElement) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }

    // container.appendChild(draggable);
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, draggableElement) => {
      const box = draggableElement.getBoundingClientRect();
      //the distance between the center of our box and our mouse cursor
      const offset = y - (box.top + box.height / 2);
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: draggableElement };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
