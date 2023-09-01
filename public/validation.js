/// add validataion when user enter any youtuber's birthday

// category list of all youtube category
const categoryList = [
  "Film and Animation",
  "Autos and Vehicles",
  " Music",
  "Pets & Animals",
  "Sports",
  "Travel and Events",
  "Gaming",
  "People and Blogs",
  "Comedy",
  "Entertainment",
  "News and Politics",
  "Education",
  "Science and Technology",
  "How-to and Style",
  "Nonprofits and Activism",
];

// selecting the select option in our add youtuber.ejs file
const selectOptin = document.querySelector("#category");

// map all category list
const mapallcategory = categoryList.map(
  (item) => `<option value="${item}">${item}</option>`
);
//display all the category to addyoutuber
selectOptin.innerHTML = mapallcategory;

// all error element function it's return an object of element
const Errorselement = () => {
  const youtubernameerror = document.querySelector("#nameerror");
  const birthdayerror = document.querySelector("#birthdayerror");
  const totalViewserror = document.querySelector("#totalViewserror");
  const youtublinkerror = document.querySelector("#linkerror");

  return {
    youtubernameerror,
    totalViewserror,
    birthdayerror,
    youtublinkerror,
  };
};

//validation function for form
const validation = (e) => {
  e.preventDefault();
  const buttonaddyoutuber = document.querySelector("#button-addyoutber");
  const youtubername = document.querySelector("#name").value;
  const birthday = document.querySelector("#birthday").value;
  const totalViews = document.querySelector("#totalViews").value;
  const youtublink = document.querySelector("#link").value;

  const { youtubernameerror, birthdayerror, totalViewserror, youtublinkerror } =
    Errorselement();

  // validation code start here
  //validation code for name
  youtubername.trim();
  if (youtubername.length < 1) {
    youtubernameerror.innerText = "Name Can't be empty";
  } else {
    if (youtubername.length < 4) {
      youtubernameerror.innerText = "Name must have 4 charecter's";
    } else {
      youtubernameerror.innerText = "";
    }
  }

  //validation code for birthday

  birthday.trim();
  function GetAge() {
    let dob = new Date(birthday);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return age;
  }
  if (birthday.length < 1) {
    birthdayerror.innerText = "Birthday Can't be empty";
  } else {
    if (GetAge() < 5) {
      birthdayerror.innerText = "Age can't be Less then 5 ";
    } else {
      birthdayerror.innerText = "";
    }
  }

  //validation code for total views
  // 100000
  totalViews.trim();

  if (totalViews.length < 1) {
    totalViewserror.innerText = "Totalviews Can't be empty";
  } else {
    if (totalViews.length < 6) {
      totalViewserror.innerText = "Minimum have 100k Subscriber";
    } else {
      let sliceto100k = totalViews.slice(0, 6);
      if (isNaN(sliceto100k)) {
        totalViewserror.innerText = "Not a valid view's";
      } else {
        if (+sliceto100k < 100000) {
          totalViewserror.innerText = "Not have Enough subscriber";
        } else {
          totalViewserror.innerText = "";
        }
      }
    }
  }

  //validation code for youtublink
  let urlregex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#&//=]*)/g;
  youtublink.trim();

  if (youtublink.length < 1) {
    youtublinkerror.innerText = "Link Can't be empty";
  } else {
    let validateLink = youtublink.match(urlregex);
    if (validateLink) {
      let accepted =
        validateLink[0].slice(0, 29) === "https://www.youtube.com/watch";
      if (accepted && validateLink) {
        youtublinkerror.innerText = "";
      } else {
        youtublinkerror.innerText = "Please Provide Valid Link";
      }
    } else {
      youtublinkerror.innerText = "Please Provide Valid Link";
    }
  }

  if (
    youtubernameerror.innerText === "" &&
    totalViewserror.innerText === "" &&
    birthdayerror.innerText === "" &&
    youtublinkerror.innerText === ""
  ) {
    buttonaddyoutuber.setAttribute("disabled", true);
    buttonaddyoutuber.classList.add("disableButton");
    e.currentTarget.submit();
  }
};