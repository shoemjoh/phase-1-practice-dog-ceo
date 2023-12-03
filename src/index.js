document.addEventListener('DOMContentLoaded', function () {
    console.log('%c HI', 'color: firebrick')
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];

    fetch(imgUrl)
        .then(res => res.json())
        .then((data) => {
            const imageData = data.message;
            imageData.forEach((image) => renderImage(image))
        })

    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            allBreeds.map(breed => addBreed(breed))

            // Add click event javascript
            const breedItems = document.querySelectorAll('.breed-item')
            breedItems.forEach(item => {
                item.addEventListener('click', () => {
                    item.style.color = 'blue';
                })
            })
            console.log(breedItems)

            // Add filtering capability - hide any <li> that doesn't start with the letter that is selected.
            const filter = document.getElementById('breed-dropdown');
            filter.addEventListener('change', function () {
                const selectedLetter = this.value.toLowerCase();
                console.log(selectedLetter)
                filterBreedsByLetter(selectedLetter);
            })


        });


    // Add each image to our Dom. Need to add the <img> to the DOM with the source, which is in the array that we're fetching above.
    // Dom Render Functions
    function renderImage(image) {
        //Build image
        let imageCard = document.createElement('li')
        imageCard.className = 'card'
        imageCard.innerHTML = `
        <img src="${image}">
        `
        // Add image card to DOM.
        document.querySelector('#dog-image-container').appendChild(imageCard)

    }

    function addBreed(breed) {
        // Add breed
        let breedDesc = document.createElement('li');
        breedDesc.innerHTML = `<span class="breed-item"> ${breed} </span>`;
        document.querySelector('#dog-breeds').appendChild(breedDesc);
    }

    function filterBreedsByLetter(letter) {
        console.log(letter)
        const loadedBreedItems = document.querySelectorAll('.breed-item');
        console.log(loadedBreedItems)
        loadedBreedItems.forEach(item => {
            const lowerCaseName = item.innerText.toLowerCase();
            console.log(lowerCaseName)
            if (lowerCaseName.startsWith(letter)) {
                item.style.display = 'list-item';
                console.log('Yes it starts with the same letter')
            }
            else {
                item.style.display = 'none';
                console.log('No it does not')
            }
        })
    }

})

