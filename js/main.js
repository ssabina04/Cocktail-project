const API = 'https://www.thecocktaildb.com/api/json/v1/1/'



let form, input, output
form = document.getElementById('form')
input = document.getElementById('input')
output = document.getElementById('output')
let searchBtn = document.getElementById('searchBtn')
let select = document.getElementById('select')

const getAllCocktails = async () => {
    const request = await fetch(API + 'filter.php?c=Cocktail')
    const response = await request.json()
    renderCocktail(response.drinks)
}

const getCocktailByName = async (name) => {
    const request = await fetch(API + 'search.php?s=' + name)
    const response = await request.json()
    renderCocktail(response.drinks)
}
searchBtn.addEventListener('click', getCocktailByName)

const filterCocktailByAlcoholic = async(types) => {
    const request = await fetch(API + 'filter.php?a=' + types)
    const response = await request.json()
    renderCocktail(response.drinks)
}

const renderCocktail = (data) => {
    output.innerHTML = ''
    input.value = ''
    data ? data.map((el, index) => {
        let card = document.createElement('div')
        let img = document.createElement('img')
        let h2 = document.createElement('h2')



        card.classList.add('cards')
        img.src = el.strDrinkThumb
        h2.innerHTML = el.strDrink

        // let cards=document.createElement('div')
        card.addEventListener('click',()=>{
        getDetailsById(el.idDrink) 
        })

        card.append(img, h2)
        output.append(card)
    })
        : 'Server ERROR'
}


const getDetailsById=async(id)=>{
    output.innerHTML=''
    let request=await fetch(API+'lookup.php?i='+id)
    let response=await request.json()
    console.log(response.drinks)
    renderForDetail(response.drinks[0])
}


const renderForDetail=(data)=>{
    output.innerHTML=''     
    
        const mainDiv = document.createElement('div')
        mainDiv.classList.add('maindiv')

        const h2 = document.createElement('h2')
        h2.classList.add('name')
         const detail = document.createElement('div')
        detail.classList.add('detailDiv')

        const detailImg = document.createElement('img')
        detailImg.classList.add('detailImg')

        const detailDescr = document.createElement('div')
        detailDescr.classList.add('descr')
        
        const p = document.createElement('p')
        p.classList.add('pingr')
        const ingredients = document.createElement('div')
        ingredients.classList.add('ingred')
        // ingredients.classList.add('divIngr')


        h2.innerHTML = data.strDrink
        detailImg.src= data.strDrinkThumb
        p.innerHTML =  data.strInstructions         
        
        for (let i = 1; i <= 3; i++){
            
            const ingrItem = document.createElement('p')
            ingrItem.innerHTML = data['strIngredient' + i]
            ingrItem.classList.add('ingr')
            ingredients.append(ingrItem)

            ingrItem.addEventListener('click', () => {
                getDetailInfo(data['strIngredient' + i])
            })
        }

        detailDescr.append( p, ingredients)
        detail.append(h2, detailImg)

        mainDiv.append(detail, detailDescr)
        output.append(mainDiv)
}

const getDetailInfo=async(name)=>{
    let request=await fetch(API+'search.php?i='+ name)
    let response=await request.json()
    console.log(response.ingredients[0])
    renderForInfo(response.ingredients[0])
 
}

const renderForInfo = (data) => {
        output.innerHTML= ''
        let tittle = document.createElement('h2')
        let decription = document.createElement('p')
        tittle.innerHTML = data.strIngredient
        decription.innerHTML = data.strDescription
        output.append(tittle, decription)
        
}

getAllCocktails()
searchBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    getCocktailByName(input.value)
   
})


 select.addEventListener('change', ()=> filterCocktailByAlcoholic(select.value))

 document.body.append(output)

//========================================


 
