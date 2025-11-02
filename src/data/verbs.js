export const verbs = [
    // Most common verbs
    { infinitive: "zijn", pastSimple: "was", pastSimplePlural: "waren", pastParticiple: "geweest", english: "to be" }, // Corrected plural
    { infinitive: "hebben", pastSimple: "had", pastSimplePlural: "hadden", pastParticiple: "gehad", english: "to have" }, // Corrected plural
    { infinitive: "gaan", pastSimple: "ging", pastSimplePlural: "gingen", pastParticiple: "gegaan", english: "to go" },
    { infinitive: "doen", pastSimple: "deed", pastSimplePlural: "deden", pastParticiple: "gedaan", english: "to do" },
    { infinitive: "komen", pastSimple: "kwam", pastSimplePlural: "kwamen", pastParticiple: "gekomen", english: "to come" },
    { infinitive: "eten", pastSimple: "at", pastSimplePlural: "aten", pastParticiple: "gegeten", english: "to eat" },
    { infinitive: "drinken", pastSimple: "dronk", pastSimplePlural: "dronken", pastParticiple: "gedronken", english: "to drink" },
    { infinitive: "slapen", pastSimple: "sliep", pastSimplePlural: "sliepen", pastParticiple: "geslapen", english: "to sleep" },
    { infinitive: "zien", pastSimple: "zag", pastSimplePlural: "zagen", pastParticiple: "gezien", english: "to see" },
    { infinitive: "schrijven", pastSimple: "schreef", pastSimplePlural: "schreven", pastParticiple: "geschreven", english: "to write" },
    { infinitive: "vinden", pastSimple: "vond", pastSimplePlural: "vonden", pastParticiple: "gevonden", english: "to find" },
    { infinitive: "geven", pastSimple: "gaf", pastSimplePlural: "gaven", pastParticiple: "gegeven", english: "to give" },
    
    // Reading and speaking
    { infinitive: "lezen", pastSimple: "las", pastSimplePlural: "lazen", pastParticiple: "gelezen", english: "to read" },
    { infinitive: "spreken", pastSimple: "sprak", pastSimplePlural: "spraken", pastParticiple: "gesproken", english: "to speak" },
    { infinitive: "zeggen", pastSimple: "zei", pastSimplePlural: "zeiden", pastParticiple: "gezegd", english: "to say" },
    { infinitive: "vertellen", pastSimple: "vertelde", pastSimplePlural: "vertelden", pastParticiple: "verteld", english: "to tell" },
    { infinitive: "vragen", pastSimple: "vroeg", pastSimplePlural: "vroegen", pastParticiple: "gevraagd", english: "to ask" },
    { infinitive: "antwoorden", pastSimple: "antwoordde", pastSimplePlural: "antwoordden", pastParticiple: "geantwoord", english: "to answer" },
    
    // Movement verbs
    { infinitive: "lopen", pastSimple: "liep", pastSimplePlural: "liepen", pastParticiple: "gelopen", english: "to walk" },
    { infinitive: "rijden", pastSimple: "reed", pastSimplePlural: "reden", pastParticiple: "gereden", english: "to drive/ride" },
    { infinitive: "vliegen", pastSimple: "vloog", pastSimplePlural: "vlogen", pastParticiple: "gevlogen", english: "to fly" },
    { infinitive: "zwemmen", pastSimple: "zwom", pastSimplePlural: "zwommen", pastParticiple: "gezwommen", english: "to swim" },
    { infinitive: "klimmen", pastSimple: "klom", pastSimplePlural: "klommen", pastParticiple: "geklommen", english: "to climb" },
    { infinitive: "bewegen", pastSimple: "bewoog", pastSimplePlural: "bewogen", pastParticiple: "bewogen", english: "to move" },
    
    // Position verbs
    { infinitive: "liggen", pastSimple: "lag", pastSimplePlural: "lagen", pastParticiple: "gelegen", english: "to lie (down)" }, // Corrected plural
    { infinitive: "zitten", pastSimple: "zat", pastSimplePlural: "zaten", pastParticiple: "gezeten", english: "to sit" }, // Corrected plural
    { infinitive: "staan", pastSimple: "stond", pastSimplePlural: "stonden", pastParticiple: "gestaan", english: "to stand" }, // Corrected plural
    
    // Mental verbs
    { infinitive: "denken", pastSimple: "dacht", pastSimplePlural: "dachten", pastParticiple: "gedacht", english: "to think" },
    { infinitive: "weten", pastSimple: "wist", pastSimplePlural: "wisten", pastParticiple: "geweten", english: "to know (fact)" },
    { infinitive: "kennen", pastSimple: "kende", pastSimplePlural: "kenden", pastParticiple: "gekend", english: "to know (person)" },
    { infinitive: "begrijpen", pastSimple: "begreep", pastSimplePlural: "begrepen", pastParticiple: "begrepen", english: "to understand" }, // Corrected plural
    { infinitive: "leren", pastSimple: "leerde", pastSimplePlural: "leerden", pastParticiple: "geleerd", english: "to learn/teach" },
    { infinitive: "studeren", pastSimple: "studeerde", pastSimplePlural: "studeerden", pastParticiple: "gestudeerd", english: "to study" },
    { infinitive: "vergeten", pastSimple: "vergat", pastSimplePlural: "vergaten", pastParticiple: "vergeten", english: "to forget" },
    { infinitive: "herinneren", pastSimple: "herinnerde", pastSimplePlural: "herinnerden", pastParticiple: "herinnerd", english: "to remember" },
    
    // Verbs with vowel changes
    { infinitive: "breken", pastSimple: "brak", pastSimplePlural: "braken", pastParticiple: "gebroken", english: "to break" },
    { infinitive: "stelen", pastSimple: "stal", pastSimplePlural: "stalen", pastParticiple: "gestolen", english: "to steal" },
    { infinitive: "helpen", pastSimple: "hielp", pastSimplePlural: "hielpen", pastParticiple: "geholpen", english: "to help" },
    { infinitive: "werpen", pastSimple: "wierp", pastSimplePlural: "wierpen", pastParticiple: "geworpen", english: "to throw" },
    { infinitive: "kiezen", pastSimple: "koos", pastSimplePlural: "kozen", pastParticiple: "gekozen", english: "to choose" }, // Corrected plural
    { infinitive: "liegen", pastSimple: "loog", pastSimplePlural: "logen", pastParticiple: "gelogen", english: "to lie (tell untruth)" }, // Corrected plural
    { infinitive: "vriezen", pastSimple: "vroor", pastSimplePlural: "vroren", pastParticiple: "gevroren", english: "to freeze" }, // Corrected plural
    { infinitive: "gieten", pastSimple: "goot", pastSimplePlural: "goten", pastParticiple: "gegoten", english: "to pour" }, // Corrected plural
    
    // Common action verbs
    { infinitive: "kopen", pastSimple: "kocht", pastSimplePlural: "kochten", pastParticiple: "gekocht", english: "to buy" },
    { infinitive: "verkopen", pastSimple: "verkocht", pastSimplePlural: "verkochten", pastParticiple: "verkocht", english: "to sell" },
    { infinitive: "brengen", pastSimple: "bracht", pastSimplePlural: "brachten", pastParticiple: "gebracht", english: "to bring" },
    { infinitive: "zoeken", pastSimple: "zocht", pastSimplePlural: "zochten", pastParticiple: "gezocht", english: "to search/look for" },
    { infinitive: "trekken", pastSimple: "trok", pastSimplePlural: "trokken", pastParticiple: "getrokken", english: "to pull" }, // Corrected plural
    { infinitive: "duwen", pastSimple: "duwde", pastSimplePlural: "duwden", pastParticiple: "geduwd", english: "to push" },
    { infinitive: "sturen", pastSimple: "stuurde", pastSimplePlural: "stuurden", pastParticiple: "gestuurd", english: "to send" },
    { infinitive: "krijgen", pastSimple: "kreeg", pastSimplePlural: "kregen", pastParticiple: "gekregen", english: "to get/receive" }, // Corrected plural
    { infinitive: "nemen", pastSimple: "nam", pastSimplePlural: "namen", pastParticiple: "genomen", english: "to take" },
    { infinitive: "pakken", pastSimple: "pakte", pastSimplePlural: "pakten", pastParticiple: "gepakt", english: "to grab/take" },
    { infinitive: "houden", pastSimple: "hield", pastSimplePlural: "hielden", pastParticiple: "gehouden", english: "to hold/keep" },
    { infinitive: "laten", pastSimple: "liet", pastSimplePlural: "lieten", pastParticiple: "gelaten", english: "to let/allow" },
    { infinitive: "zetten", pastSimple: "zette", pastSimplePlural: "zetten", pastParticiple: "gezet", english: "to put/set" },
    
    // Modal verbs
    { infinitive: "kunnen", pastSimple: "kon", pastSimplePlural: "konden", pastParticiple: "gekund", english: "to can/be able" }, // Corrected plural
    { infinitive: "moeten", pastSimple: "moest", pastSimplePlural: "moesten", pastParticiple: "gemoeten", english: "to must/have to" }, // Corrected plural
    { infinitive: "willen", pastSimple: "wilde", pastSimplePlural: "wilden", pastParticiple: "gewild", english: "to want" }, // Corrected plural
    { infinitive: "zullen", pastSimple: "zou", pastSimplePlural: "zouden", pastParticiple: "gezouden", english: "to will/shall" }, // Corrected plural
    { infinitive: "mogen", pastSimple: "mocht", pastSimplePlural: "mochten", pastParticiple: "gemogen", english: "to may/be allowed" }, // Corrected plural
    
    // State and change verbs
    { infinitive: "worden", pastSimple: "werd", pastSimplePlural: "werden", pastParticiple: "geworden", english: "to become" }, // Corrected plural
    { infinitive: "blijven", pastSimple: "bleef", pastSimplePlural: "bleven", pastParticiple: "gebleven", english: "to stay" }, // Corrected plural
    
    // Other common verbs
    { infinitive: "beginnen", pastSimple: "begon", pastSimplePlural: "begonnen", pastParticiple: "begonnen", english: "to begin" }, // Corrected plural
    { infinitive: "eindigen", pastSimple: "eindigde", pastSimplePlural: "eindigden", pastParticiple: "geeindigd", english: "to end" },
    { infinitive: "winnen", pastSimple: "won", pastSimplePlural: "wonnen", pastParticiple: "gewonnen", english: "to win" }, // Changed plural to 'wonnen' (though 'won' is sometimes seen as well, 'wonnen' is the full form)
    { infinitive: "verliezen", pastSimple: "verloor", pastSimplePlural: "verloren", pastParticiple: "verloren", english: "to lose" }, // Corrected plural
    { infinitive: "openen", pastSimple: "opende", pastSimplePlural: "openden", pastParticiple: "geopend", english: "to open" },
    { infinitive: "sluiten", pastSimple: "sloot", pastSimplePlural: "sloten", pastParticiple: "gesloten", english: "to close" }, // Corrected plural
    { infinitive: "bellen", pastSimple: "belde", pastSimplePlural: "belden", pastParticiple: "gebeld", english: "to call/ring" },
    { infinitive: "wachten", pastSimple: "wachtte", pastSimplePlural: "wachtten", pastParticiple: "gewacht", english: "to wait" },
    { infinitive: "werken", pastSimple: "werkte", pastSimplePlural: "werkten", pastParticiple: "gewerkt", english: "to work" },
    { infinitive: "spelen", pastSimple: "speelde", pastSimplePlural: "speelden", pastParticiple: "gespeeld", english: "to play" },
    { infinitive: "draaien", pastSimple: "draaide", pastSimplePlural: "draaiden", pastParticiple: "gedraaid", english: "to turn" },
    { infinitive: "meten", pastSimple: "mat", pastSimplePlural: "maten", pastParticiple: "gemeten", english: "to measure" },
    { infinitive: "betekenen", pastSimple: "betekende", pastSimplePlural: "betekenden", pastParticiple: "betekend", english: "to mean" },
    { infinitive: "drijven", pastSimple: "dreef", pastSimplePlural: "dreven", pastParticiple: "gedreven", english: "to drive/float" }, // Corrected plural
    { infinitive: "kijken", pastSimple: "keek", pastSimplePlural: "keken", pastParticiple: "gekeken", english: "to look/watch" }, // Corrected plural
    { infinitive: "lijken", pastSimple: "leek", pastSimplePlural: "leken", pastParticiple: "geleken", english: "to seem/look like" }, // Corrected plural
    
    // More irregular verbs
    { infinitive: "bakken", pastSimple: "bakte", pastSimplePlural: "bakten", pastParticiple: "gebakken", english: "to bake" },
    { infinitive: "binden", pastSimple: "bond", pastSimplePlural: "bonden", pastParticiple: "gebonden", english: "to bind/tie" },
    { infinitive: "blazen", pastSimple: "blies", pastSimplePlural: "bliezen", pastParticiple: "geblazen", english: "to blow" }, // Corrected plural to 'bliezen' (strong verb plural pattern)
    { infinitive: "buigen", pastSimple: "boog", pastSimplePlural: "bogen", pastParticiple: "gebogen", english: "to bend" }, // Corrected plural
    { infinitive: "dragen", pastSimple: "droeg", pastSimplePlural: "droegen", pastParticiple: "gedragen", english: "to carry/wear" },
    { infinitive: "druipen", pastSimple: "droop", pastSimplePlural: "dropen", pastParticiple: "gedropen", english: "to drip" }, // Corrected plural
    { infinitive: "glijden", pastSimple: "gleed", pastSimplePlural: "gleden", pastParticiple: "gegleden", english: "to slide" }, // Corrected plural
    { infinitive: "graven", pastSimple: "groef", pastSimplePlural: "groeven", pastParticiple: "gegraven", english: "to dig" }, // Corrected plural to 'groeven' (strong verb plural pattern)
    { infinitive: "groeien", pastSimple: "groeide", pastSimplePlural: "groeiden", pastParticiple: "gegroeid", english: "to grow" },
    { infinitive: "hangen", pastSimple: "hing", pastSimplePlural: "hingen", pastParticiple: "gehangen", english: "to hang" }, // Corrected plural
    { infinitive: "heffen", pastSimple: "hief", pastSimplePlural: "hieven", pastParticiple: "geheven", english: "to lift" }, // Corrected plural
    { infinitive: "huren", pastSimple: "huurde", pastSimplePlural: "huurden", pastParticiple: "gehuurd", english: "to rent" },
    { infinitive: "knijpen", pastSimple: "kneep", pastSimplePlural: "knepen", pastParticiple: "geknepen", english: "to pinch/squeeze" }, // Corrected plural
    { infinitive: "knippen", pastSimple: "knipte", pastSimplePlural: "knipten", pastParticiple: "geknipt", english: "to cut" },
    { infinitive: "knopen", pastSimple: "knoopte", pastSimplePlural: "knoopten", pastParticiple: "geknoopt", english: "to tie/knot" },
    { infinitive: "koppen", pastSimple: "kopte", pastSimplePlural: "kopten", pastParticiple: "gekopt", english: "to head (ball)" },
    { infinitive: "lijden", pastSimple: "leed", pastSimplePlural: "leden", pastParticiple: "geleden", english: "to suffer" }, // Corrected plural
    { infinitive: "melken", pastSimple: "molk", pastSimplePlural: "molken", pastParticiple: "gemolken", english: "to milk" },
    { infinitive: "mijden", pastSimple: "meed", pastSimplePlural: "meden", pastParticiple: "gemeden", english: "to avoid" }, // Corrected plural
    { infinitive: "rijgen", pastSimple: "reeg", pastSimplePlural: "regen", pastParticiple: "geregen", english: "to thread" }, // Corrected plural
    { infinitive: "rijten", pastSimple: "reet", pastSimplePlural: "reten", pastParticiple: "gereten", english: "to tear" }, // Corrected plural
    { infinitive: "rijzen", pastSimple: "rees", pastSimplePlural: "rezen", pastParticiple: "gerezen", english: "to rise" }, // Corrected plural
    { infinitive: "scheiden", pastSimple: "scheidde", pastSimplePlural: "scheidden", pastParticiple: "gescheiden", english: "to separate/divorce" },
    { infinitive: "scheren", pastSimple: "schoor", pastSimplePlural: "schoren", pastParticiple: "geschoren", english: "to shave" }, // Corrected plural
    { infinitive: "slaan", pastSimple: "sloeg", pastSimplePlural: "sloegen", pastParticiple: "geslagen", english: "to hit/strike" },
    { infinitive: "smeden", pastSimple: "smeedde", pastSimplePlural: "smeedden", pastParticiple: "gesmeed", english: "to forge" },
    { infinitive: "snijden", pastSimple: "sneed", pastSimplePlural: "sneden", pastParticiple: "gesneden", english: "to cut" }, // Corrected plural
    { infinitive: "snuiten", pastSimple: "snoot", pastSimplePlural: "snoten", pastParticiple: "gesnoten", english: "to blow nose" }, // Corrected plural
    { infinitive: "spannen", pastSimple: "spande", pastSimplePlural: "spanden", pastParticiple: "gespannen", english: "to tighten/stretch" },
    { infinitive: "spijten", pastSimple: "speet", pastSimplePlural: "speten", pastParticiple: "gespeten", english: "to regret" }, // Corrected plural
    { infinitive: "splijten", pastSimple: "spleet", pastSimplePlural: "spleten", pastParticiple: "gespleten", english: "to split" }, // Corrected plural
    { infinitive: "springen", pastSimple: "sprong", pastSimplePlural: "sprongen", pastParticiple: "gesprongen", english: "to jump" },
    { infinitive: "steken", pastSimple: "stak", pastSimplePlural: "staken", pastParticiple: "gestoken", english: "to stick/sting" },
    { infinitive: "stijgen", pastSimple: "steeg", pastSimplePlural: "stegen", pastParticiple: "gestegen", english: "to rise/increase" }, // Corrected plural
    { infinitive: "stinken", pastSimple: "stonk", pastSimplePlural: "stonken", pastParticiple: "gestonken", english: "to stink" },
    { infinitive: "stoten", pastSimple: "stootte", pastSimplePlural: "stootten", pastParticiple: "gestoten", english: "to bump/hit" },
    { infinitive: "treffen", pastSimple: "trof", pastSimplePlural: "troffen", pastParticiple: "getroffen", english: "to hit/meet" }, // Corrected plural
    { infinitive: "vechten", pastSimple: "vocht", pastSimplePlural: "vochten", pastParticiple: "gevochten", english: "to fight" },
    { infinitive: "verdrijven", pastSimple: "verdreef", pastSimplePlural: "dreven", pastParticiple: "verdreven", english: "to drive away" }, // Corrected plural
    { infinitive: "verdwijnen", pastSimple: "verdween", pastSimplePlural: "verdwenen", pastParticiple: "verdwenen", english: "to disappear" }, // Corrected plural
    { infinitive: "verstrijken", pastSimple: "verstreek", pastSimplePlural: "verstreken", pastParticiple: "verstreken", english: "to elapse" }, // Corrected plural
    { infinitive: "vouwen", pastSimple: "vouwde", pastSimplePlural: "vouwden", pastParticiple: "gevouwen", english: "to fold" },
    { infinitive: "wegen", pastSimple: "woog", pastSimplePlural: "wogen", pastParticiple: "gewogen", english: "to weigh" }, // Corrected plural
    { infinitive: "wijzen", pastSimple: "wees", pastSimplePlural: "wezen", pastParticiple: "gewezen", english: "to point" }, // Corrected plural
    { infinitive: "zenden", pastSimple: "zond", pastSimplePlural: "zonden", pastParticiple: "gezonden", english: "to send" },
    { infinitive: "zinken", pastSimple: "zonk", pastSimplePlural: "zonken", pastParticiple: "gezonken", english: "to sink" },
    { infinitive: "zwaaien", pastSimple: "zwaaide", pastSimplePlural: "zwaaiden", pastParticiple: "gezwaaid", english: "to wave" },
    { infinitive: "zwerven", pastSimple: "zwerfde", pastSimplePlural: "zwerfden", pastParticiple: "gezworven", english: "to wander" }, // Past participle is 'gezworven' (irregular)
    { infinitive: "zweren", pastSimple: "zwoer", pastSimplePlural: "zwoeren", pastParticiple: "gezworen", english: "to swear" }, // Past simple singular is 'zwoer' (also 'zwoor'), plural 'zwoeren' (or 'zworen')
    
    // NEWLY ADDED Irregular Verbs
    { infinitive: "bieden", pastSimple: "bood", pastSimplePlural: "boden", pastParticiple: "geboden", english: "to offer" }, // Corrected plural
    { infinitive: "dwingen", pastSimple: "dwong", pastSimplePlural: "dwongen", pastParticiple: "gedwongen", english: "to force" },
    { infinitive: "zingen", pastSimple: "zong", pastSimplePlural: "zongen", pastParticiple: "gezongen", english: "to sing" },
    { infinitive: "zwijgen", pastSimple: "zweeg", pastSimplePlural: "zwegen", pastParticiple: "gezwegen", english: "to be silent" }, // Corrected plural
    { infinitive: "ruiken", pastSimple: "rook", pastSimplePlural: "roken", pastParticiple: "geroken", english: "to smell" }, // Corrected plural
    { infinitive: "scheppen", pastSimple: "schiep", pastSimplePlural: "schiepen", pastParticiple: "geschapen", english: "to create" },
  ];