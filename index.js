// https://restcountries.com/v3.1/all
const search = document.getElementById("inputSearch");
const range = document.getElementById("inputRange");
const rangeDisplay = document.getElementById("rangeValue");
const result = document.querySelector(".countries-container");
const btnTri = document.querySelectorAll(".btnSort");

let countriesData = [];
let countrySort = "alpha";

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
const fetchCountry = async () => {
    await fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => {
            countriesData = data;
        })
        countryDisplay();
}

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
const countryDisplay = () => {
    result.innerHTML = countriesData
        .filter((country) => country.translations.fra.common.toLowerCase().includes(search.value.toLowerCase()))
        .sort((a, b) => {
            if (countrySort === "maxToMin") {
                return b.population - a.population;
            } else if (countrySort === "minToMax") {
                return a.population - b.population;
            } else if (countrySort === "alpha") {
                return (a.translations.fra.common.localeCompare(b.translations.fra.common));
            }
        })
        .slice(0, range.value)
        .map((country) => {
            return`
                <div class="card">
                    <img src=${country.flags.svg}>
                    <h2>${country.translations.fra.common}</h2>
                    <h4>${country.capital}</h4>
                    <p>${country.population.toLocaleString()}</p>
                </div>
            `
        }).join("");
}
window.addEventListener("load", fetchCountry);
// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
search.addEventListener("input", countryDisplay);
// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
range.addEventListener("input", () => {
    rangeDisplay.textContent = range.value;
    countryDisplay();
})
// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
btnTri.forEach((btn) => {
    btn.addEventListener("click", () => {
        countrySort = btn.id;
        countryDisplay();
    })
});