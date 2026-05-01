
const fetchJSONFile = function(){
    return new Promise(function(resolve,reject){
        try{
            fetch('./travel_recommendation_api.json').then(function(result){
                return result.json()
            }).then(function(jsonResult){
                resolve(jsonResult);
            })
        }catch(error){
            reject(error);
        }
    })
}

async function renderSearch(items){
    document.getElementById('searchResultsContainer').hidden=false;

    const searchResults = document.getElementById('searchResults');
    if(items.length>0){
        let searchHTML = "";
        for(let item of items){
            searchHTML+=`
            <div class="searchResultItem">
                <img src="${item?.imageUrl}" class="searchURL" />
                <h3>${item?.name || 'Error'}</h3>
                <p>${item?.description}</p>
            </div>
            `
        }
        searchResults.innerHTML=searchHTML;
    }else{
        searchResults.innerHTML=`<span>No Results Found</span>`
    }
console.log(items)
}

async function searchLocation(){
    const results = await fetchJSONFile();
    if(!results.beaches || !results.countries || !results.temples){
        alert('Something went wrong');
        return;
    };
    console.log(results);
    const searchQuery = document.getElementById('searchInput')?.value ||'';
    const keySearch = searchQuery.toLowerCase();

    let searchResults = [];

    switch(keySearch){
        case 'beach': searchResults = results.beaches;break;
        case 'beaches':searchResults = results.beaches;break;
        case 'sand':searchResults = results.beaches;break;
        case 'temples':searchResults=results.temples;break;
        case 'temple':searchResults=results.temples;break;
        case 'church':searchResults = results.temples;break;
    }
    for(let country of results.countries){
        if(country.name.toLowerCase()===keySearch)searchResults = country.cities;
    }
    renderSearch(searchResults)
}


async function clearResults(){
    document.querySelector('#searchInput').value="";
    document.querySelector('#searchResultsContainer').hidden=true;
    document.querySelector('#searchResults').innerHTML="";
}