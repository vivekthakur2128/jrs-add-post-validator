console.log("Content script loaded for add post page");

let activeTabUrl = window.location.href;
// console.log("Active Tab URL: ", activeTabUrl);
let url = new URL(activeTabUrl);
let domainName = url.hostname;
let pathname = url.pathname;
// console.log("Domain Name: ", domainName);
// console.log("Pathname: ", pathname);
let inputs = '';
let blogUrl = '';
let title = '';
let description = '';
let category = '';
let image = '';
let author = '';
let readingTime = '';
let metaKeywords = '';
let submitButton = '';
let codeTextarea = '';
if((domainName === "oxmaint.com" || domainName === "ifactoryapp.com") && (pathname.startsWith("/industries/") && pathname.endsWith("/manage-post-2k26/add_post.php"))) {
    // console.log("Validator extension active");
    inputs = document.querySelectorAll('input[name="title"], input[name="heading"], input[name="descr"], select[name="category_id"], input[name="image"], input[name="author"], input[name="time"], input[name="tags"],  input[name="submit"]');
    blogUrl = inputs[0];
    title = inputs[1];
    description = inputs[2];
    category = inputs[3];
    image = inputs[4];
    author = inputs[5];
    readingTime = inputs[6];
    metaKeywords = inputs[7];
    submitButton = inputs[8];
    checkEmptyFields();
}
else {
    console.log("Validator extension inactive");
}
function checkEmptyFields() {
    // console.log("Checking empty fields");
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "grey";
    submitButton.style.cursor = "not-allowed";
        if((blogUrl.value !== "" && blogUrlHasNoHyphens()) && title.value !== "" && description.value !== "" && category.options[category.selectedIndex].text !== "Select Category" && image.value !== "" && author.value !== "" && readingTime.value !== "" && metaKeywords.value !== "") {
            console.log("All fields are filled");
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "";
            submitButton.style.cursor = "";
        } else {
            // console.log("At least one fild is empty");
        }
}
for (let index = 0; index < inputs.length-1; index++) {
    let inputField = inputs[index];
    inputField.addEventListener('input', function(event) {
    // console.log('Change detected in element:', event.target.value);
    checkEmptyFields();
});
}
function blogUrlHasNoHyphens(){ 
    // console.log(blogUrl.value)
    if((blogUrl.value).includes('-')){
     // wait 4 seconds after typing
    clearTimeout(blogUrl.delayTimer);
    blogUrl.delayTimer = setTimeout(() => {
    blogUrl.value = blogUrl.value.replace(/-/g, " ");
    // console.log(blogUrl.value);
    }, 4000);
}
    return true;
}

// document.querySelector('.rte_command_code').addEventListener('click', function() {
//     codeTextarea = document.querySelector('rte-codebox').querySelector('textarea');
//     if(codeTextarea) {
//         console.log("Code textarea found");
//         codeTextarea.addEventListener('input', function(event) {
//         console.log('Change detected in code textarea:');
//         checkPageCode();
//     });
//     }
//     else {
//         console.log("Code textarea not found");
//         return;
//     }
// });

// function checkPageCode() {
//     console.log("Checking page code content");
//     console.log(codeTextarea);
//     console.log(codeTextarea.value);
//     Document.write("codeTextarea.value");
//     if(codeTextarea.value !== "") {
//         console.log("code text area not empty");
//         if( (codeTextarea.value).startsWith("<p>")) {
//         console.log("Code content is valid");
//         // checkEmptyFields();
//         return true;
//     } 
//     else {
//         console.log("Code content is invalid");
//         // alert("Code content must be start with <p>, end with </style>> and not contain <script> tag.");
//     }
//     }
    
// }
