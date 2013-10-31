function nextPage() {

    function getNextPageHref() {
        return document.getElementById('pagnNextLink').href;
    };

    window.location.href = getNextPageHref();

};



document.addEventListener('DOMContentLoaded', function () {
  nextPage();
});