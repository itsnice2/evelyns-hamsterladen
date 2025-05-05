// Globale Variablen
var kontostand = $("#kontostand");
var konto = 1000000000; // TODO: 10
var kosten = 0;
var einkommen = 0;
var hamsterverkauf = 1;
var tage_start = 30;
var tage = tage_start;
var loesungsbutton = "Lösung abschicken";
var selected = 0;
var timeout = 2000; // TODO: 180000 -> 3 Minuten

/*
var geschenk = {
    "Frage": "",
    "Antwort1": "",
    "Antwort2": "",
    "Antwort3": "",
    "Antwort4": "",
    "Lösung": "",
    "Link": ""
};
*/

let geschenk = [];
let aufgabe = [];

// Felder füllen
$("#loader").html(tage + ".")
$("#hamsterpreis").text(hamsterverkauf);
$("#aufgabe-loesung").text(loesungsbutton);
$("#kontostand").text(konto);
$("#kosten").text(kosten);
$("#einkommen").text(einkommen);

// Startfunktionen
hideAll();
show('laden');
fragen_holen();

$(".laden").hide();
$(".laden-update-1").show();
$(".liste-plus").hide();

$(document).ready(function(){

    $("#plus-laden").on("click", function(){
        konto = konto + hamsterverkauf;
        kontostand.html(konto);
    });

    // Zahlungsloop
    setInterval(function(){
        tage = tage - 1;

        if(tage > 1){
            $("#loader").html(tage + ".")
            // Einkommen addieren
            konto = konto + einkommen;
        }
        else{
            $("#loader").html(tage + ".")            
            // Einkommen addieren
            konto = konto + einkommen;
            // Kosten abziehen!!
            konto = konto - kosten;
            tage = tage_start + 1;
        }

        kontostand.text(konto);
        $("#hamsterpreis").text(hamsterverkauf);
        
    },5000);
    
    $("#test").on("click", function(){
         // Nichts...
    });

    $("#frage-form").submit(function(event){
        event.preventDefault();
        //alert(selected);

        if(selected == aufgabe.Lösung){
            $("#antwort" + aufgabe.Lösung + "text").css("color", "green");

            if(einkommen > 0){
                konto = konto + (einkommen * 10);
            }
            else{
                konto = konto + 10;                    
            }

            kontostand.text(konto)
            $("#antwort-link").html("<a href='" + aufgabe.Link + "' target='_blank' id='mehrwissen'>Ich möchte mehr wissen</a>")
            $("#mehrwissen").addClass("antwort-link-richtig");
        }
        else{
            $("#antwort" + aufgabe.Lösung + "text").css("color", "red");
            $("#antwort-link").html("<a href='" + aufgabe.Link + "' target='_blank' id='mehrwissen'>Ich möchte mehr wissen</a>")
            $("#mehrwissen").addClass("antwort-link-falsch");
        }

        setTimeout(function(){
            fragen_holen()
            $("#antwort1text").css("color", "black");
            $("#antwort2text").css("color", "black");
            $("#antwort3text").css("color", "black");
            $("#antwort4text").css("color", "black");
            $("#antwort-link").html("")
            $("#mehrwissen").removeClass("antwort-link-falsch");
            $("#mehrwissen").removeClass("antwort-link-richtig");
        }, timeout);

    });  

    $('#frage-form input').on('change', function() {        
        selected = $('input[name=aufgabe1]:checked', '#frage-form').val();
    });

    /* === Hamsterladen ===================================================================== */

            $("#laden-update-1").on("click", function(){
                update_kaufen(10, "#laden-update-1", ".laden-update-2", 0)
                $(".liste-plus").show();
            });

            $("#laden-update-2").on("click", function(){
                update_kaufen(1000, "#laden-update-2", ".laden-update-3", 100)
            });

            $("#laden-update-3").on("click", function(){
                // Nichts...
            });

            $("#laden-update-4").on("click", function(){
                // Nichts...
            });

            $("#laden-update-5").on("click", function(){
                // Nichts...
            });

            $("#laden-update-6").on("click", function(){
                // Nichts...
            });

            $("#laden-update-7").on("click", function(){
                // Nichts...
            });

            $("#laden-update-8").on("click", function(){
                // Nichts...
            });

            $("#laden-update-9").on("click", function(){
                // Nichts...
            });

            $("#laden-update-10").on("click", function(){
                // Nichts...
            });

            $("#laden-update-11").on("click", function(){
                // Nichts...
            });

            $("#laden-update-12").on("click", function(){
                // Nichts...
            });

            $("#laden-update-13").on("click", function(){
                // Nichts...
            });

            $("#laden-update-14").on("click", function(){
                // Nichts...
            });

            $("#laden-update-15").on("click", function(){
                // Nichts...
            });

            $("#laden-update-16").on("click", function(){
                // Nichts...
            });

            $("#laden-update-17").on("click", function(){
                // Nichts...
            });

            $("#laden-update-18").on("click", function(){
                // Nichts...
            });

            $("#laden-update-19").on("click", function(){
                // Nichts...
            });

            $("#laden-update-20").on("click", function(){
                // Nichts...
            });

            $("#laden-update-21").on("click", function(){
                // Nichts...
            });

    /* === Hamsterverkäufer ===================================================================== */


    /* === Hamsterhausmeister ===================================================================== */


    /* === Hamsterversand ===================================================================== */


    /* === Hamsterwerbung ===================================================================== */


    /* === Hamsterreiniung ===================================================================== */


    /* === Hamsterbildung ===================================================================== */


    /* === Hamsterernährung ===================================================================== */


    /* === Hamstersport ===================================================================== */


    /* === Hamstergeschenk ===================================================================== */


    

});


