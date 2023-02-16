// Some JavaScript to load the image and show the form. There is no actual backend functionality. This is just the UI

const form = document.querySelector('#img-form');


function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileImage(file)) {
      alert('Please select an image file');
        return;
  }

  form.style.display = 'block';
  document.querySelector(
    '#filename'
  ).innerHTML = file.name;
}

function isFileImage(file) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type'])
}

//document.querySelector('#img').addEventListener('change', loadImage);
var btnShow = document.querySelector('button');
var nrstraturi = document.querySelector('h1');
var selected = 0;

const sheet_data1=JSON.parse(localStorage.getItem("sheet_data"));

btnShow.addEventListener('click', () =>{
    selected = document.querySelector('input[type="radio"]:checked');
    nrstraturi.value = parseInt(selected.value);
    nrstraturi.innerHTML = "Numarul de straturi selectat este "+selected.value;
    localStorage.setItem("nrstraturi",nrstraturi.value);
   

})


var tmpint = document.getElementById('tmpint');
var tmpext = document.getElementById('tmpext');
var umidint = document.getElementById('umidint');
var umidext = document.getElementById('umidext');
var btn1 = document.getElementById('mybutton');
var btn2 = document.getElementById('btn2');
var out1 = document.getElementById('h1');
var out2 = document.getElementById('h1');





nrstraturi.value=localStorage.getItem("nrstraturi");
var num=nrstraturi.value;
var arr=[];
for(var k=0; k< sheet_data1.length; k++)
  arr.push(sheet_data1[k][1]);
var grosime=[]

