// scripts.js

const containerDraggable = document.getElementById('draggable-albums');
const containerDropTargets = document.getElementById('drop-targets');

function onDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(this.querySelector('img'), 40, 40);
    e.dataTransfer.setData("text/html", this.id);
    
    this.style.opacity = '0.35';
    containerDraggable.style.border = '2px solid rgb(9, 56, 25)';
}

function onDragEnd(e) {
    this.style.opacity = '1';
}

function allowDrop(e) {
    e.preventDefault();
}

function dropList(e) {
    const data = e.dataTransfer.getData("text/html");
    const draggedItem = document.getElementById(data);

    const targetContainer = e.target.closest('.drop-target');
    
    if (targetContainer.children.length === 1) {
        targetContainer.appendChild(draggedItem);
    } else {
        const parentOfDragged = draggedItem.parentNode.id;
        const draggedContainer = document.getElementById(parentOfDragged);
        
        const targetItem = targetContainer.children[1];

        draggedContainer.appendChild(targetItem);
        targetContainer.appendChild(draggedItem);
    }

    containerDraggable.style.border = '2px solid #1DB954';
}

function dropContainer(e) {
    const data = e.dataTransfer.getData("text/html");
    const draggedContainer = document.getElementById(data);

    const targetContainer = e.target.closest('.drag-targets');
    if (targetContainer?.id) targetContainer.appendChild(draggedContainer);

    containerDraggable.style.border = '2px solid #1DB954';
}

function initializeDraggableItems() {
    fetch('data/albums.json')
    .then(response => response.json())
    .then(albums => {
        albums.forEach(album => {
            const albumDiv = document.createElement('div');
            albumDiv.id = album.id;
            albumDiv.className = 'draggable-image';
            albumDiv.draggable = true;
            albumDiv.ondragstart = onDragStart;
            albumDiv.ondragend = onDragEnd;

            const img = document.createElement('img');
            img.src = album.image;
            img.alt = album.title;
            albumDiv.appendChild(img);
            
            const text = document.createElement('p');
            text.className = 'album-text';
            text.innerHTML = `
                Artist: ${album.artist}<br>
                Album: ${album.title}<br>
                Year: ${album.year}
            `;
            albumDiv.appendChild(text);

            containerDraggable.appendChild(albumDiv);
        });
    })
    .catch(error => console.error('Error loading albums:', error));

    for (let i = 1; i <= 7; i++) {
        const dropTarget = document.createElement('div');
        dropTarget.className = 'drop-target';
        dropTarget.id = `drop-target-${i}`;
        dropTarget.style.justifyContent = 'center';
        
        const numberCircle = document.createElement('div');
        numberCircle.className = 'number-circle';
        numberCircle.textContent = i;
        dropTarget.appendChild(numberCircle);

        dropTarget.ondrop = dropList;
        dropTarget.ondragover = allowDrop;
        containerDropTargets.appendChild(dropTarget);

        dropTarget.addEventListener('dragover', () => {
            dropTarget.style.transform = 'scale(1.02)';
            dropTarget.style.transition = 'transform 0.2s ease-in';
            dropTarget.style.backgroundColor = '#179142';

        });
        
        dropTarget.addEventListener('dragleave', () => {
            dropTarget.style.transform = 'scale(1)';
            dropTarget.style.transition = 'transform 0.2s ease-out';
            dropTarget.style.backgroundColor = '#1DB954';
        });

        dropTarget.addEventListener('mouseenter', () => {
            dropTarget.style.transform = 'scale(1.02)';
            dropTarget.style.transition = 'transform 0.2s ease-in';
            dropTarget.style.backgroundColor = '#179142';
        });

        dropTarget.addEventListener('mouseleave', () => {
            dropTarget.style.transform = 'scale(1)';
            dropTarget.style.transition = 'transform 0.2s ease-out';
            dropTarget.style.backgroundColor = '#1DB954';
        });
    }
}

window.onload = function() {
    initializeDraggableItems();
}