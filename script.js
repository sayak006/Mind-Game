const menu=document.querySelector('.menu')
const playBtn=document.querySelector("#playBtn")
const names=document.querySelector('#names')
const playImg=document.querySelector("#playImg")
const userSequence=document.querySelector("#userSequence")
const submitBtn=document.querySelector("#submitBtn")
const scoreText=document.querySelector("#scoreText")
// const restartBtn=document.querySelector("#restartBtn")
const detailBtn=document.querySelector('#detailBtn')
const table=document.querySelector('table')

const restartBtn=document.createElement('button')
restartBtn.id='restartBtn'
restartBtn.textContent='Restart'

// const photo=['cat.jpg','peacock.jpg','lion.jpg','dog.jpg','snake.jpg','horse.jpg','eagle.jpg','elephant.jpg','frog.jpg']
// const compPhotoId=['Cat','Peacock','Lion','Dog','Snake','Horse','Eagle','Elephant','Frog']
const seq=[
    ['cat.jpg','peacock.jpg','lion.jpg','dog.jpg','snake.jpg','horse.jpg','eagle.jpg','elephant.jpg','frog.jpg'],
    ['bmw.png','jaguar.png','supra.png','audi.png','ferrari.png','lamborghini.png','porsche.png','toyota.png'],
    ['horse.jpg','dog.jpg','elephant.jpg','lion.jpg','frog.jpg','cat.jpg','snake.jpg','eagle.jpg','peacock.jpg'],
    ['bmw.png','audi.png','lamborghini.png','toyota.png','ferrari.png','porsche.png','jaguar.png','supra.png'],
    ['dog.jpg','lion.jpg','cat.jpg','eagle.jpg','horse.jpg','elephant.jpg','frog.jpg','peacock.jpg','snake.jpg'],
    ['audi.png','bmw.png','ferrari.png','jaguar.png','lamborghini.png','porsche.png','supra.png','toyota.png'],
]
const seqID=[
    ['Cat','Peacock','Lion','Dog','Snake','Horse','Eagle','Elephant','Frog'],
    ['Bmw','Jaguar','Supra','Audi','Ferrari','Lamborghini','Porsche','Toyota'],
    ['Horse','Dog','Elephant','Lion','Frog','Cat','Snake','Eagle','Peacock'],
    ['Bmw','Audi','Lamborghini','Toyota','Ferrari','Porsche','Jaguar','Supra'],
    ['Dog','Lion','Cat','Eagle','Horse','Elephant','Frog','Peacock','Snake'],
    ['Audi','Bmw','Ferrari','Jaguar','Lamborghini','Porsche','Supra','Toyota'],
]
let random=Math.floor(Math.random()*seq.length)
console.log(random)
let count=-1
let stopped=null

const identity=()=>{
    let userName=prompt('Enter your name')
    document.querySelector('th:nth-child(2)').textContent=`${userName} choice`
}
const create=(userPhotoId)=>{
    for(i=0;i<seqID[random].length;i++){
        const tr=document.createElement('tr')
        const td1=document.createElement('td')
        const td2=document.createElement('td')
        const td3=document.createElement('td')
        // console.log(userPhotoId[i],compPhotoId[i])
        if(userPhotoId[i]===undefined){
            // console.log(compPhotoId[i])
            td1.textContent=seqID[random][i]
            td2.textContent="No answer"
            td3.textContent="Retry"
            td3.style.color="Yellow"
        }else{
            td1.textContent=seqID[random][i]
            td2.textContent=userPhotoId[i]
            if(seqID[random][i].toLowerCase()===userPhotoId[i].toLowerCase()){
                td3.innerHTML='&#9989;'
            }else{
                td3.innerHTML='&#10060;'
            }
        }
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        table.append(tr)
    }
}
const changePhoto=()=>{
    count++
    if(count===seq[random].length){ 
        playImg.src='image/play.jpg'
        names.textContent="END"
        count=-1
        userSequence.removeAttribute('disabled')
        clearInterval(stopped)
    }else{
        playImg.src=`image/${seq[random][count]}`
        names.textContent=seqID[random][count]
    }
}
const scoreEvaluation=(score)=>{
    const evaluation=seq[random].length-score
    const total=seq[random].length
    if(evaluation===0){
        scoreText.innerHTML=`Your score: ${score}/${total} &#128526;`
    }
    else if(evaluation>=1 && evaluation<=2){
        scoreText.innerHTML=`Your score: ${score}/${total} &#128513;`
    }
    else if(evaluation>=3 && evaluation<=4){
        scoreText.innerHTML=`Your score: ${score}/${total} &#128517;`
    }
    else if(evaluation>=5 && evaluation<=7){
        scoreText.innerHTML=`Your score: ${score}/${total} &#128531;`
    }
    else if(evaluation===seq[random].length-1){
        scoreText.innerHTML=`Your score: ${score}/${total} &#128557;`
    }
}
const compare=(userSequence)=>{
    
    let userSelection=userSequence.value;
    // console.log(userSelection)
    const userPhotoId=[]
    let name="";
    for(i=0;i<userSelection.length;i++){
        if(userSelection[i]===" "){
            userPhotoId.push(name)
            i++
            name="";
        }
        name+=userSelection[i]
    }
    userPhotoId.push(name)
    let score=0    
    for(i=0;i<userPhotoId.length;i++){
        if(seqID[random][i].toLowerCase()===userPhotoId[i].toLowerCase()) score++
        else break
    }
    scoreEvaluation(score)
    create(userPhotoId)
}

playBtn.addEventListener('click',async()=>{
    await identity()
    playBtn.remove()
    // document.querySelector('#audio').play()
    names.style.visibility="visible"
    stopped=setInterval(changePhoto,700)
})
submitBtn.addEventListener('click',()=>{
    if(userSequence.value.length===0) alert("Please write...")
    else{
        submitBtn.replaceWith(restartBtn)
        compare(userSequence)
    }
})
restartBtn.addEventListener('click',()=>{
    // document.querySelector('#audio').pause()
    location.reload()
})
menu.addEventListener('click',()=>{
    menu.classList.toggle("change");
    document.querySelector('.inactive-rule').classList.toggle("active")
})
detailBtn.addEventListener('click',()=>{
    document.querySelector('.inactive-result').classList.toggle("active")
})