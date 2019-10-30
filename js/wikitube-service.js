var YT_KEY = `AIzaSyANrISFcbmdjmL0lrQBylPpUUJmI_dTLk4`
var SEARCH_KEY = 'searchKey';
var gSearch = [];




function initSearch() {
    var searches = [];
    searches = loadFromStorage(SEARCH_KEY);

    if (!searches || searches.length === 0) {
        searches = [];
    }
    return searches;
}

function getYouTubeLink(searchInput) {
    var http = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${searchInput}`;
    console.log(http);

    var prm = axios.get(http);
    prm.then((res) => {
        console.log(res.data);
        renderYouTubeVideos(res.data);
    })
    prm.catch((error) => {
        console.log(error);
    })
}



function getWikiInfo(searchInput) {
    var http = `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchInput}&limit=5`;
    console.log(http);
    var prm = axios.get(http)
    prm.then((res) => {
        console.log(res);
        renderWikiInfo(res.data)
    })
    prm.catch((error) => {
        console.log(error);

    })
}


function saveSearches(txtSearch) {
    gSearch.push(txtSearch);
    saveToStorage(SEARCH_KEY, gSearch);
}

function getSearchesToDisplay() {
    gSearch = initSearch();
    return gSearch;
}

function clearLocalStorage() {
    localStorage.removeItem(SEARCH_KEY);
    gSearch = [];
}


function confirmClearHistory() {
    swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Done !", {
                    icon: "success",
                });
                clearLocalStorage();
                renderSearches(gSearch);
            } else {
                swal("Cancel");
            }
        });
}

































function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}