function getData() {
    fetch("http://bonitamultimedia.com/wordpress/wp-json/wp/v2/events?_embed").then(res => res.json()).then(showEvents);
}

function getAllEventsByTag(id) {
    fetch("http://bonitamultimedia.com/wordpress/wp-json/wp/v2/events?_embed&tags=" + id).then(res => res.json()).then(showEvents);
}


function getMenu() {
    fetch("http://bonitamultimedia.com/wordpress/wp-json/wp/v2/tags")
        .then(e => e.json())
        .then(showMenu)
}

function showMenu(tags) {
    console.log(tags);
    let lt = document.querySelector("#linkTemplate").content;

    tags.forEach(function (tag) {
        if (tag.count > 0) {


            let clone = lt.cloneNode(true);
            let parent = document.querySelector("#tagmenu");
            clone.querySelector("a").textContent = tag.name;
            clone.querySelector("a").setAttribute("href", "events_page.html?tagid=" + tag.id);

            parent.appendChild(clone);
        }
    });

}

function showEvents(data) {
    //console.log(data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventTemplate").content


    data.forEach(function (theEvent) {
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price");
        let img = clone.querySelector("img");
        title.textContent = theEvent.title.rendered;
        let date = clone.querySelector(".date");

        if(theEvent.excerpt){
            excerpt.innerHTML = theEvent.excerpt.rendered;
        }

        price.textContent = "Price: " + theEvent.acf.price + " kr.";
        //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes)
        date.textContent = "Date: " + theEvent.acf.date;

        if (theEvent.featured_media != 0) {
            img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url)
        }




        list.appendChild(clone);
    })
}
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");


getMenu();

if (tagid) {
    getAllEventsByTag(tagid);

} else {
    getData();
}
