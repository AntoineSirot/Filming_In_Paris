
const api_url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=date_debut&facet=date_fin&facet=geo_point_2d";


async function searchPage(x) {
    let start = document.getElementById("PageNumber").value;
    if (x == 0) {
        start = 0;
    }
    if (start < 0) {
        start = 0;
    }
    start *=30
    const api_url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=30&start=" + start + "&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin";
    const response = await fetch(api_url);
    // Parsing it to JSON format
    const data = await response.json();
    let s = "<table class=\"centerTable\" cellspacing=\"5\"> <tr> <th>Nom du film</th> <th>Réalisateur</th> <th>Producteur</th> <th>Date début</th> <th>Date fin</th> </tr>";
    for (i = 0; i < data.records.length; i++) {
        s += "<tr> <td> <button type=\"button\" onclick=\"getMap(" + data.records[i].fields.geo_point_2d[0] + "," + data.records[i].fields.geo_point_2d[1] + ",\'" + data.records[i].fields.nom_tournage  + "\');\">" + data.records[i].fields.nom_tournage  + "</button></td><td>" + data.records[i].fields.nom_realisateur + "</td> <td>" + data.records[i].fields.nom_producteur + "</td> <td>" + data.records[i].fields.date_debut + "</td> <td>" +data.records[i].fields.date_fin + "</td> </tr>";
    }
    s += "</table>";
    document.getElementById("result").innerHTML = s;
    

}
searchPage();

async function getNomTournage(){

    let nomTournage = document.getElementById("NomTournage").value;
    if (nomTournage == "") {
        nomTournage = "30 Jours Max";
    }
    const api_url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&rows=8&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=nom_producteur&facet=ardt_lieu&facet=date_debut&facet=date_fin&refine.nom_tournage=" + nomTournage;
    const response = await fetch(api_url);
    // Parsing it to JSON format
    const data = await response.json();
    let s = "<table class=\"centerTable\" cellspacing=\"5\"> <tr> <th>Nom du film</th> <th>Réalisateur</th> <th>Producteur</th> <th>Date début</th> <th>Date fin</th> </tr>";
    for (i = 0; i < data.records.length; i++) {
        s += "<tr> <td> <button type=\"button\" onclick=\"getMap(" + data.records[i].fields.geo_point_2d[0] + "," + data.records[i].fields.geo_point_2d[1] + ",\'" + data.records[i].fields.nom_tournage  + "\');\">" + data.records[i].fields.nom_tournage  + "</button></td><td>" + data.records[i].fields.nom_realisateur + "</td> <td>" + data.records[i].fields.nom_producteur + "</td> <td>" + data.records[i].fields.date_debut + "</td> <td>" +data.records[i].fields.date_fin + "</td> </tr>";
    }
    s += "</table>";
    document.getElementById("result").innerHTML = s;
}

async function getMap(s2,s3,s4) {
    console.log(s2, s3);
    let s1 = "<br><a class = \"Title\"> Localisation </a><br><p> Nom du film : "+s4.toString()+"</p><iframe width=\"425\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://www.openstreetmap.org/export/embed.html?bbox=1.7591857910156252%2C48.60067914322632%2C2.7479553222656254%2C48.94685707023662&amp;layer=mapnik&amp;marker=" + s2 + "%2C" + s3 + "\" style=\"border: 1px solid black\"></iframe><br/><small><a href=\"https://www.openstreetmap.org/?mlat=48.7741&amp;mlon=2.2536#map=11/48.7741/2.2536\">Afficher une carte plus grande</a></small>";
    document.getElementById("map").innerHTML = s1;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

