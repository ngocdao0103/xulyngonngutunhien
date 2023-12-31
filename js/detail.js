var content = "";
var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
document.getElementById("getCurrentDay").innerHTML = date;

function getListData() {
    return newsList;
}

function getListId() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id') ?? '';
    var textSearch = urlParams.get('text') ?? '';
    var urlParams = new URLSearchParams(window.location.search);
    var typeSearch = urlParams.get('type') ?? '';
    let news = getListData();
    let htmlNews = '';
    news.forEach(item => {
        if (id !== '') {
            document.getElementById("nnnnn").style.display = "block";
            document.getElementById("similar").style.display = "block";
            if (item.file_names === id) {
                this.content = item.file_texts;
                htmlNews = `
                    <div class="border-bottom py-3">
                        <a href="#" class="h2 text-dark mb-0 link-hover">${item.title}</a>
                    </div>
                    <p class="mt-3 mb-4">${item.file_texts}</p>
                    <div class="d-flex justify-content-between">
                        <a href="#" class="text-dark link-hover me-3"><i class="fa fa-user"></i> ${item.author}</a>
                        <a href="#" class="text-dark link-hover me-3"><i class="fa fa-eye"></i> ${item.subject}</a>
                    </div>
                `
                document.getElementById('htmlNews').innerHTML = htmlNews;
                getSimilarNews();
            }
        }
    });
    if (textSearch !== '') {
        this.content = textSearch;
        document.getElementById("nnnnn").style.display = "none";
        if (Number(typeSearch) === 1) {
            document.getElementById("similar").style.display = "block";
            getSimilarNews();
        }
        if (Number(typeSearch) === 2) {
            document.getElementById("extend").style.display = "block";
            getSimilarNews2();
        }
    }
}
getListId()

function getListSubject() {
    let subject = JSON.parse(localStorage.getItem('subject'));
    let htmlsbj = '';
    subject.forEach(item => {
        htmlsbj += `
        <div class="col-12">
            <a href="/detail-page.html?type=1&id=${item.file_names}" class="link-hover btn btn-light w-100 rounded text-uppercase text-dark py-3">
                ${item.subject}
            </a>
        </div>
        `
    });
    document.getElementById('htmlsbj').innerHTML = htmlsbj;
}
getListSubject()

async function getSimilarNews() {
    let htmtSimilarNews = '';
    let listSimilarNews = '';
    await axios({
        method: 'POST',
        url: 'http://xulyngonngutunhien.ddns.net:5070/search',
        data: {
            noidung: this.content
        },
    }).then(response => {
        listSimilarNews = response.data;
    })
        .catch(function (error) {
            console.error(error);
        });

    listSimilarNews.data.sort((a, b) => parseFloat(b.cosine_similarity) - parseFloat(a.cosine_similarity));
    listSimilarNews.data.forEach(item => {
        htmtSimilarNews += `
        <div class="col-lg-4 col-xl-3">
            <div class="bg-light rounded p-4 pt-0 mt-4">
                <div class="row g-4">
                    <div class="col-12">
                        <div class="rounded overflow-hidden">
                            <img src="img/news-3.jpg" class="img-fluid rounded img-zoomin w-100" alt="">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex flex-column">
                            <a href="/detail-page.html?type=1&id=${item.file_names}" class="h5 mb-2" style="text-align: justify;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">${item.title}</a>
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
    document.getElementById('htmtSimilarNews').innerHTML = htmtSimilarNews;
}
async function getSimilarNews2() {
    let htmtSimilarNews = '';
    let listSimilarNews = '';
    await axios({
        method: 'POST',
        url: 'http://xulyngonngutunhien.ddns.net:5070/search2',
        data: {
            noidung: this.content
        },
    }).then(response => {
        listSimilarNews = response.data;
    })
        .catch(function (error) {
            console.error(error);
        });
    listSimilarNews.data.sort((a, b) => parseFloat(b.cosine_similarity) - parseFloat(a.cosine_similarity));
    listSimilarNews.data.forEach(item => {
        htmtSimilarNews += `
        <div class="col-lg-4 col-xl-3">
            <div class="bg-light rounded p-4 pt-0 mt-4">
                <div class="row g-4">
                    <div class="col-12">
                        <div class="rounded overflow-hidden">
                            <img src="img/news-3.jpg" class="img-fluid rounded img-zoomin w-100" alt="">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex flex-column">
                            <a href="/detail-page.html?type=1&id=${item.file_names}" class="h5 mb-2" style="text-align: justify;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">${item.title}</a>
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
    document.getElementById('htmtSimilarNews').innerHTML = htmtSimilarNews;
}
function searchResult2() {
    var textSearch = document.getElementById("textSearch").value;
    var typeSearch2 = document.getElementById('typeSearch2').value;
    if (textSearch !== '') {
        window.location.href = `./detail-page.html?type=${typeSearch2}&text=${textSearch}`;
    }
}

