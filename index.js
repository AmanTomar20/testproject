var gameState=0;
var btnArr=['green','red','yellow','blue']
var dataArr=[]
var level
var j //read from start


if(!gameState){
    $('#start-btn').click(()=>{
        $('#start-btn').addClass('pressed')
        setTimeout(()=>{
            $('#start-btn').removeClass('pressed')
        },500)
        gameState=1;
        dataArr=[]
        level=0
        j=0
        $('#start-btn').slideUp(1000)
        $('.container').slideDown(1000)
        setTimeout(()=>{
            nextLevel()
        },1000)
    })
}



var nextLevel=()=>{
    level++;
    $('#level-title').text("Level "+level)
    var num=Math.floor(4*Math.random())
    dataArr.push(btnArr[num])
    j=0
    setTimeout(()=>{
        $('#'+btnArr[num]).fadeIn(100).fadeOut(300).fadeIn(100)
        produceSound(num)
    },600)
}

var produceSound=(num)=>{
    var audio
    if(num===5){
        audio=new Audio('sounds/wrong.mp3')
    }
    else
        audio=new Audio('sounds/'+btnArr[num]+'.mp3')
    audio.play()
}

var clickEffect=(num)=>{
    const $color=$('.'+btnArr[num])
    $color.addClass('pressed')
    setTimeout((sel)=>{
        sel.removeClass('pressed')
    },500,$color)
}


$('.btn').on('click',function (){
    if(gameState){
        num=btnArr.findIndex((btn)=>{
            return btn===this.classList[1]
        })
        clickEffect(num)
        if(this.classList[1]!==dataArr[j]){
            console.log(dataArr)
            console.log('j: '+j)
            produceSound(5)
            setTimeout(()=>{
                gameOver()
            },1000)
        }
        else if(j<dataArr.length-1){
            ++j;
            produceSound(num)
        }
        else{
            produceSound(num)
            setTimeout(()=>{
                nextLevel()
            },1000)
        }
            
    }    
})

var gameOver=()=>{
    $('#level-title').text('Game Over')
    gameState=0
    $('body').addClass('game-over')
    setTimeout(()=>{
        $('body').removeClass('game-over')
    },200)
    setTimeout(()=>{
        $('#level-title').text('Simon Game').fadeOut(500).fadeIn(500)
    },3000)
    $('#start-btn').slideDown(1000)
    $('.container').slideUp(1000)
}
