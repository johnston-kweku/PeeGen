const slider = document.getElementById("length")
const displayValue = document.getElementById("length-value")
const generate = document.getElementById("generate")
const loader = document.getElementById("loader")
const text = document.getElementById("gen-text")
const password = document.getElementById("password")
const copy = document.getElementById("copy")
const caps = document.getElementById("caps")
const lower = document.getElementById("lower")
const num = document.getElementById("num")
const sym = document.getElementById("sym")
const strengthFill = document.getElementById("strength-fill")
const strengthLabel = document.getElementById("strength-label")


displayValue.textContent = slider.value

slider.addEventListener("input", function() {
    displayValue.textContent = slider.value
})


let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lowerCase = upperCase.toLowerCase()
let numbers = "1234567890"
let symbols = "!@#$%^&*(){}[]/?>"



let allChars = [upperCase, lowerCase, numbers, symbols]





generate.addEventListener("click", () => {
    loader.src = "/images/load.png"
    loader.classList.add("animate-spin")
    text.textContent = "Generating Password..."
    password.textContent = ""
    setTimeout(() => {
        let full = "";
        if(caps.checked) full += allChars[0];
        if(lower.checked) full += allChars[1];
        if(num.checked) full += allChars[2];
        if(sym.checked) full += allChars[3];

        if(!full){
            password.textContent = "Select at least one option"
            loader.classList.remove("animate-spin")
            text.textContent = "Generate Password"
            loader.src = ""
            return;
        }


        for(let i = 0; i < slider.value; i++) {
            let charIndex = Math.floor(Math.random() * full.length)
            
            password.textContent += full[charIndex]
        }
        let strength = 0
        for (let set of allChars) {
            for(let char of set) {
                if (password.textContent.includes(char)){
                    strength +=1
                    break;
                }
            }
        }
        strengthFill.style.width = `${strength * 25}%`
        if(strength === 1) {
            strengthLabel.textContent = "Very Weak"
            strengthFill.style.backgroundColor = "red"
        }else if( strength === 2) {
            strengthLabel.textContent = "Weak"
            strengthFill.style.backgroundColor = "red"
        }else if(strength === 3) {
            strengthLabel.textContent = "Strong"
            strengthFill.style.backgroundColor = "yellow"
        }else{
            strengthLabel.textContent = "Very Strong"
            strengthFill.style.backgroundColor = "green"
        }
        loader.src = ""
        text.textContent = "Generate Password"
    }, 500)
})

copy.addEventListener("click", () => {
    const textToCopy = password.textContent
    if(!textToCopy) return;
    if(password.textContent != "Select at least one option") {
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            copy.src = "/images/tick.svg";
            copy.style.filter = "invert(48%) sepia(92%) saturate(394%) hue-rotate(85deg)";
            setTimeout(() => {
                copy.src = "/images/copy-svgrepo-com.svg"
                copy.style.filter = ""
            }, 1500)
        })
        .catch(err => {
            console.error("Failed to copy", err)
        });
    }

})







