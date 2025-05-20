const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = +lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id === "spaces") {
                staticPassword += " ";
            } else if (option.id === "exc-duplicate") {
                excludeDuplicate = true;
            } else {
                staticPassword += characters[option.id];
            }
        }
    });

    if (excludeDuplicate && passLength > staticPassword.length) {
        alert(`Το μήκος δεν μπορεί να είναι μεγαλύτερο από ${staticPassword.length} όταν δεν επιτρέπονται διπλότυπα.`);
        passLength = staticPassword.length;
        lengthSlider.value = passLength;
        document.querySelector(".pass-length span").innerText = passLength;
    }

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === " ") {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

const updatePassIndicator = () => {
    const length = +lengthSlider.value;
    if (length <= 8) {
        passIndicator.id = "weak";
    } else if (length <= 16) {
        passIndicator.id = "medium";
    } else {
        passIndicator.id = "strong";
    }
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

options.forEach(option => {
    option.addEventListener('change', () => {
        updateSlider();
    });
});

copyIcon.addEventListener("click", () => {
    if(passwordInput.value){
        navigator.clipboard.writeText(passwordInput.value);
        copyIcon.innerText = "check";
        copyIcon.style.color = "#4285f4";
        setTimeout(() => {
            copyIcon.innerText = "copy_all";
            copyIcon.style.color = "#707070";
        }, 1500);
    }
});

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

updateSlider();
