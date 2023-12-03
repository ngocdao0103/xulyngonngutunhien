var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
document.getElementById("getCurrentDay").innerHTML = date;

function getListData() {
    return newsList;
}
getListData();

function getSubject() {
    let list = getListData();
    let subject = {};
    let htmlSubject = '';
    list.forEach(item => {
        delete item.token;
        delete item.remove_stopword;
        delete item.length_removestopword;
        delete item.cleaned_text;
        delete item.length_clean;
        delete item.tfidf;
    });
    list.map((item) => (subject[item.subject] = item));
    list = Object.values(subject);
    localStorage.setItem('subject', JSON.stringify(list));
    list.forEach(item => {
        htmlSubject += `
        <div class="col-md-6 col-lg-6 col-xl-4">
            <div class="row g-4 align-items-center features-item">
                <div class="col-4">
                    <div class="rounded-circle position-relative">
                        <div class="overflow-hidden rounded-circle">
                            <img src="img/features-life-style.jpg" class="img-zoomin img-fluid rounded-circle w-100" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="features-content d-flex flex-column">
                        <p class="text-uppercase mb-2">${item.subject}</p>
                        <a href="/detail-page.html?id=${item.Column1}" class="h6">
                            ${item.title}
                        </a>
                        <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${item.author}</small>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    document.getElementById('htmlSubject').innerHTML = htmlSubject;
}
getSubject()

function getLateNew() {
    let htmtLateNew = '';
    let listLateNew = getListData();
    listLateNew.length = 12;
    console.log(listLateNew);
    listLateNew.forEach(item => {
        htmtLateNew += `
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
                            <a href="/detail-page.html?id=${item.Column1}" class="h5 mb-2" style="text-align: justify;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">${item.title}</a>
                            <p class="fs-5 mb-0"><i class="fa fa-pen"> ${item.subject}</i> </p>
                            <p class="fs-5 mb-0"><i class="fa fa-user"> ${item.author}</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    document.getElementById('htmtLateNew').innerHTML = htmtLateNew;
}
getLateNew()

var tabLinks = document.querySelectorAll(".tablinks");
var tabContent =document.querySelectorAll(".tabcontent");
tabLinks.forEach(function(el) {
   el.addEventListener("click", openTabs);
});


function openTabs(el) {
   var btn = el.currentTarget;
   var electronic = btn.dataset.electronic;
   tabContent.forEach(function(el) {
      el.classList.remove("active");
   });
   tabLinks.forEach(function(el) {
      el.classList.remove("active");
   });
   document.querySelector("#" + electronic).classList.add("active");
   btn.classList.add("active");
}