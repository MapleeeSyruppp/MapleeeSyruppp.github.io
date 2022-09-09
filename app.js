let clicker = document.querySelector('.clicker')
let counter = document.querySelector('.counter');
let upgradeContainer = document.querySelector('.upgrades')

// Player 
let player = new Player(0, 1)

// Generate Upgrades
let clickies = new MultiplierUpgrade('clickies', 50,1)
let lilypad = new Upgrade('lilypad', 100,2)
let buddies = new Upgrade('buddies', 200,4)
let flybait = new Upgrade('flybait', 400,6)
let flytrap = new Upgrade('flytrap', 800, 8)
let bugzapper = new Upgrade('bugzapper', 1000, 10)

// Get from Local Storage
if(localStorage.getItem("player") == null){
    localStorage.setItem("player", JSON.stringify(player))
}
if(localStorage.getItem("upgrades") == null){
    localStorage.setItem("upgrades", JSON.stringify({counts: [buddies.count, lilypad.count, flybait.count, flytrap.count, bugzapper.count]}))
}
let playerDeserialized = JSON.parse(localStorage.getItem("player"))
let upgradesDeserialized = JSON.parse(localStorage.getItem("upgrades"))

// Player
player.score = playerDeserialized.score
player.increment = playerDeserialized.increment

// upgrades
buddies.count = upgradesDeserialized.counts[0]
lilypad.count = upgradesDeserialized.counts[1]
flybait.count = upgradesDeserialized.counts[2]
flytrap.count = upgradesDeserialized.counts[3]
bugzapper.count = upgradesDeserialized.counts[4]

// Upgrades Array
const upgrades = [clickies, lilypad, buddies, flybait, flytrap, bugzapper]

// Generate each upgrade
upgrades.forEach((upgrade) => {
    upgrade.generate()
})

// Can player purchase any upgrade
function canPurchase(){
    upgrades.forEach((upgrade) => {
        upgrade.canPurchase()
    })
}

// Adds click event listener to each upgrade button
upgrades.forEach((upgrade) => {
    upgrade.element.addEventListener("click", (ev) => {
        // Upgrade Btn on click
        upgrade.purchase()
        upgrade.updateCost()
        if(upgrade.name === "buddies"){
            buddies.updateImg()
        }
    })
})

clicker.onclick = function () {
    const audio = new Audio("./sound/click_sound.mp3")
    audio.volume = 0.01
    audio.play()
    player.increaseScore()
    canPurchase()
}

setInterval(() => {
    let updateableUpgrades = [upgrades[1], upgrades[2], upgrades[3], upgrades[4], upgrades[5]]
    updateableUpgrades.forEach((upgrade) => {
        if(upgrade.count >= 1){
            upgrade.update()
            canPurchase()
        }
    })
}, 1000)

setInterval(() => {
    save()
    let updateableUpgrades = [upgrades[1], upgrades[2], upgrades[3], upgrades[4], upgrades[5]]
    let perSecond = document.querySelector('.counter-per-second')
    perSecond.textContent = `${
        (buddies.count * buddies.increment) + 
        (lilypad.count * lilypad.increment) + 
        (flybait.count * flybait.increment) + 
        (flytrap.count * flytrap.increment) +
        (bugzapper.count * bugzapper.increment)} Fp/s`

        updateableUpgrades.forEach((upgrade) => {
            upgrade.element.children[0].textContent = `${upgrade.name} (${upgrade.count})`
        })
}, 100)

function save(){
    // Save and Get Player Data
    // Get data from player
    var newPlayerData = player
    // If there is nothing saved at start then save player stats
    if(localStorage.getItem("player") == null){
        localStorage.setItem("player", JSON.stringify(newPlayerData))
    }
    // Get old data and store in new data
    var oldPlayerData = JSON.parse(localStorage.getItem("player"))
    oldPlayerData = newPlayerData
    localStorage.setItem("player", JSON.stringify(oldPlayerData))

    // Save and Get Upgrades
    var newUpgradeCount = {counts: [buddies.count, lilypad.count, flybait.count, flytrap.count, bugzapper.count]}

    if(localStorage.getItem("upgrades") == null){
        localStorage.setItem("upgrades", JSON.stringify(newUpgradeCount))
    }
    var oldUpgradeCount = JSON.parse(localStorage.getItem("upgrades"))
    oldUpgradeCount = newUpgradeCount
    localStorage.setItem("upgrades", JSON.stringify(oldUpgradeCount))

    player.update()
}