export class Main
{
    static button1 = document.getElementById("Pryma");
    static tab = ["Pryma","SekundaM","SekundaW","TercjaM","TercjaW","KwartaCZ","Tryton","KwintaCZ","SekstaM","SekstaW","SeptymaM","SeptymaW"];
    static names = ["Pryma Czysta","Sekunda Mała","Sekunda Wielka","Tercja Mała","Tercja Wielka","Kwarta Czysta","Tryton","Kwinta Czysta","Seksta Mała","Seksta Wielka","Septyma Mała","Septyma Wielka"];
    static startButton = document.getElementById("klik");
    static output = document.getElementById("outText");
    static score = document.getElementById("score");
    static memIMG = document.getElementById("mem");
    static powtorz = document.getElementById("powtorz");
    static volume = document.getElementById("volume");
    static startNote = null;
    static correct = 0;
    static uncorrect=0;
    static interval = null;
    static sampler = new Tone.Sampler({
        urls: {
            C4: "C.wav",
        },
        baseUrl: "/"
    }).toDestination();
    static start()
    {
        this.initButtons();
        this.sampler.volume.value =-10;
        this.volume.onchange = ()=>{
            this.sampler.volume.value = this.volume.value;
        }
        this.volume.oninput = ()=>{
            this.sampler.volume.value = this.volume.value;
        }
        this.volume.onclick = ()=>{
            this.sampler.volume.value = this.volume.value;
        }
      // this.sampler.triggerAttackRelease("D#4", "1s");
        this.powtorz.style.display="inline-block";
        this.powtorz.onclick= ()=>
        {
            if(this.interval!= null && this.startNote != null)
            {
                this.playInterval(this.startNote, this.interval+this.startNote-1);
            }
        }
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
        button.style.display="block";
        button.onclick=()=>{
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
            this.output.innerText ="Niepoprawnie :C, Była  to: "+this.names[this.interval-1];
            }
            console.log(button.num);
            this.score.innerText = "Ilość prawidłowych: "+this.correct+" | Ilość nieprawidłowych: "+this.uncorrect;  
            this.playInterval(0,Math.floor(Math.random()*12));
        }
        }
    }
    static playInterval(first,second)
    {
        this.startNote = first;
        let soundByInterval = ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4']
        // var synth = new AudioSynth;
        this.interval=null;
        let piano = this.sampler;
     //   console.log(soundByInterval[first]);
        this.sampler.triggerAttackRelease(soundByInterval[first], "1s");
 
         setTimeout(()=>{   piano.triggerAttackRelease(soundByInterval[second], "1s");
            this.interval=second-first+1;},2000);
    }
}



//play a middle 'C' for the duration of an 8th note

Main.run();