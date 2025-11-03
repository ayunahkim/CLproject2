
// this is for the random leaves that fall in the opening page, must go in js because its an animation girlie

setInterval(() => {
    const leaf = document.createElement('div'); //makes sure the leaves keep falling and don't only run one time
    leaf.textContent = '🍂';
    leaf.style.position = 'fixed'; //helps stay in the window
    leaf.style.left = Math.random() * 100 + '%'; //think of it as a grid with a leaf randomizer for locations to fall at
    leaf.style.top = '-50px'; //starting line lol, the top of the window 
    leaf.style.fontSize = '30px';
    leaf.style.animation = 'fall 8s linear'; //timing 
    leaf.style.pointerEvents = 'none';
    document.body.appendChild(leaf);
    
    setTimeout(() => leaf.remove(), 8000); // control delete leaf from page 
}, 500);