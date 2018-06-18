(function() {
  class Card {
    constructor(cardElem) {
      this.allReposFlag = false;
      this.cardElem = cardElem;
      if (!cardElem.getAttribute('repos') && cardElem.getAttribute('repos').toLowerCase() !== 'all') {
        this.repos = [];
        if (cardElem.getAttribute('repo1')) {
          this.repos.push(cardElem.getAttribute('repo1'));
        }
        if (cardElem.getAttribute('repo2')) {
          this.repos.push(cardElem.getAttribute('repo2'));
        }
      }else if(cardElem.getAttribute('repos').toLowerCase() === 'all'){
        this.repos = 'all';
      } 
      else {
        this.repos = cardElem.getAttribute('repos').split(',');
      }
      this.username = cardElem.getAttribute('username');
    }
    create() {
      if (!this.username) {
        console.log('Error00:Username not specified');
        return;
      }
      let http = new HttpJS();
      http.get('https://api.github.com/users/' + this.username).then((card) => {
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('github-card-container');
        cardContainer.innerHTML =
          `
       <div class='github-card-header'>
           <img class='github-card-logo' src='https://magentys.io/wp-content/uploads/2017/04/github-logo-1.png'>
       </div>
       <div class='github-card-content'>
           <table class='github-card-image-text-wrap'>
               <td><img class='github-card-avatar' src='${card.avatar_url}' width=100></td>
               <td class='github-card-name'>
                   ${card.name}<br />
                   <span style='color:#222;font-size:9pt;'>Followers: ${card.followers} | Following: ${card.following}</span><br />
                   <a target='_blank' class='github-card-button' href='${card.html_url}'>View profile</a>
               </td>
           </table>
       </div><br /><br /><br /><br />
`;
        this.cardElem.appendChild(cardContainer);
      }).then(() => {
        if(this.repos === 'all'){this.allReposFlag = true;}
        if (this.repos.length > 0 || this.allReposFlag)  {
          try {
            http.get(`https://api.github.com/users/${this.username}/repos`).then((reposData) => {
              let reposFound = [];
              if(this.allReposFlag){
                reposFound = reposData;
              }else{
                this.repos.forEach(function(userAddedRepos) {
                  reposData.forEach(function(userAllRepos) {
                    if (userAddedRepos.toLowerCase().trim() === userAllRepos.name.toLowerCase().trim()) {
                      reposFound.push(userAllRepos);
                    }
                  });
                });
              }
              if (reposFound.length > 0) {
                let cardContainer = this.cardElem.querySelector('.github-card-container');
                cardContainer.innerHTML += "<span id='github-card-repo-headline' style='font-size:9pt;color:#777font-weight:bold;margin:text-align:center'><center>Repositories</center></span><div class='github-card-repos' id='github-card-repos'></div>";
                reposFound.forEach(function(card, i) {
                  if(!card.language){card.language = ' -';}
                  var div = document.createElement('div');
                  div.id = 'github-card-repo' + (i + 1);
                  div.innerHTML = "<a class='github-card-repo-headline' href=" + card.html_url + "><b>" + card.name + "</b></a><br><span class='github-card-repo-desc'>" + card.description + "</span><br><span class='gc-lang' style='font-size:8pt;'>&#9733;"+ card.language + "</span>";
                  div.classList.add('github-card-repo');
                  cardContainer.querySelector('.github-card-repos').appendChild(div);
                });
              }
            }).catch((err) => {
              console.log("Error02: " + err);
            });
          } catch {
            console.log("Error03");
          }
        }
      }).catch((err) => {
        console.log("Error01: " + err)
      });
    }
  }

  class HttpJS {
    constructor() {}
    get(url) {
      return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4) {
            if (xhr.status == 404) {
              reject('404');
            } else {
              resolve(JSON.parse(xhr.responseText));
            }
          }
        }
      });
    }
  }

  window.onload = function() {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://saurabhdaware.github.io/github-profile-card/cardStyle.css';
    link.media = 'all';
    document.head.appendChild(link);
    document.querySelectorAll('.github-card').forEach(function(a) {
      let card = new Card(a);
      card.create();
    });
  }
})();
