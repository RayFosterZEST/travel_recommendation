
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

async function searchLocation(){
    const results = await fetchJSONFile();
    if(!results.beaches || !results.countries || !results.temples){
        alert('Something went wrong');
        return;
    };
    const searchQuery = document.getElementById('searchInput')?.value ||'';
    const keySearch = searchQuery.toLowerCase();

    let foundKey = undefined;
    Object.keys(results).forEach(function(key){
        if(keySearch.indexOf(key)!==-1)foundKey=key;
    })
    
    
    
    console.log(searchQuery)
}