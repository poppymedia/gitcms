/**
* quote.js
*
**/






function init() {
	SXE.initElementDialog('q');
	if (SXE.currentAction == "update") {
		SXE.showRemoveButton();
	}
}

function insertQuote() {
	SXE.insertElement('q');
	tinyMCEPopup.close();
}

function removeQuote() {
	SXE.removeElement('q');
	tinyMCEPopup.close();
}

tinyMCEPopup.onInit.add(init);
