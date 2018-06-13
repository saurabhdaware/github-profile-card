class HttpJS{
    constructor(){}
    get(url){
        return new Promise(function(resolve,reject){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
        
            xhr.addEventListener('readystatechange',processRequest,false);
            xhr.onreadystatechange = processRequest;
        
            function processRequest(e){
                if(xhr.readyState == 4 && xhr.status != 404){
                    resolve(JSON.parse(xhr.responseText));
                }
                if(xhr.status == 404){
                    reject('404');
                }
            }
        })
    }
}

if(document.getElementById('card') == null){console.log("please write script tag at the end of the body tag");}
let username = document.getElementById('card').getAttribute('username');
let repo1 = document.getElementById('card').getAttribute('repo1');
let repo2 = document.getElementById('card').getAttribute('repo2');

let head  = document.getElementsByTagName('head')[0];
let link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'https://saurabhdaware.github.io/github-profile-card/cardStyle.css';
link.media = 'all';
head.appendChild(link);

class Card{
    constructor(username,repo1=null,repo2=null){
        this.username = username;
        this.repo1 = repo1;
        this.repo2 = repo2;
    }
    create(){
        let http = new HttpJS();
        http.get('https://api.github.com/users/'+this.username).then((card)=>{
            document.getElementById('card').innerHTML = 
`
    <div class ='github-card-container'>
        <div class='github-card-header'>
            <img class='github-card-logo' src='https://magentys.io/wp-content/uploads/2017/04/github-logo-1.png'>
        </div>
        <div class='github-card-content'>
            <table class='github-card-image-text-wrap'>
                <td><img class='github-card-avatar' src='${card.avatar_url}' width=100></td>
                <td class='github-card-name'> 
                    ${card.name}<br>
                    <span style='color:#222;font-size:9pt;'>Followers: ${card.followers} | Following: ${card.following}</span><br>
                    <a target='_blank' class='github-card-button' href='${card.html_url}'>View profile</a>
                </td>
            </table>
        </div><br><br><br><br>
        <span id='github-card-repo-headline' style='font-size:9pt;color:#777font-weight:bold;margin:text-align:center'><center>Repositories</center></span>
        <div class='github-card-repos' id='github-card-repos'>
            <div id='github-card-repo1' class='github-card-repo'></div>
            <div id='github-card-repo2' class='github-card-repo'></div>
        </div>
    </div>
`;      }).then(()=>{
            if(this.repo1== null && this.repo2 == null){document.getElementById('github-card-repo-headline').style.display = 'none'}
            if(this.repo1 != null){
                try{
                    http.get(`https://api.github.com/repos/${this.username}/${this.repo1}`).then((repo1Data)=>{
                        document.getElementById('github-card-repo1').innerHTML =
    `
    <a class='github-card-repo-headline' href="${repo1Data.html_url}"><b>${repo1Data.name}</b></a><br>
    <span class='github-card-repo-desc'>${repo1Data.description}</span><br><span style='font-size:8pt;'>&#9733; ${repo1Data.language}</span>
    `
                    }).catch((err)=>{document.getElementById('github-card-repo1').style.display = 'none'});
                }
                catch{document.getElementById('github-card-repo1').style.display = 'none';}

            }else{document.getElementById('github-card-repo1').style.display = 'none';}
            if(this.repo2 !=null){
                try{
                    http.get(`https://api.github.com/repos/${this.username}/${this.repo2}`).then((repo2Data)=>{
                        document.getElementById('github-card-repo2').innerHTML =
    `
    <a class='github-card-repo-headline' href="${repo2Data.html_url}"><b>${repo2Data.name}</b></a><br>
    <span class='github-card-repo-desc'>${repo2Data.description}</span><br><span style='font-size:8pt;'>&#9733; ${repo2Data.language}</span>
    `
                    }).catch((err)=>{document.getElementById('github-card-repo2').style.display = 'none';})
                }
                catch{document.getElementById('github-card-repo2').style.display = 'none';}
   
            }else{document.getElementById('github-card-repo2').style.display = 'none';}
        }).catch((err)=>{console.log(err)});
    }
}

let card = new Card(username,repo1,repo2);
card.create();