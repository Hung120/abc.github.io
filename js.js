const $ = document.querySelector.bind(document); // chú ý k được thiếu bind vì bind: dùng để xd tham số this trong function
const $$ = document.querySelectorAll.bind(document);//注意：　bind　が　ないと行けない　bindは　functionのthisと言う意味です
const tong = $('.tong')
const playbtn = $('.play')
const progress = $('#progress')
const nextbtn = $('.next')
const prevbtn = $('.prev')
const randombtn = $('.random')
const repeatbtn = $('.repeat')
const app = { // chú ý dấu = ở phần đầu và nội dung bên trong dùng :
                //最初は　＝　を　使って　中は全部　：　を使う
    currentIndex : 0,
    isplaying : false,
    israndom : false,
    isrepeat : false,
            

    songs : [
        
        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/2.png'
        },
        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/tải xuống.jpeg'
        },

        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/2.png'
        },

        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/tải xuống.jpeg'
        },

        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/2.png'
        },
        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/tải xuống.jpeg'
        },
        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/tải xuống.jpeg'
        },

        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/2.png'
        },

        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/tải xuống.jpeg'
        },

        {
            name: 'khong phai',
            singger:'tang duy tan',
            path:'./audio/Noi-That-Willistic.mp3',
            image:'./img/tải xuống.jpeg'
        }
        
        
    

    ],

    render: function(){
        const htmls = this.songs.map(function(song){
            return `<div class="song">
            <div class="thumb"style="background-image: url('${song.image}')" ></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.path}</p>
            </div>
        </div>`
        });
        $('.playlist').innerHTML = htmls.join('');
    },

    defineProperties: function(){
        Object.defineProperty(this,'currentsong',{
            get: function(){
                return this.songs[this.currentIndex]
                
            }
        })
    },
    
    handle: function(){
        const cd = $('.cd_img');
        const cdWidth = cd.offsetWidth;
        // xử lý cd quay / dừng
        const cdanimate = cd.animate([
            {transform:'rotate(360deg)'}    // quay 360 do
        ],{
            duration: 10000, // thoi gian quay 10s
            iterations: Infinity // lặp lại vô hạn lần
        })

        cdanimate.pause()
        
        
        document.onscroll = function(){
            
            const Scroll = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - Scroll
            cd.style.opacity = newWidth / cdWidth
            if(newWidth < 0){
                cd.style.width = 0
            }else{ 
                cd.style.width = newWidth + 'px'
                cd.style.height = newWidth + 'px'
            }
           
        };


        playbtn.onclick = function(){
            if(app.isplaying){
                audio.pause()
            }else{audio.play()}
            
            
        }
        

        audio.onplay = function(){
            app.isplaying = true
            playbtn.classList.add('playing')
            cdanimate.play()
        }
        audio.onpause = function(){
            app.isplaying = false
            playbtn.classList.remove('playing')
            cdanimate.pause()
        }
        // lấy ra value
        audio.ontimeupdate = function(){
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
        }
        //chạy thanh chỉ %
        progress.onchange = function(e){
            const seektime = audio.duration / 100 * e.target.value
            audio.currentTime = seektime
        }

        nextbtn.onclick = function(){
            if(app.israndom){
                app.playramdom()
            }else{
                app.nextsong()
            }
            
            audio.play()
        }

        prevbtn.onclick = function(){
            if(app.israndom){
                app.playramdom()
            }else{
                app.prevsong()
            }
            
            audio.play()
        }

        randombtn.onclick = function(){
            if(app.israndom){
                randombtn.classList.remove('israndom')
                app.israndom = false
            }else{
                randombtn.classList.add('israndom')
                app.israndom = true
                
            }
        }

        repeatbtn.onclick = function(){
            if(app.isrepeat){
                repeatbtn.classList.remove('isrepeat')
                app.isrepeat = false
            }else{
                repeatbtn.classList.add('isrepeat')
                app.isrepeat = true
            }
        }
        // sau khi kết thúc bài hát thì bật bài tiếp theo
        audio.onended = function(){
            if(app.isrepeat){
                audio.play()
            }else{
                nextbtn.click()
            }
        }
        
    },
    //audio.currentTime thuộc tính dùng để xd tgian của song
    loadcurrentsong: function(){
        const cdthumb = $('.cd_img')
        const audio = $('#audio')
        
        cdthumb.src = `${this.currentsong.image}`
        audio.src = this.currentsong.path
        
    },

    nextsong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadcurrentsong()
    },

    prevsong: function(){
        this.currentIndex--
        if(this.currentIndex <=0){
            this.currentIndex = this.songs.length-1
        }
        this.loadcurrentsong()
    },

    playramdom: function(){
        let newindex
        do{
            newindex = Math.floor(Math.random()*this.songs.length)
        }while(newindex === this.currentIndex)
        this.currentIndex = newindex
        this.loadcurrentsong()
    },

    start: function(){
        this.defineProperties()
        
        
        this.handle()
        this.loadcurrentsong()
        this.render()
    }

 

}



app.start()