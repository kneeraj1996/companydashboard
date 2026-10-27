function capitalizeFirstLetter(str) {
  if (!str) return ""; // Handle empty strings safely
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const checkValidData = (email, password, name, isSignInForm) => {

    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if(!isSignInForm && name.length < 2) return 'Full name is not valid';
    if(!isEmailValid) return 'Email ID is not valid';
    if(!isPasswordValid) return 'Password is not valid';

    return null;
}

function generate3DigitNumber() {
  return Math.floor(Math.random() * 900) + 100;
}

// 1. Get the complete current date and time
const now = new Date();
console.log("Full Date & Time String:", now.toString());

// 2. Format individual date components cleanly
const formattedDate = now.toLocaleDateString(); // e.g., "10/27/2026"
const formattedTime = now.toLocaleTimeString(); // e.g., "2:50:15 PM"

console.log("Formatted Date:", formattedDate);
console.log("Formatted Time:", formattedTime);

// 3. Determine if it is Morning, Afternoon, or Evening
const currentHour = now.getHours(); // Returns 0 - 23
let timeOfDay = "";

if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "Morning";
} else if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = "Afternoon";
} else if (currentHour >= 17 && currentHour < 21) {
    timeOfDay = "Evening";
} else {
    timeOfDay = "Night";
}

console.log(`Right now, it is the: ${timeOfDay}`);




export { 
    checkValidData,
    capitalizeFirstLetter,
    generate3DigitNumber,
    formattedDate,
    formattedTime,
    timeOfDay
};

