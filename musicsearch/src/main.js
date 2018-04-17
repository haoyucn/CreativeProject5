import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data: {
    musicList: [],
    resultString: '',
    loading: false,
    musicName: '',
    showingPlayList: false,
  },
  methods: {
    GetSongs: function(){
      this.loading = true;
      this.resultString = "";
      this.musicList = [];
      fetch('https://itunes.apple.com/search?term=' + this.musicName).then(response => {
        return response.json();
      }).then(json =>{
	console.log(json);
        this.loading = false;
          this.resultString = "Search results for " + this.musicName + " (total of " + json.results.length + " items)";
              for (var i = 0; i < json.results.length; i++) {
                var data = {
                  image: json.results[i].artworkUrl100,
                  trackName : this.truncate(json.results[i].trackName),
                  artistName: this.truncate(json.results[i].artistName),
                  GenreName: this.truncate(json.results[i].primaryGenreName),
                  releaseDate: this.truncateDate(json.results[i].releaseDate),
                  previewUrl: json.results[i].previewUrl,
                  itunesUrl: json.results[i].trackViewUrl,

                };
                this.musicList.push(data);
              }
      })
      this.showingPlayList = false;
    },
    GetFavs: function(){
      console.log("nnnn");
      this.musicList = [];
      axios.get('/api/favorites').then(response=>{
        this.musicList = response.data;
        this.resultString = "My Favorites";
        return true;
      }).catch(err=>{
      });
      this.showingPlayList = true;
    },
    truncate: function(string) {
      var tempString = string;
      if (tempString.length > 25) {
        tempString = tempString.substring(0, 25);
        tempString += "...";
      }
      return tempString;
    },
    truncateDate: function(string) {
      return string.substring(0, 10);
    },
    addToFav: function(data){
      axios.post('/api/addToFav',{
        song: data,
      }).then(response=>{
        alert("song added to favorites");
      }).catch(err=>{

      });
    },
    played:function(){
      console.log("played");
    },
    removeFromFav: function(data){
      axios.delete('/api/delete/' + data.songid).then(response=>{
        this.GetFavs();
      }).catch(err=>{
      })
    },
    sort: function(){
      axios.put('/api/sort').then(response => {
        this.GetFavs();
      }).catch(err=>{
      });
    }
  },
})
