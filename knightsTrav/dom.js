const render = {
    
    build(){
        const body = document.querySelector('body');

        body.innerHTML =  
        `
        <div class="container">
        <div class="board">
        </div>
        </div>
        `
        const board = document.querySelector('.board');
        board.addEventListener('click', function(e){

            handler.set(e.target);
            
        })

    },
    board(){
        const board = document.querySelector('.board');
        const fields = document.createElement('div');
        for(let i = 0; i < 8; i++){ 
            for(let j = 0; j < 8; j++){
                let field = document.createElement('div');
                if(i === 1 || (i % 2) !== 0){
                    if( j === 1 || (j % 2) !== 0 ){
                        field.classList.add('fieldblack');
                    }
                    if (j === 0 || (j % 2) === 0){
                        field.classList.add('fieldwhite');
                    }
                } else {
                    if( j === 1 || (j % 2) !== 0 ){
                        field.classList.add('fieldwhite');
                    }
                    if (j === 0 || (j % 2) === 0){
                        field.classList.add('fieldblack');
                    }
                }
            field.setAttribute('id', `[${j},${i}]`)
            fields.appendChild(field)
            }
        }
        board.innerHTML = fields.innerHTML;
    }
}


const handler = {
    knight: undefined,
    finish: undefined,
    turn: 0,

    set(e){
        const img = document.createElement('img');

        if(this.turn === 0){
            img.classList.add('horse');
            img.src = './img/horse.svg';  
                if(this.knight === undefined){
                    this.knight = e;
                } else {
                    this.knight.innerHTML = '';
                    this.knight = e;
                }
             
            this.turn = 1;
        } else { 
            if(this.finish === undefined){
                this.finish = e;
            } else {
                this.finish.innerHTML = '';
                this.finish = e;
            }
            img.classList.add('finish');
            img.src = './img/finish.svg';
            this.turn = 0;
        }

      
        e.appendChild(img);


    }
}

