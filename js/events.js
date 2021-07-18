'use strict';

/***************************************************************************************/
/**************************** EVENEMENTS CARNET D'ADRESSES *****************************/
/***************************************************************************************/

function onClickAddContact()
{
    // Réinitialisation du formulaire (efface les champs texte, etc.).
    $('#contact-form').trigger('reset'); //trigger crée un événement
    // Basculement du formulaire en mode ajout puis affichage.
    $('#contact-form').data('mode', 'add').fadeIn('fast');
}

function onClickClearAddressBook()
{
    // Sauvegarde d'un carnet d'adresse vide, écrasant le carnet d'adresse existant.
    saveAddressBook(new Array());
    // Mise à jour de l'affichage.
    $('#contact-details').hide();
    refreshAddressBook();
}

function onClickEditContact()
{
    /*
     * this = objet DOM qui a déclenché l'évènement,
     *        il s'agit donc de l'hyperlien généré dans onClickShowContactDetails()
     *
     * On initialise jQuery avec la variable this pour obtenir un objet jQuery
     * représentant l'hyperlien qui a donc déclenché l'évènement.
     *
     * La méthode data() de jQuery permet de lire/écrire les attributs HTML data-xxx
     */
     
     //on récupère le data-index de l'élément déclencheur (cliqué dans la liste)
     const index = $(this).data('index');
     //on charge le carnet d'addresse qu'on sauvegarde dans une const
     const addressBook = loadAddressBook();
     //on récupère le contact de ce carnet d'addresse sauvegardé juste avant (en fonction de son index) on stock dans une const
     const contact     = addressBook[index];
     //on récup les valeurs entrée dans le formulaire (firstName lastName et phone)
     $('#firstName').val(contact.firstName);
     $('#lastName').val(contact.lastName);
     $('#phone').val(contact.phone);
     // Sélection de la bonne <option> HTML de la liste déroulante. (condition pour attribuer le title)
     switch(contact.title) {

        case 'Mme.':
        $('#title').val(1);
        break;

        case 'Mlle.':
        $('#title').val(2);
        break;

        case 'M.':
        $('#title').val(3);
        break;
    }

     // Basculement du formulaire en mode édition puis affichage.
     $('#contact-form').data('mode', 'edit').fadeIn('slow');

}     

function onClickSaveContact()
{
    // Création d'un objet contact avec les données du formulaire. (fonction createContact)
    const contact = createContact
    (
        $('select[name=title]').val(),
        $('input[name=firstName]').val(),
        $('input[name=lastName]').val(),
        $('input[name=phone]').val()
    );
    
    //on charge le carnet d'adresse
    const addressBook = loadAddressBook();
    //si le formulaire est en mode ajout
    if($('#contact-form').data('mode') == 'add') {
        //mise à jour du tableau de contact en ajoutant un nouvel index
        addressBook.push(contact);
    //sinon (c'est mode édition)
    }else{
        //on récupère le data index du contact en question
        const index = $('#contact-details a').data('index');
        //on écrase l'ancienne valeur par la nouvelle
        addressBook[index] = contact;
    }    
    //appel de la fonction pour sauvegarder dans le carnet d'adresse
    saveAddressBook(addressBook);
    // Mise à jour de l'affichage.
    $('#contact-form').fadeOut('slow');
    $('#contact-details').hide();
    //raffraichissement du carnet
    refreshAddressBook();
}

function onClickShowContactDetails()
{
    /*
     * this = objet DOM qui a déclenché l'évènement,
     *        il s'agit donc de l'un des hyperliens généré dans refreshAddressBook()
     *
     * On initialise jQuery avec la variable this pour obtenir un objet jQuery
     * représentant l'hyperlien qui a donc déclenché l'évènement.
     *
     * La méthode data() de jQuery permet de lire/écrire les attributs HTML data-xxx
     */
     
     //on récupère le data-index de l'élément déclencheur (cliqué dans la liste)
     const index = $(this).data('index');
     // Chargement du carnet d'adresses puis récupération du contact sur lequel on a cliqué.
     const addressBook = loadAddressBook();
     const contact     = addressBook[index];
     
     /*
     * Affichage des données du contact, enregistrement du numéro (index) du contact dans
     * l'attribut HTML data-index de l'hyperlien "Editer ce contact"
     */
     $('#contact-details h3').text(contact.title + ' ' + contact.firstName + ' ' + contact.lastName);
     $('#contact-details p').text(contact.phone);
     $('#contact-details a').data('index', index);

     // Mise à jour de l'affichage.
     $('#contact-details').show();
}