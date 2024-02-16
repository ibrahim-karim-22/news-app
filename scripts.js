const apiKey = process.env.NEWS_API_KEY;
//When you serve your code with Parcel, the process.env method will fetch the API key from your .env file and handle it for you.
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
//This string represents the API endpoint for top-headlines, with a country parameter of "us" (for "United States"), and passes your apiKey to the query parameter in the URL.
async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    } catch (error) {
        console.error('There was an error!', error);
    }
}
fetchNews();

function displayNews(articles) {
    const newsDiv = document.querySelector('#news');
    for (const article of articles) {
        const articleDiv = document.createElement('div');

        //create and append a headline to the articleDiv
        const title = document.createElement('h4');
        title.textContent = article.title;
        articleDiv.appendChild(title);
    
      // TODO: Use document.createElement and appendChild to create and append more elements
        const urlLink = document.createElement('a');
        urlLink.href = article.url;
        urlLink.textContent = "READ MORE!";
        urlLink.classList.add("centered"); //adds a class
        urlLink.target = "_blank";
        articleDiv.appendChild(urlLink);

        if (article.urlToImage) {
        const articleImg = document.createElement('img');
        articleImg.src = article.urlToImage;
        articleImg.alt = article.title;
        articleDiv.appendChild(articleImg);}

        const publishing = document.createElement('p');
        publishing.textContent = new Date(article.publishedAt).toLocaleString(); //convert to Date object to local specific string 
        articleDiv.appendChild(publishing);
        /**.toLocaleString(): This method converts the Date object to a string using the browser's locale settings. This will typically display the date and time in a format appropriate for the user's location, such as "2/15/2024, 8:00:00 AM" for en-US locale.
By using toLocaleString(), you ensure that the publishing date is presented in a format that is easy to read and understand for users in different regions. It automatically adapts to the user's locale settings, providing a more user-friendly experience. */
      
//its better to use conditional if to make sure if author or source and source name not present it just wouldnt show it
//this will prevent showing null or undefined.
        if (article.author) {
            const author = document.createElement('p');
            author.textContent = article.author;
            articleDiv.appendChild(author);
        }

        if (article.source && article.source.name) {
            const source = document.createElement('p');
            source.textContent = article.source.name;
            articleDiv.appendChild(source);
        }
      newsDiv.appendChild(articleDiv);


    }
}