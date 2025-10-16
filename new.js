const BASE_URL = "https://open.er-api.com/v6/latest";

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let currCode in countryList) {
  let option1 = document.createElement("option");
  option1.value = currCode;
  option1.textContent = currCode;
  fromCurr.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = currCode;
  option2.textContent = currCode;
  toCurr.appendChild(option2);
}

// Set default selections
fromCurr.value = "USD";
toCurr.value = "INR";

// Update flag images
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  if (!countryCode) return;
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  if (img) img.src = newSrc;
};

fromCurr.addEventListener("change", () => updateFlag(fromCurr));
toCurr.addEventListener("change", () => updateFlag(toCurr));

// Initial flag setup
updateFlag(fromCurr);
updateFlag(toCurr);

// Fetch and display exchange rate


// Fetch and display exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error("Network response was not ok");
    let data = await response.json();
    let rate = data.rates[toCurr.value]; // Correct way to access the rate
    if (!rate) throw new Error("Invalid currency code");
    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate. Please try again.";
    console.error(error);
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});
