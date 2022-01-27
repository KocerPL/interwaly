export class Main
{
    static button1 = document.getElementById("Pryma");
    static tab = ["Pryma","SekundaM","SekundaW","TercjaM","TercjaW","KwartaCZ","Tryton","KwintaCZ","SekstaM","SekstaW","SeptymaM","SeptymaW"];
    static startButton = document.getElementById("start");
    static output = document.getElementById("outText");
    static score = document.getElementById("score");
    static memIMG = document.getElementById("mem");
    static correct = 0;
    static uncorrect=0;
    static interval = null;
    static start()
    {
        this.initButtons();
        this.playInterval(0,Math.floor(Math.random()*7));
    }
   static run()
    {
        this.startButton.onclick = ()=>{
            this.startButton.remove();
            this.start();
           
        };
    }
   
    static initButtons()
    {
        for(var i=1;i<13;i++)
        {
        let button =document.getElementById(this.tab[i-1]);
        button.num=i;
        button.onclick=()=>{
           let num=i;
            if(this.interval==null)
            {
                this.output.innerText="Poczekaj aż dźwięk zostanie zagrany!!!!";
               return;
            }
            else if(this.interval == button.num)
            {
                this.output.innerText ="Poprawnie :D";
                this.memIMG.src="yes.gif";
                this.correct++;

            }
            else
            {
                this.memIMG.src="no.gif";
                this.uncorrect++;
            this.output.innerText ="Niepoprawnie :C, Była  to: "+this.tab[this.interval-1];
            }
            console.log(button.num);
            this.score.innerText = "Ilość prawidłowych: "+this.correct+" | Ilość nieprawidłowych: "+this.uncorrect;  
            this.playInterval(0,Math.floor(Math.random()*12));
        }
        }
    }
    static playInterval(first,second)
    {
        let soundByInterval = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
        // var synth = new AudioSynth;
        this.interval=null;
         var piano = Synth.createInstrument('piano');
         piano.play(soundByInterval[first], 4, 2);
 
         setTimeout(()=>{ piano.play(soundByInterval[second], 4, 2);
            this.interval=second-first+1;},1000);
    }
}

Main.run();