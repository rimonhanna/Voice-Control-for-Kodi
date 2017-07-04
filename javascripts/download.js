tpeDownload = local("%tpe_download").toLowerCase().trim().replace(/ /g,'+');
deviceIp = '127.0.0.1';
devicePort = '8080'
apiKey = '157ab3cbdf2b143cbf07caab87c6a5ba'

if (tk.global("%DISPLAYFLASH") == '') {
	tk.setGlobal("%DISPLAYFLASH",'false');
}

if (tk.global("%DISPLAYFLASH") == '') {
  flash('tpeDownload: ' + tpeDownload);
}

// Get movie info
url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=' + tpeDownload + '&language=en-US&api_key=' + apiKey;
method = 'GET'
xhttp = new XMLHttpRequest();
xhttp.open(method, url, false);
xhttp.send();

arr = JSON.parse(xhttp.responseText);

movieTitle = arr.results[0].title;
tmdbId = arr.results[0].id;
imagePath = "https://image.tmdb.org/t/p/w640" + arr.results[0].poster_path;
titleSlug = (movieTitle + " " + tmdbId).replace(/ /g,'-').toLowerCase();

// Send movie info to Radarr - Radarr is configured to use Deluge to download the movie
jsonData = '{"qualityProfileID":"4","monitored":"true","rootFolderPath":"\\\\\\\\10.178.100.1\\\\movies","title":"' + movieTitle + '","images":[{"covertype":"poster","url":"' + imagePath + '"}],"titleslug":"' + titleSlug + '","tmdbid":"' + tmdbId + '"}';
url = "http://10.178.0.118:7878/api/movie";
xhttp = new XMLHttpRequest();
method = 'POST'
xhttp.open(method, url, true);
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.setRequestHeader("X-Api-Key", "4e1b73ddefa84185acfce6d261ed3790");

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert(xhttp.responseText);
    }
}

xhttp.send(jsonData);




