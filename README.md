# **Stack.io**

> A WebGL game built on THREE.js and React
>
> This was a small project (version 1.0) that I initiated for my computer graphics course. The inspiration comes from a mobil game that I played a lot when several years ago, and I wonder if I can create it with `THREE.js`. Version 1.0 is functional, but totally not maintainable. So for version 2.0, the project is completely rewritten, with modern web dev tools like `webpack`, `node.js`, `React` and `Redux`, etc. Hope you enjoy the game!:sunglasses:
>
> - [ENTER GAME HERE(1.0)](https://acw101.github.io/StackIt)
>
> - Version 2.0 coming soon:
>
>   Integration: `React.js` and `redux`
>
>   Backend: `Firebase` - handle user login and data storage

![menu](./src/assets/img/menu.png)

## Game Rules

The goal is to stack up blocks as high as possible. Be careful! If the new brick is not landing perfectly on the top of stack, the excessive portion out of top brick's border will disappear! If you totally miss the top brick, game over.



## Frameworks and Libraries

**React**

**Redux**

**THREE.js & Physijs**

This is the cornerstone for the game itself, and it's a powerful tool for desgining WebGL comtent with ease.

**Firebase**

Firebase offers clean and simple APIs to persist data, and deploy web apps. And it also offers other useful features like user login and authentication.

---

## To Do List

### UI

- [x] Hide the leaderboard since it's not actually being used
- [x] HIde the login button and options, unless Firebase is actually being used for an actual login system. If proper firebase envs are not supplied, or the supplied values fail to work, assume that it firebase (and hence login) should be disabled.

### Scoring System

- [x] Currently in EndMenu.js the score is fixed, and the leaderboard is faked. Instead, implement a real scoring system. There is no Notion of 'max combo' that we will measure. Instead we will score 1 point per block stacked. We will keep a running total internally.
- [x] While blocks are being stacked, display a 'current score' in the upper-center part of the screen.
- [x] After every game, store the player's highest score in local storage
- [x] After the game finishes, display the score the player got versus their highest score.

### Gameplay

- [x] Capture the space-button from the keyboard and register it the same as a 'click' or a 'tap' in the game.
- [x] Begin keeping track of a 'perfect stack' internally; we will call this the combo meter. A perfect stack is when blocks are placed with no loss on top of each other.
- [x] When the player has 3 or more perfect stacks in a row (combo of 3) expand the size of the block that was just placed. The next block to be placed will match its new, larger size. The core mechanic of the game is that as players miss, pieces of the block are shaved off, until there are no pieces left, but this mechanic allows pieces to be expanded upon. The size of the block cannot be expanded to be larger than the starting size of the block (with 0 stacks).

### Cosmetic 

- [ ] Whenever a player gets a perfect stack (combo), display a small square ripple emminating from the middle of the block outward
- [ ] When the player gets to a perfect-stack (combo) of 3 or more, every block placed should send out small subtle fireworks
- [ ] Start off with a random color for the base-block, and then for every block placed pick a new adjacent color along the color wheel. Move the color wheel in one direction the entire time. Use low-saturation, matte, pastel colors, so that they are not distracting.
- [ ] For the background, start off with a gradient pattern that should contrast the block's color. It should start off with one color near the bottom and then go up to another color higher in the sky. Also add in small subtle stars into the background.
- [ ] After a piece of a block is 'shaved off', allow it to fall and tumble much longer before being disappearing
- [ ] Run the game entirely in-browser; do not depend upon there being any sort of server to do the physics and falling calculations for a block falling. Currently if you do not have a server running, the game will still play in browser, but for some reason the blocks will not fall.

