var content = "";
var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
document.getElementById("getCurrentDay").innerHTML = date;

function getListData() {
    return newsList;
}

function getList() {
    var urlParams = new URLSearchParams(window.location.search);
    var textSearch = urlParams.get('text')??'';
    if (textSearch !== '') {
        this.content = textSearch;
        document.getElementById("nnnnn").style.display="none";
        getSimilarNewsKeyRelate();
    }
}
getList()
async function getSimilarNewsKeyRelate() {
    let htmtSimilar = '';
    let listSimilar = '';
    let htmtSimilarNewsRelate = '';
    let listSimilarNewsRelate = '';
    await axios({
        method: 'POST',
        url: 'http://xulyngonngutunhien.ddns.net:5070/search',
        data: {
            noidung: this.content
        },
    }).then(response => {
        listSimilar = response.data;
    })
        .catch(function (error) {
            console.error(error);
        });
    listSimilar.sort((a, b) => parseFloat(b.cosine_similarity) - parseFloat(a.cosine_similarity));
    listSimilar.forEach(item => {
        htmtSimilar += `
        <div class="col-lg-6 col-xl-6">
            <div class="bg-light rounded p-4 pt-0 mt-4">
                <div class="row g-4">
                    <div class="col-12">
                        <div class="rounded overflow-hidden">
                            <img src="img/news-3.jpg" class="img-fluid rounded img-zoomin w-100" alt="">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex flex-column">
                            <a href="/detail-page.html?id=${item.file_names}" class="h5 mb-2" style="text-align: justify;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">${item.title}</a>
                            <p class="fs-5 mb-0"><i class="fa fa-pen"> ${item.subject}</i> </p>
                            <p class="fs-5 mb-0"><i class="fa fa-user"> ${item.author}</i></p>
                            <p class="fs-5 mb-0"><i class="fa fa-hand-point-right"> ${item.cosine_similarity}</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    await axios({
        method: 'POST',
        url: 'http://xulyngonngutunhien.ddns.net:5070/search2',
        data: {
            noidung: this.content
        },
    }).then(response => {
        listSimilarNewsRelate = response.data;
    })
        .catch(function (error) {
            console.error(error);
        });
    listSimilarNewsRelate.sort((a, b) => parseFloat(b.cosine_similarity) - parseFloat(a.cosine_similarity));
    listSimilarNewsRelate.forEach(item => {
        htmtSimilarNewsRelate += `
        <div class="col-lg-6 col-xl-6">
            <div class="bg-light rounded p-4 pt-0 mt-4">
                <div class="row g-4">
                    <div class="col-12">
                        <div class="rounded overflow-hidden">
                            <img src="img/news-3.jpg" class="img-fluid rounded img-zoomin w-100" alt="">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex flex-column">
                            <a href="/detail-page.html?id=${item.file_names}" class="h5 mb-2" style="text-align: justify;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">${item.title}</a>
                            <p class="fs-5 mb-0"><i class="fa fa-pen"> ${item.subject}</i> </p>
                            <p class="fs-5 mb-0"><i class="fa fa-user"> ${item.author}</i></p>
                            <p class="fs-5 mb-0"><i class="fa fa-hand-point-right"> ${item.cosine_similarity}</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    document.getElementById('htmtSimilarNewsRelate').innerHTML = htmtSimilarNewsRelate;
    document.getElementById('htmtSimilar').innerHTML = htmtSimilar;
}

function searchResult() {
    var textSearch = document.getElementById("textSearch").value;
    if(textSearch !== '') {
        window.location.href ="./detail-page-research.html?text=" + textSearch;
    }
}
