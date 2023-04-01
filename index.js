// Selecting target elements
const table = document.querySelector('table');
const rows = table.querySelectorAll('tr');
const rowsLength = rows.length - 1; // exclude header row
const cellsLength = rows[0].querySelectorAll('th, td').length;
const rowsPerPage = 8;
let currentPage = 1;
const pagination = document.getElementById('pagination');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

const totalPages = Math.ceil(rowsLength / rowsPerPage);

// Youtuber count element above table
const count = document.querySelector('.count');

// List current page below table
const  currentPageCount = document.querySelector('.currentPage');
const  totalPageCount = document.querySelector('.totalPages');

function showPage(page) {
    const startIndex = (page - 1) * rowsPerPage + 1;
    const endIndex = Math.min(startIndex + rowsPerPage - 1, rowsLength);

    for (let i = 1; i <= rowsLength; i++) {
        const row = rows[i];

        if (i >= startIndex && i <= endIndex) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function updatePaginationDiv() {
    leftBtn.disabled = currentPage === 1;
    rightBtn.disabled = currentPage === totalPages;
    // update
    currentPageCount.textContent = `${currentPage}`
    totalPageCount.textContent = `${totalPages}`
}

showPage(currentPage);
updatePaginationDiv();

leftBtn.addEventListener('click', () => {
    currentPage--;
    showPage(currentPage);
    updatePaginationDiv();
});

rightBtn.addEventListener('click', () => {
    currentPage++;
    showPage(currentPage);
    updatePaginationDiv();
});

// Display Total Youtuber count in table
count.textContent = `${rowsLength}`