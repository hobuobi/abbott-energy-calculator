// DATA MODEL

var DATA= [];
var mode = "value";
function NuclearToggle(o,i,v){
    this.position = o;
    this.id = i;
    this.value = v;
    this.capacityFactor = 0.89;
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
        findByKey(DATA,this.id).electricity = 0;
    }
    else{
        this.position = true
        findByKey(DATA,this.id).value = this.value;
        findByKey(DATA,this.id).electricity = this.getElectricityGenerated();
    }
}
NuclearToggle.prototype.setID = function(x) { this.id = x }
NuclearToggle.prototype.setValue = function(x) { this.value = x }
NuclearToggle.prototype.setElectricityGenerated = function(x) { this.electricity = x }
NuclearToggle.prototype.getElectricityGenerated = function() {
    return (8760*this.value*this.capacityFactor)/1000;
}

//Resource Sliders Methods
ResourceSlider.prototype.setValue = function(x) {
    this.value = x
    findByKey(DATA,this.id).value = this.value;
    findByKey(DATA,this.id).electricity = this.getElectricityGenerated();
    }
ResourceSlider.prototype.getElectricityGenerated = function() {
    return (8760*this.value*this.capacityFactor)/1000;
}

ResourceConstant.prototype.getElectricityGenerated = function() {
    return (8760*this.value*this.capacityFactor)/1000;
}

