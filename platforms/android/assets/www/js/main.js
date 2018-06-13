//MAIN-----------------------------------------------------------------------------
function funcioncamara() {

    var pictureSource = navigator.camera.PictureSourceType;
    var destinationType = navigator.camera.DestinationType;
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50,
        destinationType: destinationType.DATA_URL});
}
function onPhotoDataSuccess(imageData) {
    //sessionStorage.setItem("uri", imageURI);
    sessionStorage.setItem("imageData", "data:image/jpeg;base64," + imageData);

}
function onFail(message) {
    alert('Failed because: ' + message);
}




function funcionvisualizar() {
    window.open("calibrar.html", "_self");
    z
}

function funcionlaboratorio() {
    window.open("laboratorio.html", "_self");

}

function abririnfo(url){
	window.open(url, "_self");
}


//MISC -> CAMERA-----------------------------------------------------------------------------------

function setOptions(srcType) {

    var options = {

        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }

    return options;
}

