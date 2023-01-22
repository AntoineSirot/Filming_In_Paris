
// Create a variable to store the data and use it if it's already been fetched : 
let storedData = JSON.parse(localStorage.getItem('storedData')) || {};

// API URL :
const api_url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=1000&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";

// Print the first page of results :
searchPage(1);

// Function to print datas depending on the page number :
async function searchPage(x) {
    let start = document.getElementById("PageNumber").value;
    if (x ==1) {
        start = 1;
        document.getElementById("NomTournage").value = "";
    }
    if (start < 1) {
        start = 1;
        alert("Le numéro de page est trop bas, il a été réinitialisé à 1");
    }
    start -=1;
    start *=15

    // Only make the API call if the storedData variable is empty :
    if (Object.keys(storedData).length === 0) {
        const response = await fetch(api_url);
        storedData = await response.json();
    }

    let s = "<table class=\"centerTable\" cellspacing=\"5\"> <tr> <th>Nom du film</th> <th>Réalisateur</th> <th>Producteur</th> <th>Date début</th> <th>Date fin</th> </tr>";
    
    for (i = start; i < start+15; i++) {
        s += "<tr> <td> <button type=\"button\" onclick=\"getMap(" + storedData.records[i].fields.geo_point_2d[0] + "," + storedData.records[i].fields.geo_point_2d[1] + ",\'" + storedData.records[i].fields.nom_tournage  + "\');\">" + storedData.records[i].fields.nom_tournage  + "</button></td><td>" + storedData.records[i].fields.nom_realisateur + "</td> <td>" + storedData.records[i].fields.nom_producteur + "</td> <td>" + storedData.records[i].fields.date_debut + "</td> <td>" +storedData.records[i].fields.date_fin + "</td> </tr>";
    }
    s += "</table>";
    document.getElementById("result").innerHTML = s;
}



// Function to print datas depending on the name of the movie :
async function getNomTournage(){
    let nomTournage = document.getElementById("NomTournage").value;
    if (nomTournage == "") {
        nomTournage = "30 Jours Max";
    }

    // Filter the storedData variable based on the nomTournage input value
    const filteredData = storedData.records.filter(record => record.fields.nom_tournage.toUpperCase().includes(nomTournage.toUpperCase()));

    let s = "<table class=\"centerTable\" cellspacing=\"5\"> <tr> <th>Nom du film</th> <th>Réalisateur</th> <th>Producteur</th> <th>Date début</th> <th>Date fin</th> </tr>";
    for (i = 0; i < filteredData.length; i++) {
        s += "<tr> <td> <button type=\"button\" onclick=\"getMap(" + filteredData[i].fields.geo_point_2d[0] + "," + filteredData[i].fields.geo_point_2d[1] + ",\'" + filteredData[i].fields.nom_tournage  + "\');\">" + filteredData[i].fields.nom_tournage  + "</button></td><td>" + filteredData[i].fields.nom_realisateur + "</td> <td>" + filteredData[i].fields.nom_producteur + "</td> <td>" + filteredData[i].fields.date_debut + "</td> <td>" + filteredData[i].fields.date_fin + "</td> </tr>";
    }
    s += "</table>";
    document.getElementById("result").innerHTML = s;
}

// Function to print map depending on the button the user clicked on : 
async function getMap(s2,s3,s4) {
    console.log(s2, s3);
    let s1 = "<h2> Localisation </h2><br><p> Nom du film : "+s4.toString()+"</p><iframe width=\"425\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://www.openstreetmap.org/export/embed.html?bbox=1.7591857910156252%2C48.60067914322632%2C2.7479553222656254%2C48.94685707023662&amp;layer=mapnik&amp;marker=" + s2 + "%2C" + s3 + "\" style=\"border: 1px solid black\"></iframe><br/><small><a href=\"https://www.openstreetmap.org/?mlat=48.7741&amp;mlon=2.2536#map=11/48.7741/2.2536\">Afficher une carte plus grande</a></small>";
    document.getElementById("map").innerHTML = s1;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

