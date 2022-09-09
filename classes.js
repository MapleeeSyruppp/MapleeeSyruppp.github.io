class Player{
    constructor(score, increment){
        this.score = score
        this.increment = increment
    }

    increaseScore(){
        this.score += this.increment
        counter.textContent = `${this.score} Flies`
    }

    update(){
        counter.textContent = `${this.score} Flies`
    }

}

class Upgrade{
    constructor(name,price,increment){
        this.name = name
        this.price = price
        this.increment = increment
        this.count = 0
    }
    generate(opt){
        if(opt === 0 || opt === null || opt === undefined){
            let container = document.createElement('div')
            container.setAttribute('class',`upgrade-btn ${this.name}`)

            // Creates header of the upgrade
            let header = document.createElement('h3')
            header.textContent = `${this.name} `
            container.append(header)

            // Creates the cost of the upgrade
            let priceParagraph = document.createElement('p')
            priceParagraph.textContent = 'Cost: '
            let price = document.createElement('span')
            price.setAttribute('class','cost')
            price.textContent = this.price
            priceParagraph.append(price)
            container.append(priceParagraph)

            // Appends the tags to the col2 container
            upgradeContainer.append(container)
            // Creates element property in the object
            this.element = document.querySelector(`.${this.name}`)
        }
        if(opt === 1){
            let container = document.createElement('div')
            container.setAttribute('class',`upgrade-btn ${this.name}`)

            // Creates header of the upgrade
            let header = document.createElement('h3')
            let span = document.createElement('span')
            span.textContent = ` x${this.increment -1}`
            header.textContent = `${this.name} `
            header.append(span)
            container.append(header)

            // Creates the cost of the upgrade
            let priceParagraph = document.createElement('p')
            priceParagraph.textContent = 'Cost: '
            let price = document.createElement('span')
            price.setAttribute('class','cost')
            price.textContent = this.price
            priceParagraph.append(price)
            container.append(priceParagraph)

            // Appends the tags to the col2 container
            upgradeContainer.append(container)
            // Creates element property in the object
            this.element = document.querySelector(`.${this.name}`)
        }
    }
    updateCost(){
        let price = document.querySelector(`.${this.name} .cost`)
        price.textContent = this.price


    }
    canPurchase(){
        if(player.score >= this.price){
            this.element.style = 'background-color: rgb(170, 204, 91)'
        }
        else{
            this.element.style = 'background-color: rgb(50, 124, 68)'
        }
    }
    purchase(){
        this.canPurchase()
        if(player.score >= this.price){
            // Increase buddie count
            this.count += 1
            this.element.children[0].textContent = `${this.name} (${this.count})`
            // Subtract price from players score
            player.score -= this.price
            // Change their click increment
            counter.textContent = `${player.score} Flies`

            this.price = Math.round(this.price * 1.25)
            this.updateCost()
            this.canPurchase()
        }
    }
    update(){
        player.score += this.increment * this.count
        counter.textContent = `${player.score} Flies`
    }
    updateImg(){
        if(this.count <= 10){
            let img = document.querySelector('.clicker')
            img.src = `./images/frog_buddies_${this.count}.png`
        }
    }
}

class MultiplierUpgrade extends Upgrade{
    constructor(name,price,increment){
        super(name, price, increment)
        this.count = 1
    }
    generate(){
        let container = document.createElement('div')
        container.setAttribute('class',`upgrade-btn ${this.name}`)

        // Creates header of the upgrade
        let header = document.createElement('h3')
        let span = document.createElement('span')
        span.textContent = ` x${this.increment + 1}`
        header.textContent = `${this.name} `
        header.append(span)
        container.append(header)

        // Creates the cost of the upgrade
        let priceParagraph = document.createElement('p')
        priceParagraph.textContent = 'Cost: '
        let price = document.createElement('span')
        price.setAttribute('class','cost')
        price.textContent = this.price
        priceParagraph.append(price)
        container.append(priceParagraph)

        // Appends the tags to the col2 container
        upgradeContainer.append(container)
        // Creates element property in the object
        this.element = document.querySelector(`.${this.name}`)
    }
    purchase(){
        this.canPurchase()
        if(player.score >= this.price){
            player.increment += this.increment
            // Increase buddie count
            this.count += 0
            this.element.children[0].textContent = `${this.name} x${player.increment + 1}`
            // Subtract price from players score
            player.score -= this.price
            // Change their click increment
            counter.textContent = `${player.score} Flies`

            this.price = Math.round(this.price * 2)
            this.updateCost()
            this.canPurchase()
        }
    }
}