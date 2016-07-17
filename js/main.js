// DATA MODEL

var DATA= [];

function NuclearToggle(o,i,v){
    this.position = o;
    this.id = i;
    this.value = v;
    this.capacityFactor = 0.9;
    this.type = ["LC"];
}

function ResourceSlider(min, max, i, val,type,CF){
    this.min = min;
    this.max = max;
    this.id = i;
    this.value = val;
    this.type = type;
    this.capacityFactor = CF;
}

function ResourceConstant(id, val,CF,type){
    this.id = id;
    this.value = val;
    this.capacityFactor = CF;
    this.type = type;
}

var peakInstalledCapacity = 43556;
var demand = 42423;
//NuclearToggle.prototype.getPosition = function() { return this.position; }
//NuclearToggle.prototype.getID = function() { return this.id; }
//NuclearToggle.prototype.getValue = function() { return this.value; }

//Nuclear Toggle Methods
NuclearToggle.prototype.toggle = function() { 
    if(this.position == true){ 
        this.position = false
        findByKey(DATA,this.id).value = 0;
    }
    else{
        this.position = true
        findByKey(DATA,this.id).value = this.value;
    }
}
NuclearToggle.prototype.setID = function(x) { this.id = x }
NuclearToggle.prototype.setValue = function(x) { this.value = x }
NuclearToggle.prototype.getElectricityGenerated = function() {
    return (8640*this.value*this.capacityFactor)/1000;
}

//Resource Sliders Methods
ResourceSlider.prototype.setValue = function(x) { 
    this.value = x 
    findByKey(DATA,this.id).value = this.value;
    }
ResourceSlider.prototype.getElectricityGenerated = function() {
    return (8640*this.value*this.capacityFactor)/1000;
}

ResourceConstant.prototype.getElectricityGenerated = function() {
    return (8640*this.value*this.capacityFactor)/1000;
}
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
    "solarpv": new ResourceSlider(669,20000,"solarpv", 10000,["R"],.15),
    "wind": new ResourceSlider(652, 4000, "wind", 2500,["R"],.3), 
    "coal": new ResourceSlider(0,15297,"coal", 10000,["FF"],.81),
    "oil": new ResourceSlider(0, 3325, "oil", 1675,["FF"],.21), 
    "gas": new ResourceSlider(0,26090, "gas", 13045,["FF"],.53)
}
var constants = {
    "biogas": new ResourceConstant("biogas", 623,.65,[""]),
    "hydrostorage": new ResourceConstant("hydrostorage",2602,1.0,["LC","R"]),
    "hydropower": new ResourceConstant("hydropower", 2102,.4,["LC", "R"]),
    "geothermal": new ResourceConstant("geothermal", 0.4,0,["LC", "R"])
}
for(var item in nucToggles){
    DATA.push({
        "name" : nucToggles[item].id,
        "value": 0,
        "type": nucToggles[item].type
    });
}
for(var item in resourceSliders){
    DATA.push({
        "name" : resourceSliders[item].id,
        "value": resourceSliders[item].value,
        "type": resourceSliders[item].type
    });
}
for(var item in constants){
    DATA.push({
        "name" : constants[item].id,
        "value": constants[item].value,
        "type": constants[item].type
    });
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


function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}

function findByKey(array,key){
    for(var x in array)
    {
        if(array[x].name == key){ return array[x]}
    }
    return null;
}

function COMP_electricityGenerated(){
    var TOTAL = 0;
    for(var item in nucToggles){
        var tempItem = nucToggles[item]
        if(tempItem.position == true){ 
            TOTAL += tempItem.getElectricityGenerated();
        }  
    }
    for(var item in resourceSliders){
        var tempItem = resourceSliders[item]
        TOTAL+= tempItem.getElectricityGenerated();
    }   
    for(var item in constants){
        var tempItem = constants[item]
        TOTAL+= tempItem.getElectricityGenerated(); 
    }

    return TOTAL;
    
}

var COMP_cecCoal = (resourceSliders["coal"].getElectricityGenerated()-78713540)*.0008;
var COMP_cecNaturalGas = (resourceSliders["gas"].getElectricityGenerated()-70779352)*.0008;

$(document).ready(function(){
    applyToSliders(resourceSliders);
    $("input:checkbox").change(function() {
        var id = $(this).attr("id");
        nucToggles[id].toggle();
        updateVisualization();
    })
    
    $("input[type=range]").mousedown(function() {
        $("input[type=range]").mousemove(function(){
            var id = $(this).attr("id");
        var val = document.getElementById(id).value
        resourceSliders[id].setValue(+val);
        $(this).next().text(val+" MW");
        COMP();
        updateVisualization();
        })
        
    })
    $("#submit").click(COMP);
    
    function COMP(){
        $("#TIC").text(Math.round(COMP_totalInstalledCapacity()));
        $("#RC").text(truncateDecimals(COMP_reserveCapacity()*100,2)+"%");
        $("#EG").text(Math.round(COMP_electricityGenerated()));
        
    }
    
    function applyToSliders(sliderObj){
        for(var key in sliderObj){
            $("#"+key).attr("min", sliderObj[key].min);
            $("#"+key).attr("max", sliderObj[key].max);
            $("#"+key).attr("val", sliderObj[key].value); 
        }
    }
    
    var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.category20();
        
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    var svg = d3.select("#container-O").append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

function updateVisualization(){
    
    console.log("UPDATING");
    var g = svg.selectAll(".arc")
        .data(function(){
            console.log(pie(DATA))
            return pie(DATA)
        })
        .attr("class", "arc");

    g.enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.value); });

}
   
 });