var nucToggles = {
    "chinsan1": new NuclearToggle(true,"chinsan1",636),
    "chinsan2": new NuclearToggle(true,"chinsan2",636),
    "kuosheng1": new NuclearToggle(true,"kuosheng1",985),
    "kuosheng2": new NuclearToggle(true,"kuosheng2",985),
    "maanshan1": new NuclearToggle(true,"maanshan1",951),
    "maanshan2": new NuclearToggle(true,"maanshan2",951),
    "lungmen1": new NuclearToggle(true,"lungmen1",1350),
    "lungmen2": new NuclearToggle(true,"lungmen2",1350)

}
var resourceSliders = {
    "solarpv": new ResourceSlider(669,20000,"solarpv", 669,["LC","R"],.13),
    "wind": new ResourceSlider(652, 4000, "wind", 652,["LC","R"],.3),
    "coal": new ResourceSlider(0,15297,"coal", 10697,["FF"],.84),
    "oil": new ResourceSlider(0, 3325, "oil", 3325,["FF"],.21),
    "gas": new ResourceSlider(0,26090, "gas", 15244,["FF"],.52)
}
var constants = {
    "biogas": new ResourceConstant("biogas", 623,.65,["R"]),
    "hydrostorage": new ResourceConstant("hydrostorage",2602,1.0,["LC","R"]),
    "hydropower": new ResourceConstant("hydropower", 2102,.28,["LC", "R"]),
    "geothermal": new ResourceConstant("geothermal", 50,0,["LC", "R"])
}
for(var item in nucToggles){
    DATA.push({
        "name" : nucToggles[item].id,
        "value": nucToggles[item].position == true ? nucToggles[item].value : 0,
        "electricity": nucToggles[item].position == true ? nucToggles[item].getElectricityGenerated() : 0,
        "type": nucToggles[item].type
    });
}
for(var item in resourceSliders){
    DATA.push({
        "name" : resourceSliders[item].id,
        "value": resourceSliders[item].value,
        "electricity": resourceSliders[item].getElectricityGenerated(),
        "type": resourceSliders[item].type
    });
}
for(var item in constants){
    DATA.push({
        "name" : constants[item].id,
        "value": constants[item].value,
        "electricity": constants[item].getElectricityGenerated(),
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

    return TOTAL;
}

function COMP_reserveCapacity(){

    var SUPPLY = COMP_totalInstalledCapacity()-resourceSliders["solarpv"].value-resourceSliders["wind"].value;
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

function COMP_cecCoal(){ return (resourceSliders["coal"].getElectricityGenerated()-78713540)*.0008 }
function COMP_cecNaturalGas(){ return (resourceSliders["gas"].getElectricityGenerated()-70779352)*.0003 }

$(document).ready(function(){
    var default_id = "____";
    var default_value = "____";
    applyToSliders(resourceSliders);
    applyToToggles(nucToggles);
    $("select").change(function(){
        demand = +($(this).val());
        COMP();
    })
    $("input.pplant:checkbox").change(function() {
        var id = $(this).attr("id");
        nucToggles[id].toggle();
        nucToggles[id].setElectricityGenerated();
        COMP();
        if(id == default_id){
            default_value= item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_sum(mode),2)+"%)"
            $("#detail-name").text(item.name.toUpperCase());
            $("#detail-value").text(default_value);
        }
        updateVisualization();
    })

    $("input[type=range]").mousedown(function() {
        $("input[type=range]").mousemove(function(){
            var id = $(this).attr("id");
            var val = document.getElementById(id).value
            resourceSliders[id].setValue(+val);
            $(this).next().text(val+" MW");
            /*
            if(id == default_id)
            {
                var item = findByKey(DATA,id)
                if(mode == "value"){ default_value = item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_totalInstalledCapacity(),2)+"%)"; }
                else{ default_value = item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_electricityGenerated(),2)+"%)";}
                $("#detail-name").text(item.name.toUpperCase());
                $("#detail-value").text(function(){
                    return item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_totalInstalledCapacity(),2)+"%)"
                });
            }
            */
            $("#CEC").text(Math.round(COMP_cecCoal()+COMP_cecNaturalGas()));
            COMP();
            updateVisualization();
        })
    })
    $("input[type=range]").mouseup(updateVisualization)
    $("#CEC").text(Math.round(COMP_cecCoal()+COMP_cecNaturalGas()));

    function COMP(){
        $("#TIC").text(Math.round(COMP_totalInstalledCapacity())+" MW");
        $("#RC").text(truncateDecimals(COMP_reserveCapacity()*100,2)+"%");
        $("#EG").text(Math.round(COMP_electricityGenerated())+" MW");

    }

    function applyToSliders(sliderObj){
        for(var key in sliderObj){
            $("#"+key).attr("min", sliderObj[key].min);
            $("#"+key).attr("max", sliderObj[key].max);
            document.getElementById(key).defaultValue = sliderObj[key].value;
            $("#"+key).attr("val", sliderObj[key].value);
            $("#"+key).next().text(sliderObj[key].value+" MW")
            COMP();
        }
    }
    function applyToToggles(toggleObj){
      for(var key in toggleObj){
        $("#"+key).prop("checked",toggleObj[key].position);
        findByKey(DATA,key).value = nucToggles[key].position == true ? nucToggles[key].value : 0;
        }
      }

    $(".data-switch").change(function(){
        toggle();
        if($(this).prop("checked") == true){
            $("#mode").text("TOTAL INSTALLED CAPACITY")
        }
        else{
            $("#mode").text("ELECTRICITY GENERATED")
        }
        updateVisualization();
    })



    var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;


    var color = d3.scale.ordinal(["#CCC","royalblue","green","teal"])
        .range(["#555","royalblue","green","teal"])
        .domain([["FF"],["LC"],["R"],["LC","R"]])

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius/2);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    var pie_elec = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.electricity; });
    var svg = d3.select("#vis-canvas-supply")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var svg_elec = d3.select("#vis-canvas-elec")
      .attr("width",width)
      .attr("height",height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    console.log("UPDATING");
    var g = svg.selectAll(".arc")
        .data(pie(DATA))
        .attr("class", "arc");
    var g_elec = svg_elec.selectAll(".arc")
        .data(pie_elec(DATA))
        .attr("class","arc");

    g.enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color(d.data.type); })
        .style("stroke", "white");
    g_elec.enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color(d.data.type); })
        .style("stroke", "white");
    function total(){
        var total = 0;
        for(var x in DATA){ total += x[mode] }
        return total;
    }
    g
        .on("mouseover", function(d){
            d3.select(this).transition().duration(300).attr('opacity',0.5);
            $("#detail-name").text(d.data.name.toUpperCase());
            $("#detail-value").text(function(){
                if(mode=="value"){ return d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_totalInstalledCapacity(),2)+"%)" }
                else{ return d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_electricityGenerated(),2)+"%)" }
            });
            $(".detail-label").css("border-left-color",color(d.data.type))
        })
        .on("mouseout", function(d){
            d3.select(this).transition().duration(300).attr('opacity',1);
            $("#detail-name").text(default_id.toUpperCase());
            $("#detail-value").text(default_value);
        })
        .on("click", function(d){
            default_id= d.data.name;
            default_value = d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_totalInstalledCapacity(),2)+"%)"
        })

    g_elec
        .on("mouseover", function(d){
            d3.select(this).transition().duration(200).attr('opacity',0.5);
            $("#detail-name").text(d.data.name.toUpperCase());
            $("#detail-value").text(function(){
                if(mode=="value"){ return d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_totalInstalledCapacity(),2)+"%)" }
                else{ return d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_electricityGenerated(),2)+"%)" }
            });
            $(".detail-label").css("border-left-color",color(d.data.type))
        })
        .on("mouseout", function(d){
            d3.select(this).transition().duration(200).attr('opacity',1);
            $("#detail-name").text(default_id.toUpperCase());
            $("#detail-value").text(default_value);
        })
        .on("click", function(d){
            default_id= d.data.name;
            default_value = d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_totalInstalledCapacity(),2)+"%)"
        })
    function toggle(){

        if(mode == "value")
        {
            mode = "electricity"
        }
        else{
            mode = "value"
        }
    }
function updateVisualization(){
    pie.value(function(d) { return d.value})
    g.data(pie(DATA))
    g.transition().duration(500)
            .attr("d", arc)

    pie_elec.value(function(d) { return d.electricity})
    g_elec.data(pie_elec(DATA))
    g_elec.transition().duration(500)
            .attr("d", arc)
}

 });
