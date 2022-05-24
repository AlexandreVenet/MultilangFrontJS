"use strict;"

// ---------- VARIABLES

let jsonParsed;

let 
    DOMhtml,
    DOMtitle;
    
let 
    DOMtitre,
    DOMparagraphe,
    DOMboutonEN,
    DOMboutonFR;

// ---------- METHODES

// Chargement de fichier général
function ChargerFichier(page,callback){
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(xhr.response);
		}
	};
	xhr.open("GET", page, true);
	xhr.send();
}

// Charger et traiter fichier json 
function ChargerJson(path)
{
    ChargerFichier(path,(resp)=>
    {
        jsonParsed = JSON.parse(resp);
        
        // HTML attribut lang
        DOMhtml.lang = jsonParsed.htmlLang;
        // head -> title
        DOMtitle.text = jsonParsed.titre;
        // Contenu du body
        DOMtitre.innerHTML = jsonParsed.titre;
        DOMparagraphe.innerHTML = jsonParsed.paragraphe;
        DOMboutonEN.innerHTML = jsonParsed.boutonEN;
        DOMboutonFR.innerHTML = jsonParsed.boutonFR;
    });
}

// ---------- LANCEMENT

document.addEventListener("DOMContentLoaded", ()=>{

    DOMhtml = document.querySelector("html");
    DOMtitle = document.querySelector("title");

	DOMtitre = document.getElementById("titre");
    DOMparagraphe = document.getElementById("paragraphe");
    DOMboutonEN = document.getElementById("boutonEN");
    DOMboutonFR = document.getElementById("boutonFR");

    ChargerJson("locales/en.json");

    DOMboutonEN.addEventListener("click", ()=>
    {
        ChargerJson("locales/en.json");
    });

    DOMboutonFR.addEventListener("click", ()=>
    {
        ChargerJson("locales/fr.json");
    });
});