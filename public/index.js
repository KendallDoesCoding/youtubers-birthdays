// Selecting target elements
const table = document.querySelector("table");
const rows = table.querySelectorAll("tr");
const rowsLength = rows.length - 1; // exclude header row
const cellsLength = rows[0].querySelectorAll("th, td").length;
const rowsPerPage = 8;
let currentPage = 1;
const pagination = document.getElementById("pagination");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

const totalPages = Math.ceil(rowsLength / rowsPerPage);

// Youtuber count element above table
const count = document.querySelector(".count");

// List current page below table
const currentPageCount = document.querySelector(".currentPage");
const totalPageCount = document.querySelector(".totalPages");

function showPage(page) {
  //Showing the table data According to Row length and row page

  const startIndex = (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, rowsLength);

  for (let i = 1; i <= rowsLength; i++) {
    const row = rows[i];

    if (i >= startIndex && i <= endIndex) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

function updatePaginationDiv() {
  //update pagination div according to current page and total pages.

  leftBtn.disabled = currentPage === 1;
  rightBtn.disabled = currentPage === totalPages;
  // update
  currentPageCount.textContent = `${currentPage}`;
  totalPageCount.textContent = `${totalPages}`;
}

showPage(currentPage);
updatePaginationDiv();

leftBtn.addEventListener("click", () => {
  currentPage--;
  showPage(currentPage);
  updatePaginationDiv();
});

rightBtn.addEventListener("click", () => {
  currentPage++;
  showPage(currentPage);
  updatePaginationDiv();
});

// Display Total Youtuber count in table
count.textContent = `${rowsLength}`;

//This is the code for the search bar

function filterTable() {
  // Get the search input and table elements
  var input = document.getElementById("search-input");
  var table = document.getElementById("table");

  // Get all the table rows except the first one (header)
  var rows = table.tBodies[0].getElementsByTagName("tr");

  // Loop through all the rows and hide those that don't match the search query
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var match = false;
    for (var j = 0; j < cells.length; j++) {
      var query = input.value.trim().toLowerCase(); // Convert query to lowercase and trim whitespace
      var cellText = cells[j].innerHTML.toLowerCase(); // Convert cell contents to lowercase
      if (cellText.indexOf(query) !== -1) {
        // Compare lowercase query with lowercase cell contents
        match = true;
        break;
      }
    }
    if (match) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function sortTableAndToggleArrow(columnName) {
  var arrowElement = document.getElementById(columnName + "-arrow");
  var currentDirection = arrowElement.getAttribute("data-direction") || "desc";

  // Toggle arrow direction
  currentDirection = currentDirection === "asc" ? "desc" : "asc";

  // Set arrow visualization based on direction
  arrowElement.innerHTML = '<span class="arrow ' + (currentDirection === "desc" ? "up" : "down") + '"></span>';
  arrowElement.setAttribute("data-direction", currentDirection);

  // Sort the table
  sortTable(columnName, currentDirection);
}

function sortTable(columnName, direction) {
  var table = document.getElementById("table");
  var tbody = table.tBodies[0];
  var rows = Array.from(tbody.getElementsByTagName("tr"));
  var columnIndex = getColumnIndex(columnName); // Get the index of the clicked column
  // Sorting logic
  rows.sort(function (a, b) {
    var x = a.getElementsByTagName("td")[columnIndex].innerHTML.toLowerCase();
    var y = b.getElementsByTagName("td")[columnIndex].innerHTML.toLowerCase();

    if (columnName == "totalViews") {
      x = convertViewsStringToNumber(x);
      y = convertViewsStringToNumber(y);
    }

    if (direction === "asc") {
      return x > y ? 1 : -1;
    } else {
      return x < y ? 1 : -1;
    }
  });

  // Reorder the rows in the table
  for (var i = 0; i < rows.length; i++) {
    tbody.appendChild(rows[i]);
  }
}

function getColumnIndex(columnName) {
  if (columnName == 'category')
    return 0;
  else if (columnName == 'totalViews')
    return 3;
}


const convertViewsStringToNumber = (formattedCount) => {
  const match = formattedCount.match(/([\d.]+)\s*(billion|million)?/i);

  if (!match) {
    // Invalid format, return as is
    return parseFloat(formattedCount);
  }

  const numericValue = parseFloat(match[1]);
  const unit = (match[2] || "").toLowerCase(); // Use an empty string if unit is undefined

  switch (unit) {
    case "billion":
      return numericValue * 1000000000;
    case "million":
      return numericValue * 1000000;
    default:
      return numericValue;
  }
};

var input = document.getElementById("search-input");
input.addEventListener("input", filterTable);
