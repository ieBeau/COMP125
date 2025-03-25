// scripts.js

const containerDraggable = document.getElementById('draggable-albums');
const containerDropTargets = document.getElementById('drop-targets');

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.closest('.draggable-image').id);
    containerDraggable.style.border = '2px solid rgb(9, 56, 25)';
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedContainer = document.getElementById(data);
    if (event.target.classList.contains("drop-target")) {
        event.target.appendChild(draggedContainer);
    }
    containerDraggable.style.border = '2px solid #1DB954';
}

function dropList(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedContainer = document.getElementById(data);
    if (event.target.classList.contains("drag-targets")) {
        event.target.appendChild(draggedContainer);
    }
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
            albumDiv.ondragstart = drag;

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

        dropTarget.ondrop = drop;
        dropTarget.ondragover = allowDrop;
        containerDropTargets.appendChild(dropTarget);

        dropTarget.addEventListener('dragover', () => {
            dropTarget.style.transform = 'scale(1.01)';
            dropTarget.style.transition = 'transform 0.15s ease-in';
        });
        
        dropTarget.addEventListener('dragleave', () => {
            dropTarget.style.transform = 'scale(1)';
            dropTarget.style.transition = 'transform 0.15s ease-out';
        });

        dropTarget.addEventListener('mouseenter', () => {
            dropTarget.style.transform = 'scale(1.01)';
            dropTarget.style.transition = 'transform 0.15s ease-in';
        });

        dropTarget.addEventListener('mouseleave', () => {
            dropTarget.style.transform = 'scale(1)';
            dropTarget.style.transition = 'transform 0.15s ease-out';
        });
    }
}

window.onload = function() {
    initializeDraggableItems();
}