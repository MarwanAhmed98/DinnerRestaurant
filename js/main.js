let MenuCards = document.getElementById("MenuCards");
let MyAncher = document.getElementById("MyAncher");
let Loading = document.getElementById("Loading");


getReciepe('pizza');

let Recipes = [];

async function getReciepe(meal) {
    try {
        Loading.classList.remove('d-none');
        let res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
        if (res.ok) {
            let Data = await res.json();
            Recipes = Data.recipes.slice(0, 9);
            console.log(Recipes);
            DisplayRecipes();
            Loading.classList.add('d-none');
        } else {
            MenuCards.innerHTML = "<p class='text-danger'>Something went wrong with the API!</p>";
        }
    } catch (error) {
        MenuCards.innerHTML = "<p class='text-danger'>Network error</p>";
        console.error(error);
    }
}

function DisplayRecipes() {
    let cartona = '';
    for (let i = 0; i < Recipes.length; i++) {
        cartona += `
         <div class="MenuCard col-sm-6 col-md-4 col-lg-3">
    <div class="MenuImgLayer position-relative overflow-hidden">
        <div class="Menu-Layer rounded-3">
            <div class="MenuLayerContent">
                <h4>${Recipes[i].title.split(' ', 2).join(' ')}</h4>
                <h5>ID : ${Recipes[i].recipe_id}</h5>
            </div>
        </div>
        <div class="MenuImg">
            <img class="w-100 rounded-3" src="${Recipes[i].image_url}" alt="${Recipes[i].title}">
        </div>
    </div>
</div>

        `;
    }
    MenuCards.innerHTML = cartona;
}
MyAncher.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})
