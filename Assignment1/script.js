function formatNumber(num, maxLength) {
    const numStr = num.toString();
    if (numStr.length > maxLength) {
        const exponent = Math.floor(Math.log10(Math.abs(num)));
        const coefficient = num / Math.pow(10, exponent);
        return `${coefficient.toFixed(2)}e${exponent}`;
    }
    return num.toLocaleString();
}

document.addEventListener("DOMContentLoaded", () => {
    
    const rowInput = document.getElementById("rowCount");
    const colInput = document.getElementById("colCount");
    const container = document.getElementById("tableContainer");
    const tableBody = document.getElementById("inputTable");
    const tableNotes = document.getElementById("tableNotes");
    const tableButton = document.getElementById("tableButton");

    const rowHeight = 75;
    const colWidth = 75;

    let totalRows = 0;
    let totalCols = 0;

    const visibleRows = Math.ceil(container.clientHeight / rowHeight);
    const visibleCols = Math.ceil(container.clientWidth / colWidth);

    const buffer = 20;

    let startRow = 0;
    let startCol = 0;

    let endRow = 0;
    let endCol = 0;
    
    function renderRows() {
        tableBody.innerHTML = '';

        const topGhostHeight = startRow * rowHeight;
        const bottomGhostHeight = (totalRows - endRow) * rowHeight;

        const leftGhostWidth = startCol  * colWidth;
        const rightGhostWidth = (totalCols - endCol) * colWidth;
        
        const fragment = document.createDocumentFragment();

        const ghostStartTr = document.createElement("tr"); 
        ghostStartTr.style.height = `${topGhostHeight}px`;
        fragment.appendChild(ghostStartTr);

        for (let i = startRow; i < endRow; i++) {
            const tr = document.createElement("tr");
            tr.style.display = 'flex';
 
            const ghostStartTd = document.createElement("td"); 
            ghostStartTd.style.width = `${leftGhostWidth}px`;
            tr.appendChild(ghostStartTd);

            for (let j = startCol; j < endCol; j++) {
                const td = document.createElement("td");
                td.className = "tableCell";
                td.id = `cell-${i}-${j}`;
                td.style.display = 'flex';
                td.style.height = `${rowHeight}px`;
                td.style.width = `${colWidth}px`;
                td.style.border = '1px solid #eee';
                td.style.textAlign = 'center';
                td.style.justifyContent = 'center';
                td.style.alignItems = 'center';   
                td.style.position = 'relative';
                td.textContent = formatNumber((i + 1) * (j + 1), 6);

                // Alternate background color
                let value = (totalRows + totalCols) - (i + j);
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
                cornerValue.style.background = 'transparent';
                cornerValue.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                cornerValue.style.whiteSpace = 'pre'; 
                cornerValue.style.pointerEvents = 'none';
                cornerValue.textContent = `R: ${(i + 1).toLocaleString()}\nC: ${(j + 1).toLocaleString()}`;
                
                td.appendChild(cornerValue);
                
                td.addEventListener('mouseover', (event) => {
                    event.target.style.backgroundColor = `#630000`;
                    event.target.style.color = `#fff`;
                    cornerValue.style.color = `#fff`;
                });
        
                td.addEventListener('mouseout', (event) => {
                    event.target.style.backgroundColor = `#${colorBackgroundValue}${colorBackgroundValue}${colorBackgroundValue}`;
                    event.target.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                    cornerValue.style.color = `#${colorFontValue}${colorFontValue}${colorFontValue}`;
                });

                tr.appendChild(td);
            }
            
            const ghostEndTd = document.createElement("td");  
            ghostEndTd.style.width = `${rightGhostWidth}px`;
            tr.appendChild(ghostEndTd);

            fragment.appendChild(tr);
        }
        
        const ghostEndTr = document.createElement("tr"); 
        ghostEndTr.style.height = `${bottomGhostHeight}px`;
        fragment.appendChild(ghostEndTr);

        tableBody.appendChild(fragment);
    }

    function handleTableButton() {
        const rowCount = rowInput.value;
        const colCount = colInput.value;
    
        totalRows = Math.max(0, rowCount || 0);
        totalCols = Math.max(0, colCount || 0);

        startRow = 0;
        startCol = 0;

        endRow = Math.min(totalRows, visibleRows + buffer);
        endCol = Math.min(totalCols, visibleCols + buffer);
        
        const cellCount = document.getElementById("cellCount");
        cellCount.innerHTML = (rowCount * colCount).toLocaleString();

        tableNotes.remove();

        renderRows();
    }
    
    tableButton.addEventListener("click", handleTableButton);

    container.addEventListener("scroll", () => {
        const scrollTop = container.scrollTop;
        const scrollLeft = container.scrollLeft;

        // Virtual positioning
        const top = Math.max(0, Math.ceil(scrollTop / rowHeight - buffer));
        const bottom = Math.min(totalRows, top + visibleRows + buffer);

        const left = Math.max(0, Math.ceil(scrollLeft / colWidth - buffer));
        const right = Math.min(totalCols, left + visibleCols + buffer);
        
        startRow = top;
        startCol = left;

        endRow = bottom;
        endCol = right;

        renderRows();
    });
    
    function handleInput(e) {
        if (e.target.value < 0) e.target.value = '';
        else if (e.target.value > 596_523) e.target.value = 596_523;
    }

    rowInput.addEventListener("input", handleInput);
    colInput.addEventListener("input", handleInput);

    renderRows();
});