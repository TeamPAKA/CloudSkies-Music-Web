
// // npm init -y
// // npm install axios 
// // index.js

//  const axios = require('axios');

// axios.get('https://api.spotify.com/v1/search?q=&type=track', {
//     headers: {
//     'Authorization': 'Bearer BQBO-DoQ0kiEeAuwqzpToY_gty64uO0FVwV5ypEnxrhYd15HlSC4fRJ8_yqWmh-bYoNBrb1HuwfzuJeVO6Mx2t81fPVUVufHp4BJfQcg55vbFs32E7iNiCgZ42GPK4Ia9faJzcEga8cnLhu1M-mIM49dM3g0zNu4cz0cqmBk837QiInk1jk-fd10su5KZBNTOM5lkKS47Db8Rr3DvEg'
// }
// }).then((data)=>{
//     console.log(data.data.tracks.items[0].id);
// })

document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchBtn.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Please enter a search query');
            return;
        }

        const accessToken = 'Bearer BQBz7R32LYFDcoTxNiqxoJXYeLSP9bCC-GpF5gWDy3dhWVW5aMenk5VwOlxcKD3oqxQRvelOC2-3KTY9Swh34dTHfRs1T7JMA-_lr0CSAuR4v3ObkIiqBIxb7uyrocmvp48LXKlkpljNltliwz-1_6X0FBX15XXx81TvzYf84vgkxXJYkrMFj1znlp3UYSf1JYGOT-KZ73BCZU8Kip4'; // Replace with your actual access token

        axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => {
            const tracks = response.data.tracks.items;
            if (tracks.length === 0) {
                searchResults.innerHTML = '<p>No results found</p>';
            } else {
                const trackList = tracks.map(track => {
                    return `
                        <div class="track">
                            <h3>${track.name}</h3>
                            <p>Artist: ${track.artists.map(artist => artist.name).join(', ')}</p>
                            <iframe src="https://open.spotify.com/embed/track/${track.id}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>
                    `;
                }).join('');
                searchResults.innerHTML = trackList;
            }
        }).catch(error => {
            console.error('Error fetching search results:', error);
            alert('An error occurred while fetching search results. Please try again.');
        });
    });
});
