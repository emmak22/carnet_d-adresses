/*******************************************************************************************/
/********************************** FONCTIONS UTILITAIRES **********************************/
/*******************************************************************************************/
/*
     * Donnée simple (chaîne) -> JSON parse (= désérialisation) -> Donnée complexe
     *
     * Voir ci-dessous pour plus d'explications sur le pourquoi du JSON.
     */
function loadDataFromDomStorage(name)
{
    
   //on récupère l'élément dans le localStorage
   const jsonData = window.localStorage.getItem(name);
   
   //on n'oubli pas de transformer notre Json objet (JSON.parse)
   return JSON.parse(jsonData);
}


 /*
     * Le DOM storage ne permet pas de stocker des données complexes (objet, tableau...).
     * On doit donc d'aborder sérialiser nos données dans un format simple, le JSON.
     *
     * On obtient une chaîne représentant l'objet complexe, et c'est cette chaîne que
     * l'on stocke dans le DOM storage.
     *
     * Donnée complexe -> JSON stringify (= sérialisation) -> Donnée simple (chaîne)
     */

function saveDataToDomStorage(name, data)
{
   //on transforme notre objet en format JSON (JSON.stringify)
   const jsonData = JSON.stringify(data);
   //on sauvegarde notre donnée dans le localStorage
   window.localStorage.setItem(name, jsonData);
}