function show(element){
    hideAll();
    $("#" + element).show();
}

function hideAll(){
    $("#laden").hide();
    $("#verkaeufer").hide();
    $("#hausmeister").hide();
    $("#versand").hide();
    $("#werbung").hide();
    $("#reinigung").hide();
    $("#bildung").hide();
    $("#ernaehrung").hide();
    $("#sport").hide();
    $("#geschenk").hide();
}

async function fragen_holen(){
    fetch("./assets/js/fragen.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Datei: ' + response.status);
        }
        return response.json();
    })
    .then(daten => {
        var nummer = Math.floor(Math.random() * 30);

        // Daten holen
        geschenk = Object.values(daten);

        $("#frage").text(geschenk[nummer].Frage);
        $("#antwort1text").text(geschenk[nummer].Frage1);
        $("#antwort2text").text(geschenk[nummer].Frage2);
        $("#antwort3text").text(geschenk[nummer].Frage3);
        $("#antwort4text").text(geschenk[nummer].Frage4);

        aufgabe = {
            "Frage":    geschenk[nummer].Frage,
            "Antwort1": geschenk[nummer].Frage1,
            "Antwort2": geschenk[nummer].Frage2,
            "Antwort3": geschenk[nummer].Frage3,
            "Antwort4": geschenk[nummer].Frage4,
            "Lösung":   geschenk[nummer].Lösung,
            "Link":     geschenk[nummer].Link,
        };
    })
    .catch(error => {
        console.error('Fehler:', error);
    });
}

function frage_loesen(){

    // Neue Frage holen, wenn erfolgreich
    fragen_holen();
}

function test(){
    
    $("#frage").text($('input[name=aufgabe-1]:checked', '#frage-form').val())
    //console.log(aufgabe.Antwort1);
}

function update_kaufen(kosten_fuer_element, dieses_element, naechstes_element, neue_kosten = 0){
    if(konto >= kosten_fuer_element){
        konto = konto - kosten_fuer_element;
        kosten = kosten + neue_kosten;
        $("#kosten").text(kosten);
        kontostand.text(konto)      
        $(dieses_element).hide();              
        $(naechstes_element).show();        
    }
}