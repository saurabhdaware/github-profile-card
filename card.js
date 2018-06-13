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
                if(xhr.readyState == 4){
                    resolve(JSON.parse(xhr.responseText));
                }
            }
        })
    }
}

let head  = document.getElementsByTagName('head')[0];
let link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'cardStyle.css';
link.media = 'all';
head.appendChild(link);

class Card{
    constructor(username){
        this.username = username;
    }
    create(){
        let http = new HttpJS();
        http.get('https://api.github.com/users/'+this.username).then((card)=>{
            console.log(card);
            document.getElementById('card').innerHTML = 
`
    <div class ='card-container'>
        ${card.name}
    </div>
`;
        })
    }
}

let card = new Card('saurabhdaware');
card.create();