function generateDropdowns(num) {
  for (var i = 1; i <= num; i++) {
    var container = document.createElement("div");
    var br = document.createElement("br");
    container.style.margin = "30px 10px";
    container.style = "margin-top: 10px; margin-left: 10px";
    

    var select = document.createElement("select");
    select.id = "dropdown" + i;
    container.appendChild(select);

    var textbox = document.createElement("input");
    textbox.type = "number";
    textbox.style.display = "inline-block";
    //textbox.style.marginLeft = "20px";
    //textbox.style.boxSizing = "border-box";
    textbox.style = "border-bottom: 2px solid #041917; margin-left: 20px;  background-color: #0b4540; border-radius: 10px; box-shadow:0 0 15px 4px rgba(0,0,0,0.06); color: #adadad; border-top: none; border-left: none; border-right: none; padding-left: 10px;";
    container.appendChild(textbox);

    var selectedValue = document.createElement("label");
    container.appendChild(br);
    selectedValue.id = "selectedValue" + i;
    selectedValue.style.marginLeft = "10px";
    container.appendChild(selectedValue);

    document.body.appendChild(container);

    for (var j = 0; j < sheet_data1.length; j++) {
      var option = document.createElement("option");
      option.value = sheet_data1[j][1] + ': densitatea aparenta='+ sheet_data1[j][2]+' | conductivitatea termica de calcul='+sheet_data1[j][3]+' | factorul rezistentei la vapori='+sheet_data1[j][4];
      option.text = arr[j];
      select.appendChild(option);
      
    }
    select.addEventListener("change", (function(index) {
      return function() {
        var selectedValue = document.getElementById("selectedValue" + index);
        selectedValue.innerHTML = this.value+"<hr>";
        

      }
    })(i));
    
    var selectedLines = [];
  select.addEventListener("change", (function(index) {
    return function() {
    selectedLines[index] = this.selectedIndex;
  }
})(i));
 
  var textboxes=document.getElementsByTagName("input");
  for(var l=0; l<textboxes.length;l++)
  grosime.push(textboxes[l]);
  }


  btn1.addEventListener('click', function() {
  
  var grosimeValues=[];
  var gstr=[]
  for (var i = 0; i < grosime.length; i++) {
    grosimeValues[i] = grosime[i].value;
   //out1.innerHTML = grosimeValues[4]+' '+grosimeValues[10]+' '+grosimeValues[17]+' '+grosimeValues[25]+' '+grosimeValues[34];
  }
   gstr[1]=grosimeValues[4];
   gstr[2]=grosimeValues[10];
   gstr[3]=grosimeValues[17];
   gstr[4]=grosimeValues[25];
   gstr[5]=grosimeValues[34];
   //out1.innerHTML = gstr[1]+' '+gstr[2]+' '+gstr[3]+' '+gstr[4]+' '+gstr[5];
  var da=gstr[1]*tmpext.value;

//presiuni de saturatie
  var e=2.718;
  var diftemp=tmpint.value-tmpext.value;
  var psi,pse;
  tmpint.value=-1*tmpint.value;
  if(tmpint.value<0)
    psi=610.5*(e**((-17.269*tmpint.value)/(237.3-tmpint.value)));
else psi=610.5*(e**((-21.875*tmpext.value)/(265.5-tmpext.value)));
  tmpext.value=-1*tmpext.value;
  if(tmpext.value<0)
  pse=610.5*(e**((-17.269*tmpint.value)/(237.3-tmpint.value)));
else pse=610.5*(e**((-21.875*tmpext.value)/(265.5-tmpext.value)));
  var pint=(psi*umidint.value)/100;
  var pext=(pse*umidext.value)/100;
  var rv=[]
  var rtotal=0;
  for(var l=1; l<=num; l++){
    rv[l]=50*(10**8)*gstr[l]*sheet_data1[selectedLines[l]][4];
    rtotal+=rv[l];
  }
  tmpext.value=-1*tmpext.value;
  tmpint.value=-1*tmpint.value;
 
   
  var labcalcul= document.getElementById("calcul");
  
  labcalcul.innerHTML='Presiune saturatie interior= '+parseInt(psi)+' Pa <br>'+'Presiune saturatie exterior= '+parseInt(pse)+ ' Pa <br>'+'Presiune la interior= ' +parseInt(pint)+ ' Pa <br>'+'Presiune la exterior= ' +parseInt(pext)+' Pa <br>';
 
  var rezist=document.createElement("label");
  
 
  //rezist.style.marginTop = "20px";
  document.body.appendChild(rezist);
  var i=1;
  
  rezist.innerHTML+="<br>";
  rv.forEach(function(element){
    
    rezist.innerHTML+='Rezistenta la vapori pentru stratul '+i+'= '+ element+"<br>";
    i++;
  })
  rezist.innerHTML+="<br>";
 
  var pres=[]
  var dif=pint-pext;
  var presiuni=document.createElement("label");
  document.body.appendChild(presiuni);
  for(var c=1;c<num;c++)
  { var sum=0;
    for(var l=1;l<=c;l++)
    sum+=rv[l];
    pres[c]=pint-(sum/rtotal)*dif;
  }
  var i=1;
  pres.forEach(function(element){
    
    presiuni.innerHTML+='Presiune strat '+i+'= '+parseInt(element)+" Pa<br>";
    i++;
  })
  presiuni.innerHTML+="<br>";
  var reztt=[]
  var reztttotal=0;
  for(var l=1; l<=num; l++){
    reztt[l]=gstr[l]/sheet_data1[selectedLines[l]][3];
    reztttotal+=reztt[l];
  }
  //rezttermic.innerHTML+=reztttotal+' ';
  reztttotal=reztttotal+0.125+0.042;
 // rezttermic.innerHTML+=reztttotal;
  var rezttermic=document.createElement("label");
  //rezist.style.marginLeft = "10px";
  document.body.appendChild(rezttermic);
  var i=1;
  reztt.forEach(function(element){
    
    rezttermic.innerHTML+='Rezistenta la transfer termic pentru stratul '+i+'= '+ element.toFixed(2)+" m²·K/W<br>";
    i++;
  })
  rezttermic.innerHTML+="<br>";



  var temp=[]
  var tetasi=tmpint.value-(0.125/reztttotal)*diftemp;
  var temperaturi=document.createElement("label");
  document.body.appendChild(temperaturi);
  temperaturi.innerHTML+='Temperatura de saturatie la interior= '+ tetasi.toFixed(1)+" °C<br>";
  for(var c=1;c<num;c++)
  { var sum=0.125;
    for(var l=1;l<=c;l++)
    sum+=reztt[l];
    temp[c]=tmpint.value-(sum/reztttotal)*diftemp;
  }
  sum=reztttotal-0.042;
  var tetase=tmpint.value-(sum/reztttotal)*diftemp;
  var i=1;
  temp.forEach(function(element){
    
    temperaturi.innerHTML+='Temperatura din stratul '+i+'= '+element.toFixed(1)+" °C<br>";
    i++;
  })
  temperaturi.innerHTML+='Temperatura de saturatie la exterior= '+ tetase.toFixed(1)+" °C<br>";
  temperaturi.innerHTML+="<br>";
   
  temp[0]=tetasi;
  temp[num]=tetase;

  var pressat=[]
  for(var l=0; l<=num; l++){
    if(temp[l]>=0)
    pressat[l]=610.5*(e**((17.269*temp[l])/(237.3+temp[l])));
    else
    pressat[l]=610.5*(e**((21.875*temp[l])/(265.5+temp[l])));
  }
  var prst=document.createElement("label");
  //rezist.style.marginLeft = "10px";
  document.body.appendChild(prst);
  i=0;
  pressat.forEach(function(element){
    
    prst.innerHTML+='Presiunea de saturatie la temperatura de '+temp[i].toFixed(1)+'°C= '+ parseInt(element)+" Pa<br>";
    i++;
  })
  prst.innerHTML+="<br>";

    var labels=[]
    labels[0]=-0.5;
    labels[1]=0;
    var i=2;
    var suma=0;
    for(var c=1;c<=num;c++)
    { suma=suma+parseFloat(gstr[c]);
      labels[i]=suma; i++;}
    labels[i]=suma+1;
    var values=[]
    values[0]=psi;
    var i=1;
    for(var c=0;c<=num;c++)
    {values[i]=pressat[c]; i++;}
    values[i]=pse;
    var values1=[]
    values1[0]=pint;
    values1[1]=pint;
    var i=2;
    for(var c=1;c<num;c++)
    {values1[i]=pres[c];i++;}
    values1[i++]=pext;
    values1[i]=pext;

    var data = {  
          "labels": labels,
          "values": values,
          "values1": values1
        };
    
    // write the data to a file
    var file = new Blob([JSON.stringify(data)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "data.json";
    a.click();
    
    
    


  });
 
  //out1.innerHTML = parseInt(v[1].value);
//localStorage.setItem("grosime",grosime[1].value);

}


btn1.addEventListener('click',generateDropdowns(num));
document.getElementById("open").addEventListener("click", function() {
  window.open("chart.html", "_blank");

});
  