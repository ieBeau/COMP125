
function formatNumber(num, maxLength) {
    const numStr = num.toString();
    if (numStr.length > maxLength) {
        const exponent = Math.floor(Math.log10(Math.abs(num)));
        const coefficient = num / Math.pow(10, exponent);
        return `${coefficient.toFixed(2)}e${exponent}`;
    }
    return num;
}

document.addEventListener("DOMContentLoaded", () => {
    
    const rowInput = document.getElementById("rowCount");
    const colInput = document.getElementById("colCount");
    const container = document.getElementById("tableContainer");
    const tableBody = document.getElementById("myTable");
    const tableNotes = document.getElementById("tableNotes");
    const tableButton = document.getElementById("tableButton");

    // Configurations
    const rowHeight = 75;  // Height of each row (in px)
    const colWidth = 75; // Width of each column (in px)

    let numRows = 0; // Total rows
    let numCols = 0; // Total columns

    const visibleRows = Math.ceil(container.clientHeight / rowHeight);
    const visibleCols = Math.ceil(container.clientWidth / colWidth);

    const buffer = 30;

    let startRow = 0;
    let startCol = 0;

    let endRow = 0;
    let endCol = 0;
    

    // Render rows
    function renderRows() {
        tableBody.innerHTML = ''; // Clear old rows

        const topGhostHeight = startRow * rowHeight;
        const bottomGhostHeight = (numRows - endRow) * rowHeight;

        const leftGhostWidth = startCol  * colWidth;
        const rightGhostWidth = (numCols - endCol) * colWidth;
        
        const fragment = document.createDocumentFragment();

        const ghostStartTr = document.createElement("div"); 
        ghostStartTr.style.height = `${topGhostHeight}px`;
        fragment.appendChild(ghostStartTr);

        for (let i = startRow; i < endRow; i++) {
            const tr = document.createElement("div");
            tr.style.display = 'flex';

            const ghostStartTd = document.createElement("div"); 
            ghostStartTd.style.width = `${leftGhostWidth}px`;
            tr.appendChild(ghostStartTd);

            for (let j = startCol; j < endCol; j++) {
                const td = document.createElement("div");
                td.className = "tableCell";
                td.id = `cell-${i}-${j}`;
                td.style.display = 'flex';
                td.style.height = `${rowHeight}px`;
                td.style.width = `${colWidth}px`;
                td.style.border = '1px solid #eee';
                td.style.textAlign = 'center';
                td.style.justifyContent = 'center';
                td.style.alignItems = 'center';
                td.textContent = formatNumber((i + 1) * (j + 1), 6);

                // Alternate background color
                let value = (numRows + numCols) - (i + j);
                if (Math.floor(value / 256) % 2 === 0) value = 255 - (value % 256);
                else value %= 256;

                const colorBackgroundValue = (value).toString(16).padStart(2, '0'); 
                td.style.backgroundColor = `#${colorBackgroundValue}${colorBackgroundValue}${colorBackgroundValue}`;

                const colorFontValue = parseInt(colorBackgroundValue, 16) > 154 ? '00' : 'FF';
                td.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                
                const cornerValue = document.createElement('div');
                cornerValue.id = "cornerValue";
                cornerValue.style.position = 'absolute';
                cornerValue.style.top = '0';
                cornerValue.style.left = '0';
                cornerValue.style.width = '100%';
                cornerValue.style.textAlign = 'left';
                cornerValue.style.fontSize = '10px';
                cornerValue.style.margin = '3px';
                cornerValue.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                cornerValue.textContent = `R: ${i + 1}\nC: ${j + 1}`;
                cornerValue.style.whiteSpace = 'pre';    
                td.style.position = 'relative';
                
                td.addEventListener('mouseover', (event) => {
                    event.target.style.backgroundColor = `#630000`;
                    event.target.style.color = `#fff`;
                    cornerValue.style.backgroundColor = `#630000`;
                    cornerValue.style.color = `#fff`;
                    // cornerValue.style.background = 'transparent';
                });
        
                td.addEventListener('mouseout', (event) => {
                    event.target.style.backgroundColor = `#${colorBackgroundValue}${colorBackgroundValue}${colorBackgroundValue}`;
                    event.target.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                    cornerValue.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                    cornerValue.style.background = 'transparent';
                });

                td.appendChild(cornerValue);

                tr.appendChild(td);
            }
            
            const ghostEndTd = document.createElement("div"); 
            ghostEndTd.style.width = `${rightGhostWidth}px`;
            tr.appendChild(ghostEndTd);

            fragment.appendChild(tr);
        }
        
        const ghostEndTr = document.createElement("div"); 
        ghostEndTr.style.height = `${bottomGhostHeight}px`;
        fragment.appendChild(ghostEndTr);

        tableBody.appendChild(fragment);
    }

    function handleTableButton() {
        const rowCount = rowInput.value;
        const colCount = colInput.value;
    
        numRows = Math.max(0, rowCount || 0); // Total rows
        numCols = Math.max(0, colCount || 0); // Total columns

        startRow = 0;
        startCol = 0;

        endRow = Math.min(numRows, visibleRows + buffer);
        endCol = Math.min(numCols, visibleCols + buffer);
        
        const cellCount = document.getElementById("cellCount");
        cellCount.innerHTML = (rowCount * colCount).toLocaleString();

        tableNotes.outerHTML = '';

        renderRows();
    }
    
    // Attach table event
    tableButton.addEventListener("click", handleTableButton);

    // Attach scroll event
    container.addEventListener("scroll", () => {
        const scrollTop = container.scrollTop;
        const scrollLeft = container.scrollLeft;

        // Virtual positioning
        const top = Math.max(0, Math.ceil(scrollTop / rowHeight - buffer));
        const bottom = Math.min(numRows, top + visibleRows + buffer);

        const left = Math.max(0, Math.ceil(scrollLeft / colWidth - buffer));
        // const right = Math.min(numCols, Math.ceil(scrollLeft / colWidth + visibleCols + buffer));
        const right = Math.min(numCols, left + visibleCols + buffer);
        
        startRow = top;
        startCol = left;

        endRow = bottom;
        endCol = right;

        renderRows();
    });
    
    function handleInput(e) {
        if (e.target.value < 0) e.target.value = 0;
        else if (e.target.value > 596_523) e.target.value = 596_523;
    }

    // Attach input event
    rowInput.addEventListener("input", handleInput);
    colInput.addEventListener("input", handleInput);

    // Initial render
    renderRows();
});