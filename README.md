# Github Profile Card
Unofficial Github profile card for your websites / blogs

### Link : [https://saurabhdaware.github.io/github-profile-card/githubcard.html](https://saurabhdaware.github.io/github-profile-card/githubcard.html) 


## How to use

- Enter your username, repository names(seprated by ",") and paste wherever you want your card
```
    <div username='saurabhdaware' repos='github-profile-card, storm, stormv2' class='github-card' id="card"></div>
```

- Paste following code before the end of body tag `</body>`

```
    <script src='https://saurabhdaware.github.io/github-profile-card/card.js'></script>
```

- If you dont want to show repositories you can simply remove those attributes
```
    <div username='saurabhdaware' class='github-card' id="card"></div>

```

## How to customize
- These are the original styles of outer div
```
.github-profile{
    margin:0 !important;
    padding:0;
    display:inline-block;
    border:1px solid black;
    width:300px;
    font-family: 'Play', sans-serif;
    box-shadow:0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19)
}
```


- If your name doesn't fit perfectly in the card you can adjust the width of that card with
```
.github-profile{
    width:400px !important;
}
```


## Example
- Input

```
<html>
    <head>
    </head>
    <body>
        <!-- Other html code-->
        <div username='saurabhdaware' repos='github-profile-card,storm, stormv2' class='github-card' id="card"></div>
        <!-- Other html code -->
        <script src='https://saurabhdaware.github.io/github-profile-card/card.js'></script>
    </body>
</html>
```

- Output

![](https://raw.githubusercontent.com/aks13raut/github-profile-card/master/example.png)

![](https://raw.githubusercontent.com/aks13raut/github-profile-card/master/example2.png)


## About Project
- Let me know if you find any bug.
- You can contribute to this project 
- Send pull request if you find any possible improvement

## Known Bugs:
- whitespace added after the last repository results in that repository not being found
  avoid 
```
    <div username='saurabhdaware' repos='github-profile-card, storm,stormv2 ' class='github-card' id="card"></div>
```
