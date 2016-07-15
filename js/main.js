function NuclearToggle(o,i,v){
    this.position = o;
    this.id = i;
    this.value = v;
}

function ResourceSlider(min, max, i, val,type,CF){
    this.min = min;
    this.max = max;
    this.id = i;
    this.value = val;
    this.type = type;
    this.capacityFactor = CF;
}

function ResourceConstant(id, val,CF){
    this.id = id;
    this.value = val;
    this.capacityFactor = CF;
}

var peakInstalledCapacity = 43556;
var demand = 42423;
//NuclearToggle.prototype.getPosition = function() { return this.position; }
//NuclearToggle.prototype.getID = function() { return this.id; }
//NuclearToggle.prototype.getValue = function() { return this.value; }

//Nuclear Toggle Methods
NuclearToggle.prototype.toggle = function() { 
    if(this.position == true){ this.position = false; }else{this.position = true}
}
NuclearToggle.prototype.setID = function(x) { this.id = x }
NuclearToggle.prototype.setValue = function(x) { this.value = x }

//Resource Sliders Methods
ResourceSlider.prototype.setValue = function(x) { this.value = x }
var nucToggles = {
    "chinsan1": new NuclearToggle(false,"chinsan1",636),
    "chinsan2": new NuclearToggle(false,"chinsan2",636),
    "kuosheng1": new NuclearToggle(false,"kuosheng1",985),
    "kuosheng2": new NuclearToggle(false,"kuosheng2",985),
    "maanshan1": new NuclearToggle(false,"maanshan1",951),
    "maanshan2": new NuclearToggle(false,"maanshan2",951),
    "lungmen1": new NuclearToggle(false,"lungmen1",1350),
    "lungmen2": new NuclearToggle(false,"lungmen2",1350)

}
var resourceSliders = {
    "solarpv": new ResourceSlider(669,20000,"solarpv", 10000,"renewable",.15),
    "wind": new ResourceSlider(652, 4000, "wind", 2500,"renewable",.3), 
    "coal": new ResourceSlider(0,15297,"coal", 10000,"fossil_fuel",.81),
    "oil": new ResourceSlider(0, 3325, "oil", 1675,"fossil_fuel",.21), 
    "gas": new ResourceSlider(0,26090, "gas", 13045,"fossil_fuel",.53)
}
var constants = {
    "biogas": new ResourceConstant("biogas", 623,.65),
    "hydrostorage": new ResourceConstant("hydrostorage",2602,1.0),
    "hydropower": new ResourceConstant("hydropower", 2102,.4)
}
function COMP_totalInstalledCapacity(){
    var TOTAL = 0;
    for(var item in nucToggles)
    {
        var tempItem = nucToggles[item]
        if(tempItem.position == true){ 
            TOTAL+=tempItem.value; 
        }
        
    }
    for(var item in resourceSliders)
    {
        var tempItem = resourceSliders[item];
        TOTAL+=tempItem.value; 
        
    }
    for(var item in constants)
    {
        var tempItem = constants[item];
        TOTAL+=tempItem.value; 
        
    }
    console.log(TOTAL);
    return TOTAL;
}

function COMP_reserveCapacity(){
    var SUPPLY = COMP_totalInstalledCapacity();
    var DEMAND = demand;
    
    return (SUPPLY-DEMAND)/DEMAND;
}

function COMP_electricityGenerated(){
//All ON Nuclear Powerplants x 8640 x .9 / 1000
//Selected Value for Coal x 8640 x .84 / 1000
//Selected Value for Oil x 8640 x .21 / 1000
//Selected Value for Gas x 8640 x .53 / 1000
//Selected Value for Solar x 8640 x .15 / 1000
//Selected Value for Wind x 8640 x .3 / 1000
//Garbage/Biogas x 8640 x .65 / 1000
//Conventional Hydropower x 8640 x .4 / 1000
    var TOTAL = 0;
    for(var item in nucToggles){
        var tempItem = nucToggles[item]
        if(tempItem.position == true){ 
            TOTAL+=(8640*tempItem.value*0.9)/1000;
            console.log(TOTAL); 
        }   
    }
    for(var item in resourceSliders){
        var tempItem = resourceSliders[item]
        TOTAL+=(8640*tempItem.value*tempItem.capacityFactor)/1000; 
        console.log(TOTAL);
    }   
    for(var item in constants){
        var tempItem = constants[item]
        TOTAL+=(8640*tempItem.value*tempItem.capacityFactor)/1000; 
        console.log(TOTAL);
    }

    return TOTAL;
    
}

var COMP_cecCoal = (((8640*resourceSliders["coal"].value*resourceSliders["coal"].capacityFactor)/1000)-78713540)*.0008;
var COMP_cecNaturalGas = (((8640*resourceSliders["coal"].value*resourceSliders["coal"].capacityFactor)/1000)-70779352)*.0008;

$(document).ready(function(){
    applyToSliders(resourceSliders);
    $("input:checkbox").change(function() {
        var id = $(this).attr("id");
        nucToggles[id].toggle();
        console.log(nucToggles[id]);
    })
    
    $("input[type=range]").mousedown(function() {
        $("input[type=range]").mousemove(function(){
            var id = $(this).attr("id");
        var val = document.getElementById(id).value
        console.log(val)
        resourceSliders[id].setValue(+val);
        console.log(resourceSliders[id]);
        $(this).next().text(val);
        })
        
    })
    $("#submit").click(COMP);
    
    function COMP(){
        $("#TIC").text(Math.round(COMP_totalInstalledCapacity()));
        $("#RC").text(COMP_reserveCapacity());
        $("#EG").text(Math.round(COMP_electricityGenerated()));
        
    }
    
    function applyToSliders(sliderObj){
        for(var key in sliderObj){
            $("#"+key).attr("min", sliderObj[key].min);
            $("#"+key).attr("max", sliderObj[key].max);
            $("#"+key).attr("val", sliderObj[key].value); 
        }
    }
});