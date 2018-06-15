# Github Profile Card
Unofficial Github profile card for your websites / blogs

### Link : [https://saurabhdaware.github.io/github-profile-card/githubcard.html](https://saurabhdaware.github.io/github-profile-card/githubcard.html) 


## How to use

- Enter your username, repository names(seprated by ",") and paste wherever you want your card to appear
```
    <div username='saurabhdaware' repos='github-profile-card, storm, stormv2,planetZerugoria' class='github-card' id="card"></div>
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


- Adding more than 3 repositories will add a scrollbar in the card if you want to remove that scrollbar you can put following in your css
```
.github-card-repos{
    max-height:none !important;
    overflow-y: visible !important;
}
```


## Example
- Input

```
<html>
    <head>
    </head>
    <body>
        <!-- Other html -->
        <div username='saurabhdaware' repos='github-profile-card,storm,stormv2,planetZerugoria' class='github-card' id="card"></div>
        <!-- More html -->
        <script src='https://saurabhdaware.github.io/github-profile-card/card.js'></script>
    </body>
</html>
```

- Output

![](https://raw.githubusercontent.com/saurabhdaware/github-profile-card/master/example.png)


## About Project
- Let me know if you find any bug.
- Send pull request if you find any possible improvement.
