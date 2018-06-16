(function() {
  class Card {
    constructor(cardElem) {
      this.cardElem = cardElem;
      if (!cardElem.getAttribute('repos')) {
        this.repos = [];
        if (cardElem.getAttribute('repo1')) {
          this.repos.push(cardElem.getAttribute('repo1'));
        }
        if (cardElem.getAttribute('repo2')) {
          this.repos.push(cardElem.getAttribute('repo2'));
        }
      } else {
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
        var cardContainer = document.createElement('div');
        cardContainer.classList.add('github-card-container');
        var cardHeader = document.createElement('div');
        cardHeader.classList.add('github-card-header');
        var cardLogo = document.createElement('img');
        cardLogo.classList.add('github-card-logo');
        cardLogo.setAttribute('src', 'https://magentys.io/wp-content/uploads/2017/04/github-logo-1.png');
        cardHeader.appendChild(cardLogo);
        cardContainer.appendChild(cardHeader);
        var cardContent = document.createElement('div');
        cardContent.classList.add('github-card-content');
        var cardImageTextWrap = document.createElement('table');
        cardImageTextWrap.classList.add('github-card-image-text-wrap');
        var tableTd1 = document.createElement('td');
        var cardAvatar = document.createElement('img');
        cardAvatar.classList.add('github-card-avatar');
        cardAvatar.setAttribute('src', card.avatar_url);
        cardAvatar.setAttribute('width', 100);
        tableTd1.appendChild(cardAvatar);
        cardImageTextWrap.appendChild(tableTd1);
        var tableTd2 = document.createElement('td');
        tableTd2.classList.add('github-card-name');
        tableTd2.innerHTML = card.name + "<br />";
        var span1 = document.createElement('span');
        span1.style.color = '#222';
        span1.style.fontSize = '9pt';
        span1.innerHTML = 'Followers: ' + card.followers + ' | Following: ' + card.following;
        tableTd2.appendChild(span1);
        tableTd2.innerHTML += "<br />";
        var cardButton = document.createElement('a');
        cardButton.classList.add('github-card-button');
        cardButton.setAttribute('href', card.html_url);
        cardButton.setAttribute('target', '_blank');
        cardButton.innerHTML = 'View profile';
        tableTd2.appendChild(cardButton);
        cardImageTextWrap.appendChild(tableTd2);
        cardContent.appendChild(cardImageTextWrap);
        cardContainer.appendChild(cardContent);
        cardContainer.innerHTML += "<br /><br /><br /><br />";
        if (this.repos.length > 0) {
          try {
            http.get(`https://api.github.com/users/${this.username}/repos`).then((reposData) => {
              var reposFound = [];
              this.repos.forEach(function(i, iInd) {
                reposData.forEach(function(j) {
                  if (i.toLowerCase().trim() === j.name.toLowerCase().trim()) {
                    reposFound.push(j);
                  }
                });
              });
              if (reposFound.length > 0) {
                var cardRepoHeadline = document.createElement('span');
                cardRepoHeadline.setAttribute('id', 'github-card-repo-headline');
                cardRepoHeadline.style.color = '#777';
                cardRepoHeadline.style.fontSize = '9pt';
                cardRepoHeadline.style.fontWeight = 'bold';
                cardRepoHeadline.style.textAlign = 'center';
                var centerTag = document.createElement('center');
                centerTag.innerHTML = 'Repositories';
                cardRepoHeadline.appendChild(centerTag);
                cardContainer.appendChild(cardRepoHeadline);
                var cardRepos = document.createElement('div');
                cardRepos.classList.add('github-card-repos');
                cardRepos.setAttribute('id', 'github-card-repos');
                reposFound.forEach(function(i, ind) {
                  var div = document.createElement('div');
                  div.classList.add('github-card-repo');
                  div.id = 'github-card-repo' + (ind + 1);
                  var repoLink = document.createElement('a');
                  repoLink.classList.add('github-card-repo-headline');
                  repoLink.setAttribute('href', i.html_url);
                  repoLink.innerHTML = "<b>" + i.name + "</b></a><br />";
                  div.appendChild(repoLink);
                  var repoDesc = document.createElement('span');
                  repoDesc.classList.add('github-card-repo-desc');
                  repoDesc.innerHTML = i.description;
                  div.appendChild(repoDesc);
                  div.innerHTML += "<br />";
                  var repoLang = document.createElement('span');
                  repoLang.style.fontSize = '8pt';
                  repoLang.innerHTML = i.language;
                  div.appendChild(repoLang);
                  cardRepos.appendChild(div);
                });
                cardContainer.appendChild(cardRepos);
              }
            }).catch((err) => {
              var caler_line = err.stack
              console.log("Error02: " + err);
            });
          } catch {
            console.log("Error03");
          }
        }
        this.cardElem.appendChild(cardContainer);
      }).catch((err) => {
        console.log("Error01: " + err);
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
