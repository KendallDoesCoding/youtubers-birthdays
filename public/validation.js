/// add validataion when user enter any youtuber's birthday

// category list of all youtube category
const categoryList = [
  "Autos and Vehicles",
  "Comedy",
  "Comedy/Animation",
  "Education",
  "Entertainment",
  "Film and Animation",
  "Finance",
  "Gaming",
  "How-to and Style",
  "Kids",
  "Music",
  "News and Politics",
  "Nonprofits and Activism",
  "People and Blogs",
  "Pets & Animals",
  "Pranks",
  "Scam-baiting",
  "Science and Technology",
  "Self-Help",
  "Sports",
  "Tech",
  "Travel and Events",
  "Travelling Vlogs",
  "Variety",
  "vlogs",
  "Others",
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
    if (youtubername.length < 3) {
      youtubernameerror.innerText = "Name must have 3 charecter's";
    } else {
      youtubernameerror.innerText = "";
    }
  }


  //validation code for birthday

  birthday.trim();
  if (birthday.length < 1) {
    birthdayerror.innerText = "Birthday Can't be empty";
  } else {
      birthdayerror.innerText = "";  
  }

  //validation code for total views
  // 100000
  totalViews.trim();

  if (totalViews.length < 1) {
    totalViewserror.innerText = "Totalviews Can't be empty";
  } else {
    if (totalViews.length < 6) {
      totalViewserror.innerText = "More than 100k views required";
    } else {
      const sliceto100k = totalViews.slice(0, 6);
      if (isNaN(sliceto100k)) {
        totalViewserror.innerText = "Not a valid views";
      } else {
        if (Number(sliceto100k) < 100000) {
          totalViewserror.innerText = "More than 100k views required";
        } else {
          totalViewserror.innerText = "";
        }
      }
    }
  }


  //validation code for youtublink

  // url regex for checking the link
  const urlregex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?@v=|embed\/|v\/)?)([\w\-@]+)(\S+)?$/g;

  youtublink.trim();
  if (youtublink.length < 1) {
    youtublinkerror.innerText = "Link Can't be empty";
  } else {
    const validateLink = urlregex.test(youtublink);
    if (validateLink) {
      if (validateLink) {
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
