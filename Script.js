export class Main
{
    //Przypisywanie wszystkich potrzebnych elementów do zmiennych
    static button1 = document.getElementById("Pryma");
    static startButton = document.getElementById("klik");
    static output = document.getElementById("outText");
    static memIMG = document.getElementById("mem");
    static powtorz = document.getElementById("powtorz");
    static volume = document.getElementById("volume");
    static setup = document.getElementById("Setup");
    static nieC = document.getElementById("nieC");
    static licznik = document.getElementById("licznik");
    static poprawne = document.getElementById("poprawne");
    static niepoprawne = document.getElementById("niepoprawne");
    static percDisplay = document.getElementById("perc");
    static percOut = document.getElementById("percOut");
    static statisticDiv = document.getElementById("statDiv");
   static statistic = {};
    //Definiowanie nazwa(aliasów) interwałów
    static tab = ["Pryma","SekundaM","SekundaW","TercjaM","TercjaW","KwartaCZ","Tryton","KwintaCZ","SekstaM","SekstaW","SeptymaM","SeptymaW","OktawaCZ"];
    static names = ["Pryma Czysta","Sekunda Mała","Sekunda Wielka","Tercja Mała","Tercja Wielka","Kwarta Czysta","Tryton","Kwinta Czysta","Seksta Mała","Seksta Wielka","Septyma Mała","Septyma Wielka","Oktawa czysta"];
    //Definiowanie potrzebnych zmiennych
    static misc = false; //true jeśli użytkownik chce zaczynać od różnych dźwięków
    static startNote = null; //Zmienna przechowująca pierwszą nutę od której zaczyna się interwał
    static correct = 0; //Ilość poprawnych odpowiedzi
    static uncorrect=0; // Ilość niepoprawnych odpowiedzi
    static pos = false; //Czy interwał jest ustawiony do góry(true), czy w dół
    static interval = null; //Zmienna przechowująca interwał liczony w sekundach małych
    //Sampler imitujący pianino
    static sampler = new Tone.Sampler({
        urls: {
            C4: "C.wav",
        },
        baseUrl: "./"
    }).toDestination();
    //Tu zaczyna się program
    static run()
    {
        console.log("This site uses Tone.js, github page: https://tonejs.github.io/");
        //przypisanie funkcji guzika do zastartowania głównej funkcjii
        let htmlForStatistic = "";
        for(let i=0;i<this.tab.length; i++)
        {
            this.statistic[this.tab[i]] = {
                correct:0,
                uncorrect:0
            }
            htmlForStatistic+=this.names[i]+"- <span style='color: green;'>Poprawne: "+this.correct+"</span>, <span style='color: red;'>Niepoprawne: "+this.uncorrect+"</span> Proc.:"+Math.floor((this.statistic[this.tab[i]].correct/((this.statistic[this.tab[i]].correct+this.statistic[this.tab[i]].uncorrect)))*100)+"%<br>";
            
            
        }
        this.statisticDiv.innerHTML =htmlForStatistic;
        this.startButton.onclick = ()=>{
            this.startButton.remove();
            this.start();
           
        };
    }
    //Po wciśnięciu guzika:
    static start()
    {
        this.initButtons();   //Przypisuje funkcję do wszystkich guzików
        this.sampler.volume.value =-10; //Reguluje głośność na -10
        //Przypisanie akcji zmieniania głośności po przesunięciu suwaka
        this.volume.onchange = ()=>{
            this.sampler.volume.value = this.volume.value;
        }
        this.volume.oninput = ()=>{
            this.sampler.volume.value = this.volume.value;
        }
        this.volume.onclick = ()=>{
            this.sampler.volume.value = this.volume.value;
        }
        //Sprawdza czy program ma zaczynać od różnych wartości, przypisując wartość guzika 'nieC' do zmiennej przechowującej tą wartość
        this.misc= this.nieC.checked;
      // this.sampler.triggerAttackRelease("D#4", "1s");
      //Pokazuje przycisk powtórz
        this.powtorz.style.display="inline-block";
        this.licznik.style.display = "block";
        //Ukrywa setup
        this.setup.style.display="none";
        this.powtorz.onclick= ()=>
        {
            if(this.interval!= null && this.startNote != null)
            {
                this.playInterval(this.startNote, this.pos ?  this.interval+this.startNote-1 : -this.interval+this.startNote+1);
            }
        }
        if(!this.misc)
        this.playInterval(0,Math.floor(Math.random()*13));
        else
        this.playInterval(Math.floor(Math.random()*13),Math.floor(Math.random()*13));
    }
   
   static updateOutputValue()
   {
    this.poprawne.innerText = this.correct;
    this.niepoprawne.innerText = this.uncorrect;
    this.percDisplay.value = this.correct/(this.correct+this.uncorrect) *100;
    this.percOut.innerText = (Math.round(this.correct/(this.correct+this.uncorrect) *100))+"% poprawnie";
    let htmlForStatistic = "";
        for(let i=0;i<this.tab.length; i++)
        {
            htmlForStatistic+=this.names[i]+"- <span style='color: green;'>Poprawne: "+this.statistic[this.tab[i]].correct+"</span>, <span style='color: red;'>Niepoprawne: "+this.statistic[this.tab[i]].uncorrect+"</span> Proc.:"+Math.floor((this.statistic[this.tab[i]].correct/((this.statistic[this.tab[i]].correct+this.statistic[this.tab[i]].uncorrect)))*100)+"%<br>";
            
        }
        this.statisticDiv.innerHTML =htmlForStatistic;
   }
    static initButtons()
    {
        for(var i=1;i<14;i++)
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
                this.statistic[this.tab[this.interval-1]].correct++;
            }
            else
            {
                this.memIMG.src="no.gif";
                this.uncorrect++;
                this.statistic[this.tab[this.interval-1]].uncorrect++;
            this.output.innerText ="Niepoprawnie :C, Była  to: "+this.names[this.interval-1];
            }
           // console.log(this.statistic);
           // console.log("=======");
           this.updateOutputValue(); 
            //console.log(this.interval);
            if(!this.misc)
            this.playInterval(0,Math.floor(Math.random()*13));
            else
            this.playInterval(Math.floor(Math.random()*13),Math.floor(Math.random()*13));
           
        }
        }
    }
    static playInterval(first,second)
    {
        this.startNote = first;
        let soundByInterval = ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5']
        // var synth = new AudioSynth;
        this.interval=null;
        let piano = this.sampler;
       // console.log(soundByInterval[first]);
        //console.log(soundByInterval[second]);
        this.sampler.triggerAttackRelease(soundByInterval[first], "1s");
 
         setTimeout(()=>{   piano.triggerAttackRelease(soundByInterval[second], "1s");
            this.interval=Math.abs(second-first)+1;
        if(second-first>0) this.pos = true; else this.pos=false; },2000);
    }
}




Main.run();